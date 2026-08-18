import { verifyAccessToken } from "@/lib/auth";
import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

function isSuperadmin(request: Request): boolean {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return false;
  try {
    const payload = verifyAccessToken(authHeader.slice(7));
    return payload.role === "superadmin";
  } catch {
    return false;
  }
}

function dataFilesStatus() {
  const dir = path.join(process.cwd(), "src", "data", "api");
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".json"))
    .map((f) => {
      const full = path.join(dir, f);
      let size = 0;
      try {
        size = fs.statSync(full).size;
      } catch {
        size = 0;
      }
      return { file: f, bytes: size };
    });
}

function imagesStatus() {
  const root = path.join(process.cwd(), "public", "images", "api");
  if (!fs.existsSync(root)) return { count: 0, bytes: 0 };
  let count = 0;
  let bytes = 0;
  const walk = (dir: string) => {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walk(full);
      else if (entry.isFile()) {
        count += 1;
        bytes += fs.statSync(full).size;
      }
    }
  };
  walk(root);
  return { count, bytes };
}

export async function GET(request: Request) {
  if (!isSuperadmin(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    return NextResponse.json({
      success: true,
      data: {
        storage: "file",
        environment: process.env.NODE_ENV ?? "development",
        dataFiles: dataFilesStatus(),
        images: imagesStatus(),
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}