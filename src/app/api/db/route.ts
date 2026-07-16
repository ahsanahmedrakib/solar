import { verifyAccessToken } from "@/lib/auth";
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

export async function GET(request: Request) {
  if (!isSuperadmin(request)) {
    return NextResponse.json(
      { success: false, error: "Unauthorized" },
      { status: 401 },
    );
  }

  try {
    const url = process.env.DATABASE_URL;

    if (!url) {
      return NextResponse.json({
        success: false,
        error: "DATABASE_URL is not set",
        data: { envSet: false, status: "disconnected" },
      });
    }

    try {
      const { db } = await import("@/lib/db");
      const { sql } = await import("drizzle-orm");
      const result = await db.execute(sql`SELECT 1 as ping`);

      let tableNames: string[] = [];
      try {
        const tablesResult = await db.execute(sql`
          SELECT table_name FROM information_schema.tables
          WHERE table_schema = 'public'
        `);
        tableNames = (tablesResult.rows as { table_name: string }[]).map(
          (r) => r.table_name,
        );
      } catch {
        tableNames = [];
      }

      return NextResponse.json({
        success: true,
        data: {
          status: "connected",
          envSet: true,
          ping: result.rows,
          tables: tableNames,
          tableCount: tableNames.length,
        },
      });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return NextResponse.json(
        {
          success: false,
          error: message,
          data: { envSet: true, status: "disconnected" },
        },
        { status: 500 },
      );
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
