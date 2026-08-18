import { revalidateTag, unstable_cache } from "next/cache";

export const CONTENT_REVALIDATE_SECONDS = 300;

export const PUBLIC_CACHE_HEADERS: Record<string, string> = {
  "Cache-Control": "public, max-age=60, stale-while-revalidate=600",
};

export const CONTENT_TAGS = [
  "settings",
  "services",
  "projects",
  "blogs",
  "hero-slides",
  "team",
  "reviews",
] as const;

export function revalidateContent() {
  for (const tag of CONTENT_TAGS) {
    revalidateTag(tag, "max");
  }
}

export function cachedDbQuery<T>(
  fn: () => Promise<T>,
  key: string[],
  tags: string[],
) {
  return unstable_cache(fn, key, {
    revalidate: CONTENT_REVALIDATE_SECONDS,
    tags,
  });
}