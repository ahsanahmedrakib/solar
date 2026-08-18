import {
  ensureSuperadminExists,
  findUserById,
  getUsers,
  hashPassword,
  saveUsers,
  type StoredUser,
} from "@/lib/auth";
import { withWriteLock } from "@/lib/fileStore";
import { verifyAccessToken } from "@/lib/auth";
import crypto from "crypto";
import { NextResponse } from "next/server";

function getTokenPayload(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  try {
    return verifyAccessToken(authHeader?.slice(7));
  } catch {
    return null;
  }
}

function toPublicUser(user: StoredUser) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
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

    const allUsers = getUsers().map(toPublicUser);
    return NextResponse.json({ success: true, data: allUsers });
  } catch (error: unknown) {
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

    return withWriteLock(async () => {
      await ensureSuperadminExists();

      const current = getUsers();
      if (
        current.some(
          (u) => u.email.toLowerCase() === String(email).toLowerCase(),
        )
      ) {
        return NextResponse.json(
          { success: false, error: "A user with this email already exists" },
          { status: 409 },
        );
      }

      const now = new Date().toISOString();
      const newUser: StoredUser = {
        id: "u-" + crypto.randomUUID().slice(0, 12),
        name,
        email,
        password: await hashPassword(password),
        role: role || "admin",
        createdAt: now,
        updatedAt: now,
      };

      saveUsers([...current, newUser]);
      return NextResponse.json({ success: true, data: toPublicUser(newUser) });
    });
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

    return withWriteLock(async () => {
      const current = getUsers();
      const index = current.findIndex((u) => u.id === id);
      if (index === -1) {
        return NextResponse.json(
          { success: false, error: "User not found" },
          { status: 404 },
        );
      }

      const targetUser = current[index];
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

      const updated: StoredUser = {
        ...targetUser,
        updatedAt: new Date().toISOString(),
      };

      if (name) updated.name = name;
      if (email && isSuperadmin) {
        if (
          current.some(
            (u) =>
              u.id !== id && u.email.toLowerCase() === email.toLowerCase(),
          )
        ) {
          return NextResponse.json(
            { success: false, error: "Email already in use" },
            { status: 409 },
          );
        }
        updated.email = email;
      }
      if (role && isSuperadmin) updated.role = role;
      if (password) {
        if (password.length < 6) {
          return NextResponse.json(
            { success: false, error: "Password must be at least 6 characters" },
            { status: 400 },
          );
        }
        updated.password = await hashPassword(password);
      }

      const next = [...current];
      next[index] = updated;
      saveUsers(next);
      return NextResponse.json({
        success: true,
        data: toPublicUser(updated),
      });
    });
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

    return withWriteLock(async () => {
      const current = getUsers();
      const targetUser = findUserById(id);
      if (!targetUser) {
        return NextResponse.json(
          { success: false, error: "User not found" },
          { status: 404 },
        );
      }

      if (targetUser.role === "superadmin") {
        const superadminCount = current.filter(
          (u) => u.role === "superadmin",
        ).length;
        if (superadminCount <= 1) {
          return NextResponse.json(
            {
              success: false,
              error: "Cannot delete the only superadmin account",
            },
            { status: 403 },
          );
        }
      }

      saveUsers(current.filter((u) => u.id !== id));
      return NextResponse.json({ success: true });
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}