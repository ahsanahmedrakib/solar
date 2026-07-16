import { db } from "@/lib/db";
import { isTableNotExistsError } from "@/lib/db-helpers";
import { settings } from "@/lib/schema";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

async function processImageFields(
  sections: Array<{
    id: string;
    fields?: Array<{ id: string; type: string; value: string }>;
  }>,
  existingSections?: Array<{
    id: string;
    fields?: Array<{ id: string; type: string; value: string }>;
  }>,
) {
  const result = [];
  for (const section of sections) {
    if (!section.fields) {
      result.push(section);
      continue;
    }

    const existingSection = existingSections?.find((s) => s.id === section.id);
    const processedFields = [];

    for (const field of section.fields) {
      if (field.type !== "image" || !field.value?.startsWith("data:image/")) {
        processedFields.push(field);
        continue;
      }

      const existingField = existingSection?.fields?.find(
        (f) => f.id === field.id,
      );
      const savedPath = await saveImage(field.value, "settings", field.id);

      if (existingField?.value && existingField.value !== savedPath) {
        await deleteImage(existingField.value);
      }

      processedFields.push({ ...field, value: savedPath });
    }

    result.push({ ...section, fields: processedFields });
  }
  return result;
}

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(settings)
      .where(eq(settings.settingsId, "global"))
      .limit(1);

    if (rows.length === 0) {
      return NextResponse.json({ success: true, data: null });
    }
    return NextResponse.json({ success: true, data: rows[0].sections });
  } catch (error: unknown) {
    if (isTableNotExistsError(error)) {
      return NextResponse.json({ success: true, data: null });
    }
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sections } = body;

    if (!sections || !Array.isArray(sections)) {
      return NextResponse.json(
        { success: false, error: "sections array is required" },
        { status: 400 },
      );
    }

    const existingRows = await db
      .select()
      .from(settings)
      .where(eq(settings.settingsId, "global"))
      .limit(1);

    const existingSections = (existingRows[0]?.sections ?? []) as Array<{
      id: string;
      fields?: Array<{ id: string; type: string; value: string }>;
    }>;

    const processedSections = await processImageFields(sections, existingSections);

    if (existingRows.length > 0) {
      await db
        .update(settings)
        .set({ sections: processedSections, updatedAt: new Date() })
        .where(eq(settings.settingsId, "global"));
    } else {
      await db.insert(settings).values({
        settingsId: "global",
        sections: processedSections,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
