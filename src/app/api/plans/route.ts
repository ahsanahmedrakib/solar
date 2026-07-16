import { db } from "@/lib/db";
import { isTableNotExistsError } from "@/lib/db-helpers";
import { plans } from "@/lib/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const allPlans = await db.select().from(plans);
    return NextResponse.json({ success: true, data: allPlans });
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
    const { name, description, monthlyPrice, annualPrice, features, isPopular, badge } = body;

    if (!name || monthlyPrice === undefined || annualPrice === undefined) {
      return NextResponse.json(
        { success: false, error: "name, monthlyPrice, and annualPrice are required" },
        { status: 400 },
      );
    }

    const [newPlan] = await db
      .insert(plans)
      .values({
        name,
        description: description ?? "",
        monthlyPrice: Number(monthlyPrice),
        annualPrice: Number(annualPrice),
        features: features ?? [],
        isPopular: isPopular ?? false,
        badge: badge ?? null,
      })
      .returning();

    return NextResponse.json({ success: true, data: newPlan });
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
    const { id, name, description, monthlyPrice, annualPrice, features, isPopular, badge } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 },
      );
    }

    const updateData: Record<string, unknown> = {};
    if (name !== undefined) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (monthlyPrice !== undefined) updateData.monthlyPrice = Number(monthlyPrice);
    if (annualPrice !== undefined) updateData.annualPrice = Number(annualPrice);
    if (features !== undefined) updateData.features = features;
    if (isPopular !== undefined) updateData.isPopular = isPopular;
    if (badge !== undefined) updateData.badge = badge;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: true });
    }

    await db.update(plans).set(updateData).where(eq(plans.id, Number(id)));
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
    await db.delete(plans).where(eq(plans.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
