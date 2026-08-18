import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

const IMAGES_ROOT = path.join(process.cwd(), "public", "images", "api");

const MIME_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
};

function findImageFile(imageId: string): string | null {
  if (!/^\d+$/.test(imageId)) return null;
  if (!fs.existsSync(IMAGES_ROOT)) return null;

  const walk = (dir: string): string | null => {
    let entries: fs.Dirent[];
    try {
      entries = fs.readdirSync(dir, { withFileTypes: true });
    } catch {
      return null;
    }
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        const found = walk(full);
        if (found) return found;
      } else if (
        entry.isFile() &&
        entry.name.startsWith(`${imageId}_`)
      ) {
        return full;
      }
    }
    return null;
  };

  return walk(IMAGES_ROOT);
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const filePath = findImageFile(id);

    if (!filePath) {
      return NextResponse.json(
        { success: false, error: "Image not found" },
        { status: 404 },
      );
    }

    const ext = path.extname(filePath).slice(1).toLowerCase();
    const contentType = MIME_BY_EXT[ext] || "application/octet-stream";
    const data = fs.readFileSync(filePath);

    return new Response(new Uint8Array(data), {
      headers: {
        "Content-Type": contentType,
        "X-Content-Type-Options": "nosniff",
        "Content-Security-Policy": "default-src 'none'; sandbox",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}