import type { Service } from "@/data/services";
import { connectToDatabase } from "@/lib/db";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const services = await db.collection("services").find({}).toArray();
    return NextResponse.json({ success: true, data: services });
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

    const allServices = (await db
      .collection("services")
      .find({})
      .toArray()) as unknown as Service[];
    const nextId =
      allServices.length > 0
        ? Math.max(...allServices?.map((s) => s.id)) + 1
        : 1;

    const savedImagePath = await saveImage(body.image, "services", nextId);

    const newService = {
      ...body,
      image: savedImagePath,
      id: nextId,
      createdAt: new Date(),
    };

    await db.collection("services").insertOne(newService);
    return NextResponse.json({ success: true, data: newService });
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
      .collection("services")
      .findOne({ id: Number(id) });
    if (existing) {
      if (updateData.image && updateData.image !== existing.image) {
        updateData.image = await saveImage(updateData.image, "services", id);
        await deleteImage(existing.image);
      }
    }

    await db
      .collection("services")
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
      .collection("services")
      .findOne({ id: Number(id) });
    if (existing) {
      await deleteImage(existing.image);
    }

    await db.collection("services").deleteOne({ id: Number(id) });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

