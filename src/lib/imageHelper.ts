import fs from "fs";
import path from "path";

/**
 * Saves a base64 image string to public/images/api/{folderName}
 * @param base64Data Base64 representation of the image
 * @param folderName Subfolder name (e.g. 'services', 'projects')
 * @param id Identifier to prefix the file name
 * @returns The web-accessible URL path (e.g. /images/api/services/1_12345.jpg)
 */
export function saveImage(base64Data: string, folderName: string, id: string | number): string {
  if (!base64Data || !base64Data.startsWith("data:image/")) {
    return base64Data; // Already a URL or empty
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

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const fileName = `${id}_${Date.now()}.${extension}`;
  const filePath = path.join(targetDir, fileName);

  fs.writeFileSync(filePath, buffer);

  return `${relativeDir}/${fileName}`;
}

/**
 * Deletes an image file from the public directory if it was uploaded/saved via the API
 * @param imageUrl The web-accessible URL path of the image
 */
export function deleteImage(imageUrl: string): void {
  if (!imageUrl || !imageUrl.startsWith("/images/api/")) {
    return; // Don't delete static assets or external URLs
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
