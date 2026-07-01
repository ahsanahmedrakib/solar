import { connectToDatabase } from "@/lib/db";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const team = await db.collection("team").find({}).toArray();
    return NextResponse.json({ success: true, data: team });
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

    const allMembers = await db.collection("team").find({}).toArray();
    const nextId =
      allMembers.length > 0 ? Math.max(...allMembers.map((m) => m.id)) + 1 : 1;

    const savedImagePath = await saveImage(body.image, "team", nextId);

    const newMember = {
      ...body,
      image: savedImagePath,
      id: nextId,
      createdAt: new Date(),
    };

    await db.collection("team").insertOne(newMember);
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
    const { id, ...updateData } = body;
    const { db } = await connectToDatabase();

    const existing = await db.collection("team").findOne({ id: Number(id) });
    if (existing) {
      if (updateData.image && updateData.image !== existing.image) {
        updateData.image = await saveImage(updateData.image, "team", id);
        await deleteImage(existing.image);
      }
    }

    await db
      .collection("team")
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

    const existing = await db.collection("team").findOne({ id: Number(id) });
    if (existing) {
      await deleteImage(existing.image);
    }

    await db.collection("team").deleteOne({ id: Number(id) });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

