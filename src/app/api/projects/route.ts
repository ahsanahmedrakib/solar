import type { Project } from "@/data/projects";
import { connectToDatabase } from "@/lib/db";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const projects = await db.collection("projects").find({}).toArray();
    return NextResponse.json({ success: true, data: projects });
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
    const body = await request.json();
    const { db } = await connectToDatabase();

    const allProjects = (await db
      .collection("projects")
      .find({})
      .toArray()) as unknown as Project[];
    const nextId =
      allProjects.length > 0
        ? Math.max(...allProjects?.map((p) => Number(p.id))) + 1
        : 1;

    const savedImagePath = await saveImage(body.imageUrl, "projects", nextId);

    const newProject = {
      ...body,
      imageUrl: savedImagePath,
      id: nextId,
      createdAt: new Date(),
    };

    await db.collection("projects").insertOne(newProject);
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
    const { id, ...updateData } = body;
    const { db } = await connectToDatabase();

    const existing = await db
      .collection("projects")
      .findOne({ id: Number(id) });
    if (existing) {
      if (updateData.imageUrl && updateData.imageUrl !== existing.imageUrl) {
        updateData.imageUrl = await saveImage(
          updateData.imageUrl,
          "projects",
          id,
        );
        await deleteImage(existing.imageUrl);
      }
    }

    await db
      .collection("projects")
      .updateOne({ id: Number(id) }, { $set: updateData });
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
    const { db } = await connectToDatabase();

    const existing = await db
      .collection("projects")
      .findOne({ id: Number(id) });
    if (existing) {
      await deleteImage(existing.imageUrl);
    }

    await db.collection("projects").deleteOne({ id: Number(id) });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

