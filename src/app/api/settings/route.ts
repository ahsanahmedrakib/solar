import { connectToDatabase } from "@/lib/db";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { NextResponse } from "next/server";

function processImageFields(
  sections: Array<{
    id: string;
    fields?: Array<{ id: string; type: string; value: string }>;
  }>,
  existingSections?: Array<{
    id: string;
    fields?: Array<{ id: string; type: string; value: string }>;
  }>,
) {
  return sections.map((section) => {
    if (!section.fields) return section;

    const existingSection = existingSections?.find((s) => s.id === section.id);

    return {
      ...section,
      fields: section.fields.map((field) => {
        if (field.type !== "image" || !field.value?.startsWith("data:image/")) {
          return field;
        }

        const existingField = existingSection?.fields?.find(
          (f) => f.id === field.id,
        );
        const savedPath = saveImage(field.value, "settings", field.id);

        if (existingField?.value && existingField.value !== savedPath) {
          deleteImage(existingField.value);
        }

        return { ...field, value: savedPath };
      }),
    };
  });
}

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const settings = await db
      .collection("settings")
      .findOne({ settingsId: "global" });
    if (!settings) {
      return NextResponse.json({ success: true, data: null });
    }
    return NextResponse.json({ success: true, data: settings.sections });
  } catch (error: unknown) {
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
    const { db } = await connectToDatabase();

    const existing = await db
      .collection("settings")
      .findOne({ settingsId: "global" });
    const processedSections = processImageFields(sections, existing?.sections);

    const result = await db
      .collection("settings")
      .updateOne(
        { settingsId: "global" },
        { $set: { sections: processedSections, updatedAt: new Date() } },
        { upsert: true },
      );

    return NextResponse.json({ success: true, result });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

