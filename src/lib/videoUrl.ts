const YOUTUBE_PATTERN =
  /(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/;
const DRIVE_PATTERN = /drive\.google\.com\/file\/d\/([\w-]{6,})(?:\/(?:view|preview))?/;

export function isSupportedVideoUrl(raw: string): boolean {
  const url = (raw ?? "").trim();
  if (!url) return false;
  return YOUTUBE_PATTERN.test(url) || DRIVE_PATTERN.test(url);
}

export function normalizeVideoUrl(raw: string): string {
  const url = (raw ?? "").trim();
  if (!url) return "";

  const youtube = url.match(YOUTUBE_PATTERN);
  if (youtube) return `https://www.youtube.com/embed/${youtube[1]}`;

  const drive = url.match(DRIVE_PATTERN);
  if (drive) return `https://drive.google.com/file/d/${drive[1]}/preview`;

  return url;
}
