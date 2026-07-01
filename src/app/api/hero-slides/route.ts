import type { HeroSlide } from "@/data/hero-slides";
import { connectToDatabase } from "@/lib/db";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const slides = await db
      .collection("hero_slides")
      .find({})
      .sort({ order: 1 })
      .toArray();

    return NextResponse.json({ success: true, data: slides });
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
    const body = await request.json();
    const { db } = await connectToDatabase();

    const allSlides = (await db
      .collection("hero_slides")
      .find({})
      .toArray()) as unknown as HeroSlide[];
    const nextId =
      allSlides.length > 0 ? Math.max(...allSlides.map((s) => s.id)) + 1 : 1;

    const savedImagePath = await saveImage(body.image, "hero", nextId);

    const newSlide = {
      ...body,
      image: savedImagePath,
      id: nextId,
      order: body.order ?? allSlides.length + 1,
      isActive: body.isActive ?? true,
      createdAt: new Date(),
    };

    await db.collection("hero_slides").insertOne(newSlide);
    return NextResponse.json({ success: true, data: newSlide });
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
    const { id, ...updateData } = body;
    const { db } = await connectToDatabase();

    const existing = await db
      .collection("hero_slides")
      .findOne({ id: Number(id) });

    if (existing && updateData.image && updateData.image !== existing.image) {
      updateData.image = await saveImage(updateData.image, "hero", id);
      await deleteImage(existing.image);
    }

    await db
      .collection("hero_slides")
      .updateOne({ id: Number(id) }, { $set: updateData });

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

    const { db } = await connectToDatabase();
    const existing = await db
      .collection("hero_slides")
      .findOne({ id: Number(id) });

    if (existing) {
      await deleteImage(existing.image);
    }

    await db.collection("hero_slides").deleteOne({ id: Number(id) });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

