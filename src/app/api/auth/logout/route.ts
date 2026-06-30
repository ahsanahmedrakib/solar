import { NextResponse } from "next/server";

export async function POST() {
  try {
    return NextResponse.json({ success: true, message: "Logged out successfully" });
  } catch {
    return NextResponse.json({ success: true, message: "Logged out" });
  }
}
