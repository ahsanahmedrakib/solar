import { NextResponse } from "next/server";

export async function GET() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    return NextResponse.json({
      success: false,
      error: "MONGODB_URI is not set",
      data: { envSet: false, status: "disconnected" },
    });
  }

  const protocol = uri.split("@")[0]?.split("://")[0] ?? "unknown";

  try {
    const { connectToDatabase } = await import("@/lib/db");
    const { client, db } = await connectToDatabase();

    const ping = await db.command({ ping: 1 });
    const dbName = db.databaseName;
    const collections = await db.listCollections().toArray();
    const collectionNames = collections.map((c) => c.name);
    const host = client.options?.hosts?.[0] ?? "unknown";

    return NextResponse.json({
      success: true,
      data: {
        status: "connected",
        envSet: true,
        protocol,
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
      {
        success: false,
        error: message,
        data: { envSet: true, protocol, status: "disconnected" },
      },
      { status: 500 },
    );
  }
}
