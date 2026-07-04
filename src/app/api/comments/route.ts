import { type Comment } from "@/data/blogs";
import { connectToDatabase } from "@/lib/db";
import type { Document, UpdateFilter } from "mongodb";
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

    const blogs = await db
      .collection("blogs")
      .find({}, { projection: { title: 1, slug: 1, comments: 1 } })
      .toArray();
    const allComments = blogs.flatMap((blog: Record<string, unknown>) =>
      ((blog.comments as Comment[]) || [])?.map((c: Comment) => ({
        ...c,
        blogTitle: blog.title as string,
        blogSlug: blog.slug as string,
      })),
    );

    return NextResponse.json({ success: true, data: allComments });
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
        ? Math.max(...existingComments?.map((c) => c.id)) + 1
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

    await db
      .collection("blogs")
      .updateOne({ slug: blogSlug }, { $push: { comments: newComment } });

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
    const blogSlug = searchParams.get("blogSlug");
    const commentId = searchParams.get("commentId");

    if (!blogSlug || !commentId) {
      return NextResponse.json(
        { success: false, error: "blogSlug and commentId are required" },
        { status: 400 },
      );
    }

    const { db } = await connectToDatabase();
    const pullOp = {
      $pull: { comments: { id: Number(commentId) } },
    } as unknown as UpdateFilter<Document>;
    const result = await db
      .collection("blogs")
      .updateOne({ slug: blogSlug }, pullOp);

    if (result.modifiedCount === 0) {
      return NextResponse.json(
        { success: false, error: "Comment not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true, data: null });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

