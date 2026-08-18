import { PUBLIC_CACHE_HEADERS } from "@/lib/cache";
import { readDataFile, withWriteLock, writeDataFile } from "@/lib/fileStore";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { getRequestTokenPayload } from "@/lib/token";
import { NextResponse } from "next/server";

const FILE_NAME = "settingsData";

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

async function processImageFields(sections: SectionShape[]) {
  const result = [];
  for (const section of sections) {
    if (!section.fields) {
      result.push(section);
      continue;
    }

    const processedFields = [];

    for (const field of section.fields) {
      if (field.type !== "image" || !field.value?.startsWith("data:image/")) {
        processedFields.push(field);
        continue;
      }

      const savedPath = await saveImage(field.value, "settings", field.id);
      processedFields.push({ ...field, value: savedPath });
    }

    result.push({ ...section, fields: processedFields });
  }
  return result;
}

export async function GET() {
  const sections = readDataFile<SectionShape[] | null>(FILE_NAME, null);
  const data = sections ? stripHardcodedFields(sections) : null;
  return NextResponse.json(
    { success: true, data },
    { headers: PUBLIC_CACHE_HEADERS },
  );
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

    return withWriteLock(async () => {
      const existing = readDataFile<SectionShape[] | null>(FILE_NAME, null);
      const processedSections = await processImageFields(
        stripHardcodedFields(sections),
      );

      const updated = [];
      for (const section of processedSections) {
        const existingSection = existing?.find((s) => s.id === section.id);
        const removed = (existingSection?.fields ?? [])
          .filter((f) => f.type === "image")
          .filter(
            (f) =>
              !section.fields?.some((nf) => nf.id === f.id) ||
              section.fields.some(
                (nf) => nf.id === f.id && nf.value !== f.value,
              ),
          );
        for (const f of removed) {
          await deleteImage(f.value);
        }
        updated.push(section);
      }

      writeDataFile(FILE_NAME, updated);
      return NextResponse.json({ success: true });
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}