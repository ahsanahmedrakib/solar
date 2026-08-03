import { db } from "@/lib/db";
import { isTableNotExistsError } from "@/lib/db-helpers";
import { contactQueries } from "@/lib/schema";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";
import { NextResponse } from "next/server";

const PHONE_REGEX = /^[+]?[0-9\s\-()]{7,20}$/;

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);
    if (isRateLimited(`palash:${ip}`, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const {
      fullName,
      businessName,
      mobile,
      whatsapp,
      email,
      district,
      thana,
      address,
      services,
      hasBusiness,
      experienceYears,
      space,
      comments,
    } = body;

    if (typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Full name must be at least 2 characters" },
        { status: 400 },
      );
    }

    if (typeof mobile !== "string" || !PHONE_REGEX.test(mobile.trim())) {
      return NextResponse.json(
        { success: false, error: "Invalid mobile number" },
        { status: 400 },
      );
    }

    if (whatsapp != null && whatsapp !== "" && typeof whatsapp === "string") {
      if (!PHONE_REGEX.test(whatsapp.trim())) {
        return NextResponse.json(
          { success: false, error: "Invalid WhatsApp number" },
          { status: 400 },
        );
      }
    }

    if (email != null && email !== "" && typeof email === "string") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return NextResponse.json(
          { success: false, error: "Invalid email address" },
          { status: 400 },
        );
      }
    }

    if (typeof district !== "string" || district.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "District is required" },
        { status: 400 },
      );
    }

    if (typeof thana !== "string" || thana.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Thana / Upazila is required" },
        { status: 400 },
      );
    }

    if (typeof address !== "string" || address.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Full address is required" },
        { status: 400 },
      );
    }

    const serviceList = Array.isArray(services) ? services : [];
    if (serviceList.length === 0) {
      return NextResponse.json(
        { success: false, error: "Select at least one dealership interest" },
        { status: 400 },
      );
    }

    if (hasBusiness !== "yes" && hasBusiness !== "no") {
      return NextResponse.json(
        { success: false, error: "Please select whether you have an existing business" },
        { status: 400 },
      );
    }

    if (space !== "own" && space !== "rented" && space !== "looking") {
      return NextResponse.json(
        { success: false, error: "Please select your facility status" },
        { status: 400 },
      );
    }

    const message = [
      `Business/Shop Name: ${businessName?.trim() || "-"}`,
      `Mobile: ${mobile.trim()}`,
      `WhatsApp: ${whatsapp?.trim() || "-"}`,
      `Email: ${email?.trim() || "-"}`,
      `District: ${district.trim()}`,
      `Thana/Upazila: ${thana.trim()}`,
      `Full Address: ${address.trim()}`,
      `Dealership Interest: ${serviceList.join(", ")}`,
      `Existing Business: ${hasBusiness === "yes" ? "Yes" : "No (new investor)"}`,
      `Years of Experience: ${experienceYears?.trim() || "-"}`,
      `Facility Status: ${space}`,
      `Additional Comments: ${comments?.trim() || "-"}`,
    ].join("\n");

    const newQuery = {
      id: `palash-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: fullName.trim(),
      email: (email && email.trim()) || `application-${Date.now()}@palash.local`,
      phone: mobile.trim(),
      subject: "Palash Charging Station - Dealership & Partner Application",
      message,
      createdAt: new Date().toISOString(),
      status: "new",
      notes: null,
    };

    await db.insert(contactQueries).values(newQuery);
    return NextResponse.json({ success: true, data: newQuery });
  } catch (error: unknown) {
    if (isTableNotExistsError(error)) {
      return NextResponse.json({ success: true });
    }
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
