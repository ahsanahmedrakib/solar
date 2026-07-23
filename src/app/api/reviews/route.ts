import { db } from "@/lib/db";
import { isTableNotExistsError } from "@/lib/db-helpers";
import { reviews } from "@/lib/schema";
import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

export async function GET() {
  try {
    const allReviews = await db.select().from(reviews).orderBy(desc(reviews.createdAt));
    return NextResponse.json({ success: true, data: allReviews });
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
    const { name, role, rating, quote } = body;

    if (!name || !role || !quote) {
      return NextResponse.json(
        { success: false, error: "name, role, and quote are required" },
        { status: 400 },
      );
    }

    const newReview = {
      name,
      role,
      rating: rating ?? 5,
      quote,
    };

    const inserted = await db.insert(reviews).values(newReview).returning();
    return NextResponse.json({ success: true, data: inserted[0] });
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
    await db.delete(reviews).where(eq(reviews.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
