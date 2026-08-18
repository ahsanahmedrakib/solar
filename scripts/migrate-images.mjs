// One-time migration: move images stored as base64 in the database to static
// files under public/images/api/<folder> and rewrite all references.
//
// Usage:
//   node scripts/migrate-images.mjs            # write files + rewrite references (keeps DB rows)
//   node scripts/migrate-images.mjs --delete   # also delete migrated rows from the images table
//   node scripts/migrate-images.mjs --dry-run  # preview only, no changes
//
// Reads DATABASE_URL from .env / .env.local.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");

const args = process.argv.slice(2);
const DELETE_ROWS = args.includes("--delete");
const DRY_RUN = args.includes("--dry-run");

function loadEnv() {
  const candidates = [".env.local", ".env"].map((f) => path.join(rootDir, f));
  for (const file of candidates) {
    if (!fs.existsSync(file)) continue;
    const raw = fs.readFileSync(file, "utf8");
    for (const line of raw.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      let value = trimmed.slice(eqIdx + 1).trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) process.env[key] = value;
    }
  }
}

const EXTENSION_MAP = {
  jpeg: "jpg",
  jpg: "jpg",
  png: "png",
  gif: "gif",
  webp: "webp",
  "svg+xml": "svg",
  svg: "svg",
};

function extForContentType(contentType) {
  const key = (contentType || "").replace("image/", "").toLowerCase();
  return EXTENSION_MAP[key] || "bin";
}

function sanitizeId(value) {
  return String(value ?? "0").replace(/[^a-zA-Z0-9_-]/g, "_");
}

function replaceAll(value, map) {
  if (typeof value !== "string") return value;
  let out = value;
  for (const [from, to] of map) {
    if (out.includes(from)) out = out.split(from).join(to);
  }
  return out;
}

function replaceInObject(value, map) {
  if (typeof value === "string") return replaceAll(value, map);
  if (Array.isArray(value)) return value.map((v) => replaceInObject(v, map));
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = replaceInObject(v, map);
    }
    return out;
  }
  return value;
}

async function main() {
  loadEnv();
  const { neon } = await import("@neondatabase/serverless");

  const databaseUrl = process.env.DATABASE_URL;
  if (!databaseUrl) {
    console.error("ERROR: DATABASE_URL not found in .env / .env.local");
    process.exit(1);
  }

  const sql = neon(databaseUrl);

  const rows = await sql`SELECT id, data, content_type, folder_name, resource_id FROM images ORDER BY id`;
  console.log(`Found ${rows.length} image(s) in database.`);

  if (rows.length === 0) {
    console.log("Nothing to migrate.");
    return;
  }

  const map = new Map();
  const written = [];
  let failed = 0;

  for (const row of rows) {
    const ext = extForContentType(row.content_type);
    const folder = sanitizeId(row.folder_name);
    const fileName = `${row.id}_${sanitizeId(row.resource_id)}.${ext}`;
    const relativeDir = `/images/api/${folder}`;
    const targetDir = path.join(rootDir, "public", relativeDir);
    const filePath = path.join(targetDir, fileName);
    const staticUrl = `${relativeDir}/${fileName}`;
    const dbUrl = `/api/image/${row.id}`;

    map.set(dbUrl, staticUrl);

    if (!DRY_RUN) {
      try {
        if (!fs.existsSync(targetDir)) {
          fs.mkdirSync(targetDir, { recursive: true });
        }
        const buffer = Buffer.from(row.data, "base64");
        if (buffer.length === 0) {
          throw new Error("empty image data");
        }
        fs.writeFileSync(filePath, buffer);
        written.push(filePath);
      } catch (error) {
        failed += 1;
        console.error(`  ! failed to write ${filePath}:`, error.message);
      }
    }
  }

  console.log(
    DRY_RUN
      ? `[dry-run] Would write ${rows.length} file(s) to public/images/api/`
      : `Wrote ${written.length} file(s), ${failed} failed.`,
  );
  console.log(`Prepared ${map.size} URL replacement(s).`);

  if (DRY_RUN) {
    for (const [from, to] of map) {
      console.log(`  ${from}  ->  ${to}`);
    }
    return;
  }

  if (failed > 0) {
    console.error("Aborting reference rewrite because some files failed to write.");
    process.exit(1);
  }

  const updateReferences = async (table, columnNames) => {
    const rowsToUpdate = await sql`SELECT * FROM ${sql.unsafe(table)}`;
    let changed = 0;
    for (const row of rowsToUpdate) {
      const set = {};
      let rowChanged = false;
      for (const column of columnNames) {
        const original = row[column];
        if (original === undefined || original === null) continue;
        const transformed = Array.isArray(original)
          ? original.map((v) => replaceAll(v, map))
          : replaceInObject(original, map);
        if (JSON.stringify(transformed) !== JSON.stringify(original)) {
          set[column] = transformed;
          rowChanged = true;
        }
      }
      if (rowChanged) {
        const idColumn = table === "settings" ? "settings_id" : "id";
        const idValue = table === "settings" ? row.settings_id : row.id;
        const cols = Object.keys(set);
        const assignments = cols
          .map((col, i) => `${col} = $${i + 1}`)
          .join(", ");
        await sql.query(
          `UPDATE ${table} SET ${assignments} WHERE ${idColumn} = $${cols.length + 1}`,
          [...cols.map((col) => set[col]), idValue],
        );
        changed += 1;
      }
    }
    return changed;
  };

  const textColumnsByTable = {
    services: ["image", "images", "service_details"],
    projects: ["image_url", "images", "project_details"],
    blogs: ["image_url", "images", "content", "blog_details"],
    team: ["image"],
  };

  for (const [table, columns] of Object.entries(textColumnsByTable)) {
    const changed = await updateReferences(table, columns);
    console.log(`  ${table}: updated ${changed} row(s)`);
  }

  const settingsChanged = await updateReferences("settings", ["sections"]);
  console.log(`  settings: updated ${settingsChanged} row(s)`);

  if (DELETE_ROWS) {
    await sql`DELETE FROM images`;
    console.log("Deleted all rows from the images table.");
  } else {
    console.log("Kept rows in the images table (backup). Use --delete to remove them.");
  }

  console.log("Done. Restart the Node app so new static files are picked up.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
