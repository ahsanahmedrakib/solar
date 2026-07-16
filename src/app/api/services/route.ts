import { db } from "@/lib/db";
import { isTableNotExistsError } from "@/lib/db-helpers";
import { services } from "@/lib/schema";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allServices = await db.select().from(services);
    return NextResponse.json({ success: true, data: allServices });
  } catch (error: unknown) {
    if (isTableNotExistsError(error)) {
      return NextResponse.json({ success: true, data: [] });
    }
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
    const { title, description, serviceDetails, image, alt, iconName, slug } =
      body;

    if (!title || !description || !slug) {
      return NextResponse.json(
        { success: false, error: "title, description, and slug are required" },
        { status: 400 },
      );
    }

    const savedImagePath = image
      ? await saveImage(image, "services", 0)
      : "";

    const [newService] = await db
      .insert(services)
      .values({
        title,
        description,
        serviceDetails: serviceDetails ?? "",
        image: savedImagePath,
        alt: alt ?? "",
        iconName: iconName ?? "",
        slug,
      })
      .returning();

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
    const { id, title, description, serviceDetails, image, alt, iconName, slug } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 },
      );
    }

    const [existing] = await db
      .select()
      .from(services)
      .where(eq(services.id, Number(id)))
      .limit(1);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Service not found" },
        { status: 404 },
      );
    }

    const updateData: Record<string, unknown> = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (serviceDetails !== undefined) updateData.serviceDetails = serviceDetails;
    if (alt !== undefined) updateData.alt = alt;
    if (iconName !== undefined) updateData.iconName = iconName;
    if (slug !== undefined) updateData.slug = slug;

    if (image && image !== existing.image) {
      updateData.image = await saveImage(image, "services", id);
      await deleteImage(existing.image);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: true, data: existing });
    }

    await db
      .update(services)
      .set(updateData)
      .where(eq(services.id, Number(id)));

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

    const [existing] = await db
      .select()
      .from(services)
      .where(eq(services.id, Number(id)))
      .limit(1);
    if (existing) {
      await deleteImage(existing.image);
    }

    await db.delete(services).where(eq(services.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
