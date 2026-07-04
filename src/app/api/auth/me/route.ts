import { toPublicUser, type User } from "@/data/users";
import { verifyAccessToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
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

    const { db } = await connectToDatabase();
    const doc = await db.collection("users").findOne({ id: payload.userId });

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
      role: doc.role,
      createdAt: doc.createdAt,
      updatedAt: doc.updatedAt,
    };

    return NextResponse.json({
      success: true,
      data: toPublicUser(user),
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid or expired token" },
      { status: 401 },
    );
  }
}

