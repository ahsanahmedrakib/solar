import fs from "fs";
import path from "path";
import { deleteImageFromDB, saveImageToDB } from "./imageStore";

const ALLOWED_FOLDERS = [
  "services",
  "projects",
  "blogs",
  "team",
  "hero",
  "settings",
];

function validateFolderName(folderName: string): void {
  if (!ALLOWED_FOLDERS.includes(folderName)) {
    throw new Error(`Invalid folder name: "${folderName}"`);
  }
}

export async function saveImage(
  base64Data: string,
  folderName: string,
  id: string | number,
): Promise<string> {
  if (!base64Data || !base64Data.startsWith("data:image/")) {
    return base64Data;
  }

  validateFolderName(folderName);

  const matches = base64Data.match(
    /^data:image\/([A-Za-z-+\/]+);base64,(.+)$/,
  );
  if (!matches || matches?.length !== 3) {
    throw new Error("Invalid base64 image data");
  }

  const fileType = matches[1];
  const extension = fileType === "jpeg" ? "jpg" : fileType;
  const buffer = Buffer.from(matches[2], "base64");

  if (process.env.NODE_ENV === "production") {
    return saveImageToDB(base64Data, folderName, id);
  }

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
  } catch (error) {
    console.warn("Filesystem write failed, falling back to DB:", error);
    return saveImageToDB(base64Data, folderName, id);
  }
}

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
