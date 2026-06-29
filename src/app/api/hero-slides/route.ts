import { connectToDatabase } from "@/lib/db";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { NextResponse } from "next/server";

export interface HeroSlide {
  id: number;
  tagline: string;
  title: string;
  titleAccent: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  showVideoButton: boolean;
  isActive: boolean;
  order: number;
}

const DEFAULT_HERO_SLIDES = [
  {
    id: 1,
    tagline: "Solar Energy for Tomorrow",
    title: "Power Your Future with",
    titleAccent: "Clean Solar Energy",
    description:
      "From expert system design to seamless installation and ongoing support, we combine technical expertise with a commitment to performance, safety.",
    image: "/images/home/hero-bg-image.jpg",
    ctaText: "Get Free Consultation",
    ctaLink: "#consultation",
    showVideoButton: true,
    isActive: true,
    order: 1,
  },
];

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    let slides = await db
      .collection("hero_slides")
      .find({})
      .sort({ order: 1 })
      .toArray();

    if (slides.length === 0) {
      await db.collection("hero_slides").insertMany(DEFAULT_HERO_SLIDES);
      slides = await db
        .collection("hero_slides")
        .find({})
        .sort({ order: 1 })
        .toArray();
    }

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

    const savedImagePath = saveImage(body.image, "hero", nextId);

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
      updateData.image = saveImage(updateData.image, "hero", id);
      deleteImage(existing.image);
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
      deleteImage(existing.image);
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

