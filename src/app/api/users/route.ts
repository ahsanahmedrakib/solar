import {
  ensureSuperadminExists,
  hashPassword,
  verifyAccessToken,
} from "@/lib/auth";
import { db } from "@/lib/db";
import { isTableNotExistsError } from "@/lib/db-helpers";
import { users } from "@/lib/schema";
import crypto from "crypto";
import { NextResponse } from "next/server";
import { eq, count } from "drizzle-orm";

function getTokenPayload(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  try {
    return verifyAccessToken(authHeader?.slice(7));
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const payload = getTokenPayload(request);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    await ensureSuperadminExists();

    const allUsers = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users);

    return NextResponse.json({ success: true, data: allUsers });
  } catch (error: unknown) {
    if (isTableNotExistsError(error)) {
      return NextResponse.json({ success: true, data: [] });
    }
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = getTokenPayload(request);
    if (!payload || payload.role !== "superadmin") {
      return NextResponse.json(
        { success: false, error: "Only superadmin can create users" },
        { status: 403 },
      );
    }

    const { name, email, password, role } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email, and password are required" },
        { status: 400 },
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    if (role && !["admin", "superadmin"].includes(role)) {
      return NextResponse.json(
        { success: false, error: "Role must be 'admin' or 'superadmin'" },
        { status: 400 },
      );
    }

    await ensureSuperadminExists();

    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existing.length > 0) {
      return NextResponse.json(
        { success: false, error: "A user with this email already exists" },
        { status: 409 },
      );
    }

    const nextId = "u-" + crypto.randomUUID().slice(0, 12);

    const hashedPassword = await hashPassword(password);
    const [newUser] = await db
      .insert(users)
      .values({
        id: nextId,
        name,
        email,
        password: hashedPassword,
        role: role || "admin",
      })
      .returning({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      });

    return NextResponse.json({ success: true, data: newUser });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const payload = getTokenPayload(request);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { id, name, email, password, role } = await request.json();
    if (!id) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 },
      );
    }

    const [targetUser] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    if (!targetUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    const isSuperadmin = payload.role === "superadmin";
    const isOwnProfile = payload.userId === id;

    if (!isSuperadmin && !isOwnProfile) {
      return NextResponse.json(
        { success: false, error: "You can only update your own profile" },
        { status: 403 },
      );
    }

    if (role && !isSuperadmin) {
      return NextResponse.json(
        { success: false, error: "Only superadmin can change roles" },
        { status: 403 },
      );
    }

    if (role && !["admin", "superadmin"].includes(role)) {
      return NextResponse.json(
        { success: false, error: "Role must be 'admin' or 'superadmin'" },
        { status: 400 },
      );
    }

    const updateData: Record<string, unknown> = { updatedAt: new Date() };

    if (name && isOwnProfile) updateData.name = name;
    if (name && isSuperadmin) updateData.name = name;
    if (email && isSuperadmin) {
      const emailExists = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
      if (emailExists.length > 0 && emailExists[0].id !== id) {
        return NextResponse.json(
          { success: false, error: "Email already in use" },
          { status: 409 },
        );
      }
      updateData.email = email;
    }
    if (role && isSuperadmin) updateData.role = role;
    if (password) {
      if (password.length < 6) {
        return NextResponse.json(
          { success: false, error: "Password must be at least 6 characters" },
          { status: 400 },
        );
      }
      updateData.password = await hashPassword(password);
    }

    await db.update(users).set(updateData).where(eq(users.id, id));

    const [updated] = await db
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        role: users.role,
        createdAt: users.createdAt,
        updatedAt: users.updatedAt,
      })
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return NextResponse.json({ success: true, data: updated });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const payload = getTokenPayload(request);
    if (!payload || payload.role !== "superadmin") {
      return NextResponse.json(
        { success: false, error: "Only superadmin can delete users" },
        { status: 403 },
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "User ID is required" },
        { status: 400 },
      );
    }

    const [targetUser] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    if (!targetUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    if (targetUser.role === "superadmin") {
      const [result] = await db
        .select({ count: count() })
        .from(users)
        .where(eq(users.role, "superadmin"));
      if ((result?.count ?? 0) <= 1) {
        return NextResponse.json(
          {
            success: false,
            error: "Cannot delete the only superadmin account",
          },
          { status: 403 },
        );
      }
    }

    await db.delete(users).where(eq(users.id, id));
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
