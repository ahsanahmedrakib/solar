import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const plans = await db.collection("plans").find({}).toArray();
    return NextResponse.json({ success: true, data: plans });
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

    const allPlans = await db.collection("plans").find({}).toArray();
    const nextId =
      allPlans.length > 0 ? Math.max(...allPlans.map((p) => p.id)) + 1 : 1;

    const newPlan = {
      ...body,
      id: nextId,
      createdAt: new Date(),
    };

    await db.collection("plans").insertOne(newPlan);
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
    const { id, ...updateData } = body;
    const { db } = await connectToDatabase();

    await db
      .collection("plans")
      .updateOne({ id: Number(id) }, { $set: updateData });
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
    await db.collection("plans").deleteOne({ id: Number(id) });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

