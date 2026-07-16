import { db } from "@/lib/db";
import { isTableNotExistsError } from "@/lib/db-helpers";
import { heroSlides } from "@/lib/schema";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { NextResponse } from "next/server";
import { eq, asc, sql } from "drizzle-orm";

export async function GET() {
  try {
    const slides = await db
      .select()
      .from(heroSlides)
      .orderBy(asc(heroSlides.order));
    return NextResponse.json({ success: true, data: slides });
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
    const { tagline, title, titleAccent, description, image, videoUrl, showVideoButton, isActive, order } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, error: "title is required" },
        { status: 400 },
      );
    }

    const savedImagePath = image ? await saveImage(image, "hero", 0) : "";

    const nextOrder = order ?? (() => {
      // This will be resolved below
      return 0;
    })();

    let finalOrder = order;
    if (finalOrder === undefined) {
      const [result] = await db
        .select({ maxOrder: sql<number>`coalesce(max(${heroSlides.order}), 0)` })
        .from(heroSlides);
      finalOrder = (result?.maxOrder ?? 0) + 1;
    }

    const [newSlide] = await db
      .insert(heroSlides)
      .values({
        tagline: tagline ?? "",
        title,
        titleAccent: titleAccent ?? "",
        description: description ?? "",
        image: savedImagePath,
        videoUrl: videoUrl ?? "",
        showVideoButton: showVideoButton ?? true,
        isActive: isActive ?? true,
        order: finalOrder,
      })
      .returning();

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
    const { id, tagline, title, titleAccent, description, image, videoUrl, showVideoButton, isActive, order } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 },
      );
    }

    const [existing] = await db
      .select()
      .from(heroSlides)
      .where(eq(heroSlides.id, Number(id)))
      .limit(1);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Slide not found" },
        { status: 404 },
      );
    }

    const updateData: Record<string, unknown> = {};
    if (tagline !== undefined) updateData.tagline = tagline;
    if (title !== undefined) updateData.title = title;
    if (titleAccent !== undefined) updateData.titleAccent = titleAccent;
    if (description !== undefined) updateData.description = description;
    if (videoUrl !== undefined) updateData.videoUrl = videoUrl;
    if (showVideoButton !== undefined) updateData.showVideoButton = showVideoButton;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (order !== undefined) updateData.order = order;

    if (image && image !== existing.image) {
      updateData.image = await saveImage(image, "hero", id);
      await deleteImage(existing.image);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: true, data: existing });
    }

    await db
      .update(heroSlides)
      .set(updateData)
      .where(eq(heroSlides.id, Number(id)));

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
      .from(heroSlides)
      .where(eq(heroSlides.id, Number(id)))
      .limit(1);

    if (existing) {
      await deleteImage(existing.image);
    }

    await db.delete(heroSlides).where(eq(heroSlides.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
