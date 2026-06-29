import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

const DEFAULT_QUERIES = [
  {
    id: "cq-101",
    name: "Michael Henderson",
    email: "m.henderson@example.com",
    phone: "+1 (555) 234-5678",
    subject: "Residential Solar Panel Installation Quote",
    message: "Hello, I am looking to install a 10kW solar system on my rooftop in Austin. Could you please send me an estimated pricing sheet and available tax rebate info?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    status: "new",
  },
  {
    id: "cq-102",
    name: "Sarah Jenkins",
    email: "sarah.j@greencorp.org",
    phone: "+1 (555) 876-5432",
    subject: "Commercial Battery Storage Consultation",
    message: "We operate a commercial facility and wish to integrate high-capacity Tesla Powerwall or commercial battery backups to mitigate power outages.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    status: "new",
  },
  {
    id: "cq-103",
    name: "David Miller",
    email: "david.miller@techhub.io",
    phone: "+1 (555) 345-6789",
    subject: "Maintenance & Inverter Diagnostics",
    message: "Our inverter displays an error code E-04 since yesterday morning. We need an urgent technician dispatch.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    status: "replied",
    notes: "Dispatched field technician John Doe for inspection on June 28.",
  },
  {
    id: "cq-104",
    name: "Elena Rostova",
    email: "elena.r@lifestyle.com",
    phone: "+1 (555) 987-1234",
    subject: "General Inquiry regarding Warranty",
    message: "Hi! I wanted to check what brand of solar panels you supply and if they come with a 25-year performance warranty.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    status: "archived",
  },
];

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    let queries = await db.collection("contact_queries").find({}).toArray();
    if (queries.length === 0) {
      await db.collection("contact_queries").insertMany(DEFAULT_QUERIES);
      queries = await db.collection("contact_queries").find({}).toArray();
    }
    return NextResponse.json({ success: true, data: queries });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
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
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const { db } = await connectToDatabase();
    
    await db.collection("contact_queries").updateOne({ id: id }, { $set: updateData });
    return NextResponse.json({ success: true, data: body });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) {
      return NextResponse.json({ success: false, error: "Missing ID parameter" }, { status: 400 });
    }
    const { db } = await connectToDatabase();
    await db.collection("contact_queries").deleteOne({ id: id });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
