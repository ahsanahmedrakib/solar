import fs from "fs";
import path from "path";

const ALLOWED_FOLDERS = ["hero"];

const EXTENSION_MAP: Record<string, string> = {
  mp4: "mp4",
  webm: "webm",
  ogg: "ogv",
  ogv: "ogv",
  mov: "mov",
  m4v: "m4v",
};

function validateFolderName(folderName: string): void {
  if (!ALLOWED_FOLDERS.includes(folderName)) {
    throw new Error(`Invalid folder name: "${folderName}"`);
  }
}

function sanitizeVideoId(id: string | number): string {
  const str = String(id);
  if (!/^[a-zA-Z0-9_-]+$/.test(str)) {
    throw new Error("Invalid video resource ID");
  }
  return str;
}

export async function saveVideo(
  base64Data: string,
  folderName: string,
  id: string | number,
): Promise<string> {
  if (!base64Data || !base64Data.startsWith("data:video/")) {
    return base64Data;
  }

  validateFolderName(folderName);

  const matches = base64Data.match(/^data:video\/([A-Za-z-+]+);base64,(.+)$/);
  if (!matches || matches?.length !== 3) {
    throw new Error("Invalid base64 video data");
  }

  const fileType = matches[1].toLowerCase();
  const extension = EXTENSION_MAP[fileType];
  if (!extension) {
    throw new Error(`Unsupported video type: ${fileType}`);
  }

  const buffer = Buffer.from(matches[2], "base64");

  const relativeDir = `/videos/api/${folderName}`;
  const targetDir = path.join(process.cwd(), "public", relativeDir);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const fileName = `${sanitizeVideoId(id)}_${Date.now()}.${extension}`;
  const filePath = path.join(targetDir, fileName);

  fs.writeFileSync(filePath, buffer);

  return `${relativeDir}/${fileName}`;
}

export async function deleteVideo(videoUrl: string): Promise<void> {
  if (!videoUrl || !videoUrl.startsWith("/videos/api/")) return;

  if (videoUrl.includes("..") || videoUrl.includes("\\")) {
    return;
  }

  try {
    const filePath = path.join(process.cwd(), "public", videoUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("Failed to delete video file:", videoUrl, error);
  }
}
