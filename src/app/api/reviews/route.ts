import { NO_CACHE_HEADERS, PUBLIC_CACHE_HEADERS } from "@/lib/cache";
import { readDataFile, withWriteLock, writeDataFile } from "@/lib/fileStore";
import { DEFAULT_REVIEWS, type Review } from "@/data/reviews";
import { getRequestTokenPayload } from "@/lib/token";
import { NextResponse } from "next/server";

const FILE_NAME = "reviewsData";

function nextId(items: Review[]): number {
  return items.length > 0 ? Math.max(...items.map((i) => Number(i.id))) + 1 : 1;
}

export async function GET(request: Request) {
  const isAdmin = Boolean(getRequestTokenPayload(request));
  const allReviews = readDataFile<Review[]>(FILE_NAME, isAdmin ? [] : DEFAULT_REVIEWS);
  return NextResponse.json(
    { success: true, data: allReviews },
    { headers: isAdmin ? NO_CACHE_HEADERS : PUBLIC_CACHE_HEADERS },
  );
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

    return withWriteLock(async () => {
      const current = readDataFile<Review[]>(FILE_NAME, []);
      const newReview: Review = {
        id: nextId(current),
        name,
        role,
        rating: rating ?? 5,
        quote,
        createdAt: new Date().toISOString(),
      };
      writeDataFile(FILE_NAME, [...current, newReview]);
      return newReview;
    }).then((newReview) =>
      NextResponse.json({ success: true, data: newReview }),
    );
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

    return withWriteLock(async () => {
      const current = readDataFile<Review[]>(FILE_NAME, []);
      writeDataFile(
        FILE_NAME,
        current.filter((i) => i.id !== Number(id)),
      );
      return NextResponse.json({ success: true });
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}