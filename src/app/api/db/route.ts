import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { client, db } = await connectToDatabase();

    const ping = await db.command({ ping: 1 });

    const dbName = db.databaseName;
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);

    const clientOptions = client.options;
    const host = clientOptions?.hosts?.[0] ?? "unknown";

    return NextResponse.json({
      success: true,
      data: {
        status: "connected",
        ping,
        database: dbName,
        host,
        collections: collectionNames,
        collectionCount: collectionNames.length,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message, data: { status: "disconnected" } },
      { status: 500 },
    );
  }
}
