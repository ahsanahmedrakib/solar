import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const queries = await db.collection("contact_queries").find({}).toArray();
    return NextResponse.json({ success: true, data: queries });
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

    const newQuery = {
      ...body,
      id: body.id || `cq-${Date.now()}`,
      createdAt: body.createdAt || new Date().toISOString(),
      status: body.status || "new",
    };

    await db.collection("contact_queries").insertOne(newQuery);
    return NextResponse.json({ success: true, data: newQuery });
  } catch (error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const { db } = await connectToDatabase();

    await db
      .collection("contact_queries")
      .updateOne({ id: id }, { $set: updateData });
    return NextResponse.json({ success: true, data: body });
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
    await db.collection("contact_queries").deleteOne({ id: id });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}




