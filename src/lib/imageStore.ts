import { db } from "./db";
import { images } from "./schema";
import { eq } from "drizzle-orm";

const ALLOWED_CONTENT_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
]);

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

export async function saveImageToDB(
  base64Data: string,
  folderName: string,
  id: string | number,
): Promise<string> {
  const matches = base64Data.match(
    /^data:image\/([A-Za-z-+\/]+);base64,(.+)$/,
  );
  if (!matches || matches?.length !== 3) {
    throw new Error("Invalid base64 image data");
  }

  const contentType =
    matches[1] === "jpeg" ? "image/jpeg" : `image/${matches[1]}`;

  if (!ALLOWED_CONTENT_TYPES.has(contentType)) {
    throw new Error(`Unsupported image type: ${contentType}`);
  }

  const sizeBytes = Buffer.byteLength(matches[2], "base64");
  if (sizeBytes > MAX_IMAGE_SIZE_BYTES) {
    throw new Error("Image exceeds the maximum allowed size");
  }

  const result = await db
    .insert(images)
    .values({
      data: matches[2],
      contentType,
      folderName,
      resourceId: String(id),
    })
    .returning({ insertedId: images.id });

  if (!result[0]) {
    throw new Error("Failed to save image to database");
  }

  return `/api/image/${result[0].insertedId}`;
}

export async function getImageFromDB(imageId: string): Promise<{
  data: Buffer;
  contentType: string;
} | null> {
  try {
    const rows = await db
      .select()
      .from(images)
      .where(eq(images.id, Number(imageId)))
      .limit(1);

    if (rows.length === 0) return null;
    const row = rows[0];
    return {
      data: Buffer.from(row.data, "base64"),
      contentType: row.contentType,
    };
  } catch (error) {
    console.error("Failed to get image from DB:", error);
    return null;
  }
}

export async function deleteImageFromDB(imageUrl: string): Promise<void> {
  if (!imageUrl || !imageUrl.startsWith("/api/image/")) return;

  const imageId = imageUrl.replace("/api/image/", "");
  try {
    await db.delete(images).where(eq(images.id, Number(imageId)));
  } catch (error) {
    console.error("Failed to delete image from DB:", imageUrl, error);
  }
}
