import { db } from "@/lib/db";
import { isTableNotExistsError } from "@/lib/db-helpers";
import { team } from "@/lib/schema";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allMembers = await db.select().from(team);
    return NextResponse.json({ success: true, data: allMembers });
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
    const body = await request.json();
    const { name, role, image, bio, socialLinks } = body;

    if (!name || !role) {
      return NextResponse.json(
        { success: false, error: "name and role are required" },
        { status: 400 },
      );
    }

    const savedImagePath = image ? await saveImage(image, "team", 0) : "";

    const [newMember] = await db
      .insert(team)
      .values({
        name,
        role,
        image: savedImagePath,
        bio: bio ?? null,
        socialLinks: socialLinks ?? null,
      })
      .returning();

    return NextResponse.json({ success: true, data: newMember });
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
    const body = await request.json();
    const { id, name, role, image, bio, socialLinks } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 },
      );
    }

    const [existing] = await db
      .select()
      .from(team)
      .where(eq(team.id, Number(id)))
      .limit(1);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Team member not found" },
        { status: 404 },
      );
    }

    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (role !== undefined) updateData.role = role;
    if (bio !== undefined) updateData.bio = bio;
    if (socialLinks !== undefined) updateData.socialLinks = socialLinks;

    if (image && image !== existing.image) {
      updateData.image = await saveImage(image, "team", id);
      await deleteImage(existing.image);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: true, data: existing });
    }

    await db.update(team).set(updateData).where(eq(team.id, Number(id)));
    return NextResponse.json({ success: true, data: { id, ...updateData } });
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
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing ID parameter" },
        { status: 400 },
      );
    }

    const [existing] = await db
      .select()
      .from(team)
      .where(eq(team.id, Number(id)))
      .limit(1);
    if (existing) {
      await deleteImage(existing.image);
    }

    await db.delete(team).where(eq(team.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
