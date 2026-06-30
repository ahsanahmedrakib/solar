import { ensureSuperadminExists, hashPassword, verifyAccessToken } from "@/lib/auth";
import type { User } from "@/data/users";
import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

function getTokenPayload(request: Request) {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) return null;
  try {
    return verifyAccessToken(authHeader.slice(7));
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

    const { db } = await connectToDatabase();
    await ensureSuperadminExists(db);

    const users = await db
      .collection("users")
      .find({})
      .project({ password: 0 })
      .toArray();

    return NextResponse.json({ success: true, data: users });
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

    const { db } = await connectToDatabase();
    await ensureSuperadminExists(db);

    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "A user with this email already exists" },
        { status: 409 },
      );
    }

    const allUsers = (await db
      .collection("users")
      .find({})
      .toArray()) as unknown as User[];
    const nextId =
      allUsers.length > 0
        ? "u-" + Date.now().toString(36) + "-" + (allUsers.length + 1)
        : "u-" + Date.now().toString(36);

    const hashedPassword = await hashPassword(password);
    const newUser = {
      id: nextId,
      name,
      email,
      password: hashedPassword,
      role: role || "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await db.collection("users").insertOne(newUser);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userWithoutPassword } = newUser;

    return NextResponse.json({ success: true, data: userWithoutPassword });
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

    const { db } = await connectToDatabase();
    const targetUser = await db.collection("users").findOne({ id });

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

    const updateData: Record<string, unknown> = { updatedAt: new Date() };

    if (name && isOwnProfile) updateData.name = name;
    if (name && isSuperadmin) updateData.name = name;
    if (email && isSuperadmin) {
      const emailExists = await db.collection("users").findOne({
        email,
        id: { $ne: id },
      });
      if (emailExists) {
        return NextResponse.json(
          { success: false, error: "Email already in use" },
          { status: 409 },
        );
      }
      updateData.email = email;
    }
    if (role && isSuperadmin) updateData.role = role;
    if (password) {
      updateData.password = await hashPassword(password);
    }

    await db.collection("users").updateOne({ id }, { $set: updateData });

    const updated = await db
      .collection("users")
      .findOne({ id }, { projection: { password: 0 } });

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

    const { db } = await connectToDatabase();
    const targetUser = await db.collection("users").findOne({ id });

    if (!targetUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 },
      );
    }

    if (targetUser.role === "superadmin") {
      const superadminCount = await db
        .collection("users")
        .countDocuments({ role: "superadmin" });
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

    await db.collection("users").deleteOne({ id });

    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

