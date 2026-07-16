import { db } from "@/lib/db";
import { isTableNotExistsError } from "@/lib/db-helpers";
import { blogs, comments } from "@/lib/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const blogSlug = searchParams.get("blogSlug");

    if (blogSlug) {
      const [blog] = await db
        .select()
        .from(blogs)
        .where(eq(blogs.slug, blogSlug))
        .limit(1);

      if (!blog) {
        return NextResponse.json({ success: true, data: [] });
      }

      const blogComments = await db
        .select()
        .from(comments)
        .where(eq(comments.blogId, blog.id));

      return NextResponse.json({ success: true, data: blogComments });
    }

    const allBlogs = await db.select({
      id: blogs.id,
      title: blogs.title,
      slug: blogs.slug,
    }).from(blogs);

    const allComments = [];

    for (const blog of allBlogs) {
      const blogComments = await db
        .select()
        .from(comments)
        .where(eq(comments.blogId, blog.id));

      for (const c of blogComments) {
        allComments.push({
          ...c,
          blogTitle: blog.title,
          blogSlug: blog.slug,
        });
      }
    }

    return NextResponse.json({ success: true, data: allComments });
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
    const { blogSlug, name, email, comment, parentId, website } = await request.json();

    if (!blogSlug || !name || !email || !comment) {
      return NextResponse.json(
        { success: false, error: "blogSlug, name, email, and comment are required" },
        { status: 400 },
      );
    }

    const [blog] = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, blogSlug))
      .limit(1);

    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 },
      );
    }

    const [newComment] = await db
      .insert(comments)
      .values({
        blogId: blog.id,
        parentId: parentId ?? null,
        name,
        email,
        website: website ?? "",
        comment,
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
      })
      .returning();

    return NextResponse.json({ success: true, data: newComment });
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
    const commentId = searchParams.get("commentId");

    if (!commentId) {
      return NextResponse.json(
        { success: false, error: "commentId is required" },
        { status: 400 },
      );
    }

    await db
      .delete(comments)
      .where(eq(comments.id, Number(commentId)));

    return NextResponse.json({ success: true, data: null });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
