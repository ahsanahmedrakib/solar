import { PUBLIC_CACHE_HEADERS, cachedDbQuery, revalidateContent } from "@/lib/cache";
import { db } from "@/lib/db";
import { isTableNotExistsError } from "@/lib/db-helpers";
import { reviews } from "@/lib/schema";
import { getRequestTokenPayload } from "@/lib/token";
import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";

const getCachedReviews = cachedDbQuery(
  () => db.select().from(reviews).orderBy(desc(reviews.createdAt)),
  ["api-reviews"],
  ["reviews"],
);

export async function GET() {
  try {
    const allReviews = await getCachedReviews();
    return NextResponse.json(
      { success: true, data: allReviews },
      { headers: PUBLIC_CACHE_HEADERS },
    );
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
    revalidateContent();
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
    const payload = getRequestTokenPayload(request);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing ID parameter" },
        { status: 400 },
      );
    }
    await db.delete(reviews).where(eq(reviews.id, Number(id)));
    revalidateContent();
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
