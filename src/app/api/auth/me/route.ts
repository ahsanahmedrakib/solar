import { toPublicUser, type User } from "@/data/users";
import { verifyAccessToken } from "@/lib/auth";
import { db } from "@/lib/db";
import { isTableNotExistsError } from "@/lib/db-helpers";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const token = authHeader?.slice(7);
    const payload = verifyAccessToken(token);

    const [doc] = await db
      .select()
      .from(users)
      .where(eq(users.id, payload.userId))
      .limit(1);

    if (!doc) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    const user: User = {
      id: doc.id,
      name: doc.name,
      email: doc.email,
      password: doc.password,
      role: doc.role as "superadmin" | "admin",
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };

    return NextResponse.json({
      success: true,
      data: toPublicUser(user),
    });
  } catch (error: unknown) {
    if (isTableNotExistsError(error)) {
      return NextResponse.json(
        { success: false, error: "Database tables not set up yet" },
        { status: 503 },
      );
    }
    return NextResponse.json(
      { success: false, error: "Invalid or expired token" },
      { status: 401 },
    );
  }
}
