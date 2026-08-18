import { PUBLIC_CACHE_HEADERS, cachedDbQuery, revalidateContent } from "@/lib/cache";
import { db } from "@/lib/db";
import { isTableNotExistsError } from "@/lib/db-helpers";
import { settings } from "@/lib/schema";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { getRequestTokenPayload } from "@/lib/token";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

const getCachedGlobalSettings = cachedDbQuery(
  async () =>
    db
      .select()
      .from(settings)
      .where(eq(settings.settingsId, "global"))
      .limit(1),
  ["api-settings-global"],
  ["settings"],
);

const HARDCODED_FIELD_IDS = [
  "company-name",
  "site-logo",
  "admin-logo",
  "site-favicon",
];

type SectionShape = {
  id: string;
  fields?: Array<{ id: string; type: string; value: string }>;
};

function stripHardcodedFields(sections: SectionShape[]): SectionShape[] {
  return sections
    .map((section) => ({
      ...section,
      fields: section.fields?.filter(
        (f) => !HARDCODED_FIELD_IDS.includes(f.id),
      ),
    }))
    .map((section) =>
      section.fields?.length ? section : { ...section, fields: undefined },
    );
}

async function processImageFields(
  sections: SectionShape[],
  existingSections?: SectionShape[],
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
    const rows = await getCachedGlobalSettings();

    if (rows.length === 0) {
      return NextResponse.json({ success: true, data: null });
    }
    return NextResponse.json(
      {
        success: true,
        data: stripHardcodedFields(rows[0].sections as SectionShape[]),
      },
      { headers: PUBLIC_CACHE_HEADERS },
    );
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
    const payload = getRequestTokenPayload(request);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

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

    const existingSections = (existingRows[0]?.sections ?? []) as SectionShape[];

    const processedSections = await processImageFields(
      stripHardcodedFields(sections),
      existingSections,
    );

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

    revalidateContent();
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
