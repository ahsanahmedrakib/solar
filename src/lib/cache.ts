export const PUBLIC_CACHE_HEADERS: Record<string, string> = {
  "Cache-Control": "public, max-age=0, must-revalidate, stale-while-revalidate=600",
};

export const NO_CACHE_HEADERS: Record<string, string> = {
  "Cache-Control": "no-store",
};