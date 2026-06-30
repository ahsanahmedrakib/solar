import type { Section } from "@/data/settings";

let cachePromise: Promise<Section[] | null> | null = null;

export function fetchSettings(force = false): Promise<Section[] | null> {
  if (force) {
    cachePromise = null;
  }
  if (cachePromise) return cachePromise;
  cachePromise = fetch("/api/settings")
    .then((res) => res.json())
    .then((json) => (json.success ? (json.data as Section[]) : null))
    .finally(() => {
      cachePromise = null;
    });
  return cachePromise;
}
