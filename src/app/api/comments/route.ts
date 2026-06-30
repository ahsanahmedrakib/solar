import { type Comment } from "@/data/blogs";
import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const blogSlug = searchParams.get("blogSlug");

    const { db } = await connectToDatabase();

    if (blogSlug) {
      const blog = await db.collection("blogs").findOne({ slug: blogSlug });
      const comments = blog?.comments || [];
      return NextResponse.json({ success: true, data: comments });
    }

    return NextResponse.json({ success: true, data: [] });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { blogSlug, ...commentData } = await request.json();
    const { db } = await connectToDatabase();

    const blog = await db.collection("blogs").findOne({ slug: blogSlug });
    if (!blog) {
      return NextResponse.json(
        { success: false, error: "Blog not found" },
        { status: 404 },
      );
    }

    const existingComments = (blog.comments || []) as unknown as Comment[];
    const nextId =
      existingComments.length > 0
        ? Math.max(...existingComments.map((c) => c.id)) + 1
        : 1;

    const newComment = {
      ...commentData,
      id: nextId,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    await db.collection("blogs").updateOne(
      { slug: blogSlug },
      { $push: { comments: newComment } },
    );

    return NextResponse.json({ success: true, data: newComment });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

