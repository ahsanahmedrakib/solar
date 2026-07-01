import fs from "fs";
import path from "path";
import { saveImageToDB, deleteImageFromDB } from "./imageStore";

/**
 * Saves a base64 image string to public/images/api/{folderName} (local)
 * or to MongoDB (serverless). Falls back to DB when filesystem is not writable.
 * @param base64Data Base64 representation of the image
 * @param folderName Subfolder name (e.g. 'services', 'projects')
 * @param id Identifier to prefix the file name
 * @returns The web-accessible URL path (e.g. /images/api/services/1_12345.jpg or /api/image/abc123)
 */
export async function saveImage(
  base64Data: string,
  folderName: string,
  id: string | number,
): Promise<string> {
  if (!base64Data || !base64Data.startsWith("data:image/")) {
    return base64Data;
  }

  const matches = base64Data.match(/^data:image\/([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error("Invalid base64 image data");
  }

  const fileType = matches[1];
  const extension = fileType === "jpeg" ? "jpg" : fileType;
  const buffer = Buffer.from(matches[2], "base64");

  const relativeDir = `/images/api/${folderName}`;
  const targetDir = path.join(process.cwd(), "public", relativeDir);

  try {
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    const fileName = `${id}_${Date.now()}.${extension}`;
    const filePath = path.join(targetDir, fileName);

    fs.writeFileSync(filePath, buffer);

    return `${relativeDir}/${fileName}`;
  } catch (err: unknown) {
    if (
      err instanceof Error &&
      (err as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      // Filesystem not writable (serverless) — store in MongoDB
      return saveImageToDB(base64Data, folderName, id);
    }
    throw err;
  }
}

/**
 * Deletes an image file from the public directory or MongoDB
 * @param imageUrl The web-accessible URL path of the image
 */
export async function deleteImage(imageUrl: string): Promise<void> {
  if (!imageUrl) return;

  if (imageUrl.startsWith("/api/image/")) {
    await deleteImageFromDB(imageUrl);
    return;
  }

  if (!imageUrl.startsWith("/images/api/")) {
    return;
  }

  try {
    const filePath = path.join(process.cwd(), "public", imageUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("Failed to delete image file:", imageUrl, error);
  }
}
