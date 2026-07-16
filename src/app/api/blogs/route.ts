import { db } from "@/lib/db";
import { isTableNotExistsError } from "@/lib/db-helpers";
import { blogs } from "@/lib/schema";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allBlogs = await db.select().from(blogs);
    return NextResponse.json({ success: true, data: allBlogs });
  } catch (error: unknown) {
    if (isTableNotExistsError(error)) {
      return NextResponse.json({ success: true, data: [] });
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, category, imageUrl, slug, content, tags, date, blogDetails } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, error: "title and slug are required" },
        { status: 400 },
      );
    }

    const savedImagePath = imageUrl
      ? await saveImage(imageUrl, "blogs", 0)
      : "";

    const [newBlog] = await db
      .insert(blogs)
      .values({
        title,
        category: category ?? "",
        imageUrl: savedImagePath,
        slug,
        content: content ?? "",
        tags: tags ?? [],
        date: date ?? new Date().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
        blogDetails: blogDetails ?? "",
      })
      .returning();

    return NextResponse.json({ success: true, data: newBlog });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, title, category, imageUrl, slug, content, tags, date, blogDetails } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 },
      );
    }

    const [existing] = await db
      .select()
      .from(blogs)
      .where(eq(blogs.id, Number(id)))
      .limit(1);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 },
      );
    }

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (category !== undefined) updateData.category = category;
    if (slug !== undefined) updateData.slug = slug;
    if (content !== undefined) updateData.content = content;
    if (tags !== undefined) updateData.tags = tags;
    if (date !== undefined) updateData.date = date;
    if (blogDetails !== undefined) updateData.blogDetails = blogDetails;

    if (imageUrl && imageUrl !== existing.imageUrl) {
      updateData.imageUrl = await saveImage(imageUrl, "blogs", id);
      await deleteImage(existing.imageUrl);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: true, data: existing });
    }

    await db.update(blogs).set(updateData).where(eq(blogs.id, Number(id)));
    return NextResponse.json({ success: true, data: { id, ...updateData } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
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
      .from(blogs)
      .where(eq(blogs.id, Number(id)))
      .limit(1);
    if (existing) {
      await deleteImage(existing.imageUrl);
    }

    await db.delete(blogs).where(eq(blogs.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
