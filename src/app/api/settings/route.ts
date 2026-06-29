import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    const settings = await db.collection("settings").findOne({ settingsId: "global" });
    if (!settings) {
      return NextResponse.json({ success: true, data: null });
    }
    return NextResponse.json({ success: true, data: settings.sections });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sections } = body;
    const { db } = await connectToDatabase();

    const result = await db.collection("settings").updateOne(
      { settingsId: "global" },
      { $set: { sections, updatedAt: new Date() } },
      { upsert: true }
    );

    return NextResponse.json({ success: true, result });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
