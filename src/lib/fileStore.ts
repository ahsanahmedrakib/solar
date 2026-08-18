import fs from "fs";
import path from "path";

export const DATA_DIR = path.join(process.cwd(), "src/data/api");

export function readDataFile<T>(fileName: string, fallback: T): T {
  const filePath = path.join(DATA_DIR, `${fileName}.json`);
  try {
    if (!fs.existsSync(filePath)) return fallback;
    const raw = fs.readFileSync(filePath, "utf8");
    if (!raw.trim()) return fallback;
    const parsed = JSON.parse(raw);
    return (parsed as T) ?? fallback;
  } catch (error) {
    console.warn(`[fileStore] Failed to read ${fileName}:`, error);
    return fallback;
  }
}

export function writeDataFile<T>(fileName: string, data: T): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const filePath = path.join(DATA_DIR, `${fileName}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
}

export function deleteDataFile(fileName: string): void {
  const filePath = path.join(DATA_DIR, `${fileName}.json`);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
}

let writeLock: Promise<unknown> = Promise.resolve();

export function withWriteLock<T>(fn: () => T | Promise<T>): Promise<T> {
  const run = writeLock.then(fn);
  writeLock = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}