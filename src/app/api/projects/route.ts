import { db } from "@/lib/db";
import { isTableNotExistsError } from "@/lib/db-helpers";
import { projects } from "@/lib/schema";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allProjects = await db.select().from(projects);
    return NextResponse.json({ success: true, data: allProjects });
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
    const { title, imageUrl, slug, category, client, location, projectDetails, isFeatured } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, error: "title and slug are required" },
        { status: 400 },
      );
    }

    const savedImagePath = imageUrl
      ? await saveImage(imageUrl, "projects", 0)
      : "";

    const [newProject] = await db
      .insert(projects)
      .values({
        title,
        imageUrl: savedImagePath,
        slug,
        category: category ?? "",
        isFeatured: isFeatured ?? false,
        client: client ?? "",
        location: location ?? "",
        projectDetails: projectDetails ?? "",
      })
      .returning();

    return NextResponse.json({ success: true, data: newProject });
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
    const { id, title, imageUrl, slug, category, client, location, projectDetails, isFeatured } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 },
      );
    }

    const [existing] = await db
      .select()
      .from(projects)
      .where(eq(projects.id, Number(id)))
      .limit(1);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Project not found" },
        { status: 404 },
      );
    }

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (slug !== undefined) updateData.slug = slug;
    if (category !== undefined) updateData.category = category;
    if (client !== undefined) updateData.client = client;
    if (location !== undefined) updateData.location = location;
    if (projectDetails !== undefined) updateData.projectDetails = projectDetails;
    if (isFeatured !== undefined) updateData.isFeatured = isFeatured;

    if (imageUrl && imageUrl !== existing.imageUrl) {
      updateData.imageUrl = await saveImage(imageUrl, "projects", id);
      await deleteImage(existing.imageUrl);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: true, data: existing });
    }

    await db
      .update(projects)
      .set(updateData)
      .where(eq(projects.id, Number(id)));

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
      .from(projects)
      .where(eq(projects.id, Number(id)))
      .limit(1);
    if (existing) {
      await deleteImage(existing.imageUrl);
    }

    await db.delete(projects).where(eq(projects.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
