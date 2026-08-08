import fs from "fs";
import path from "path";

const EXTENSION_MAP: Record<string, string> = {
  mp4: "mp4",
  webm: "webm",
  ogg: "ogv",
  ogv: "ogv",
  mov: "mov",
  m4v: "m4v",
};

function sanitizeVideoId(id: string | number): string {
  const str = String(id);
  if (!/^[a-zA-Z0-9_-]+$/.test(str)) {
    throw new Error("Invalid video resource ID");
  }
  return str;
}

function sanitizeOriginalName(name: string): string {
  const base = path.basename(String(name ?? ""));
  const cleaned = base.replace(/[^a-zA-Z0-9._-]/g, "_").trim();
  if (!cleaned || cleaned === "." || cleaned === "..") return "";
  return cleaned;
}

export async function saveVideo(
  base64Data: string,
  id: string | number,
  originalName?: string,
): Promise<string> {
  if (!base64Data || !base64Data.startsWith("data:video/")) {
    return base64Data;
  }

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

  const fileName =
    sanitizeOriginalName(originalName ?? "") ||
    `${sanitizeVideoId(id)}_${Date.now()}.${extension}`;

  const relativeDir = "/video";
  const targetDir = path.join(process.cwd(), "public", relativeDir);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, fileName);

  fs.writeFileSync(filePath, buffer);

  return `${relativeDir}/${fileName}`;
}

export async function deleteVideo(videoUrl: string): Promise<void> {
  if (!videoUrl || !videoUrl.startsWith("/video/")) return;

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
