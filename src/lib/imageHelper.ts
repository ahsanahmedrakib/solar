import fs from "fs";
import path from "path";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

const ALLOWED_FOLDERS = [
  "services",
  "projects",
  "blogs",
  "team",
  "hero",
  "settings",
];

const EXTENSION_MAP: Record<string, string> = {
  jpeg: "jpg",
  jpg: "jpg",
  png: "png",
  gif: "gif",
  webp: "webp",
  "svg+xml": "svg",
  svg: "svg",
};

function validateFolderName(folderName: string): void {
  if (!ALLOWED_FOLDERS.includes(folderName)) {
    throw new Error(`Invalid folder name: "${folderName}"`);
  }
}

function sanitizeImageId(id: string | number): string {
  const str = String(id);
  if (!/^[a-zA-Z0-9_-]+$/.test(str)) {
    throw new Error("Invalid image resource ID");
  }
  return str;
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

  const fileType = matches[1].toLowerCase();
  const extension = EXTENSION_MAP[fileType];
  if (!extension) {
    throw new Error(`Unsupported image type: ${fileType}`);
  }

  const buffer = Buffer.from(matches[2], "base64");

  if (buffer.length > MAX_IMAGE_SIZE) {
    throw new Error("Image must be 5MB or smaller");
  }

  const relativeDir = `/images/api/${folderName}`;
  const targetDir = path.join(process.cwd(), "public", relativeDir);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const fileName = `${sanitizeImageId(id)}_${Date.now()}.${extension}`;
  const filePath = path.join(targetDir, fileName);

  fs.writeFileSync(filePath, buffer);

  return `${relativeDir}/${fileName}`;
}

export async function deleteImage(imageUrl: string): Promise<void> {
  if (!imageUrl) return;

  if (imageUrl.startsWith("/api/image/")) {
    return;
  }

  if (!imageUrl.startsWith("/images/api/")) {
    return;
  }

  if (imageUrl.includes("..") || imageUrl.includes("\\")) {
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
