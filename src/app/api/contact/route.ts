import { readDataFile, withWriteLock, writeDataFile } from "@/lib/fileStore";
import type { ContactQuery } from "@/data/contact";
import { getClientIp, isRateLimited } from "@/lib/rateLimit";
import { getRequestTokenPayload } from "@/lib/token";
import { NextResponse } from "next/server";

const FILE_NAME = "contactData";

export async function GET(request: Request) {
  try {
    const payload = getRequestTokenPayload(request);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const queries = readDataFile<ContactQuery[]>(FILE_NAME, []);
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
    const ip = getClientIp(request);
    if (isRateLimited(`contact:${ip}`, 5, 15 * 60 * 1000)) {
      return NextResponse.json(
        { success: false, error: "Too many requests. Please try again later." },
        { status: 429 },
      );
    }

    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: "name, email, subject, and message are required" },
        { status: 400 },
      );
    }

    if (typeof name !== "string" || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Name must be at least 2 characters" },
        { status: 400 },
      );
    }

    if (
      typeof email !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
    ) {
      return NextResponse.json(
        { success: false, error: "Invalid email address" },
        { status: 400 },
      );
    }

    if (typeof message !== "string" || message.trim().length < 10) {
      return NextResponse.json(
        { success: false, error: "Message must be at least 10 characters" },
        { status: 400 },
      );
    }

    if (typeof subject !== "string" || subject.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: "Subject must be at least 2 characters" },
        { status: 400 },
      );
    }

    return withWriteLock(async () => {
      const current = readDataFile<ContactQuery[]>(FILE_NAME, []);
      const newQuery: ContactQuery = {
        id: `cq-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: name.trim(),
        email: email.trim(),
        phone: typeof phone === "string" ? phone.trim() : "",
        subject: subject.trim(),
        message: message.trim(),
        createdAt: new Date().toISOString(),
        status: "new",
      };
      writeDataFile(FILE_NAME, [...current, newQuery]);
      return newQuery;
    }).then((newQuery) =>
      NextResponse.json({ success: true, data: newQuery }),
    );
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
    const payload = getRequestTokenPayload(request);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { id, name, email, phone, subject, message, status, notes } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 },
      );
    }

    return withWriteLock(async () => {
      const current = readDataFile<ContactQuery[]>(FILE_NAME, []);
      const index = current.findIndex((q) => q.id === id);
      if (index === -1) {
        return NextResponse.json(
          { success: false, error: "Query not found" },
          { status: 404 },
        );
      }

      const updated: ContactQuery = { ...current[index] };
      if (name !== undefined) updated.name = name;
      if (email !== undefined) updated.email = email;
      if (phone !== undefined) updated.phone = phone;
      if (subject !== undefined) updated.subject = subject;
      if (message !== undefined) updated.message = message;
      if (status !== undefined) updated.status = status;
      if (notes !== undefined) updated.notes = notes;

      const next = [...current];
      next[index] = updated;
      writeDataFile(FILE_NAME, next);
      return NextResponse.json({ success: true, data: updated });
    });
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
      const current = readDataFile<ContactQuery[]>(FILE_NAME, []);
      writeDataFile(
        FILE_NAME,
        current.filter((q) => q.id !== id),
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