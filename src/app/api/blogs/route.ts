import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { saveImage, deleteImage } from "@/lib/imageHelper";
import type { Blog } from "@/data/blogs";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const blogs = await db.collection("blogs").find({}).toArray();
    return NextResponse.json({ success: true, data: blogs });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const allBlogs = (await db.collection("blogs").find({}).toArray()) as unknown as Blog[];
    const nextId = allBlogs.length > 0 ? Math.max(...allBlogs.map((b: Blog) => b.id)) + 1 : 1;
    
    const savedImagePath = await saveImage(body.imageUrl, "blogs", nextId);
    
    const newBlog = {
      ...body,
      imageUrl: savedImagePath,
      id: nextId,
      createdAt: new Date(),
    };
    
    await db.collection("blogs").insertOne(newBlog);
    return NextResponse.json({ success: true, data: newBlog });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const { db } = await connectToDatabase();
    
    const existing = await db.collection("blogs").findOne({ id: Number(id) });
    if (existing) {
      if (updateData.imageUrl && updateData.imageUrl !== existing.imageUrl) {
        updateData.imageUrl = await saveImage(updateData.imageUrl, "blogs", id);
        await deleteImage(existing.imageUrl);
      }
    }
    
    await db.collection("blogs").updateOne({ id: Number(id) }, { $set: updateData });
    return NextResponse.json({ success: true, data: { id, ...updateData } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID parameter" }, { status: 400 });
    }
    const { db } = await connectToDatabase();
    
    const existing = await db.collection("blogs").findOne({ id: Number(id) });
    if (existing) {
      await deleteImage(existing.imageUrl);
    }
    
    await db.collection("blogs").deleteOne({ id: Number(id) });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
