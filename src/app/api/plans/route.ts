import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";

const DEFAULT_PLANS = [
  {
    id: 1,
    name: "Basic Solar Plan",
    description: "Perfect entry-level solar solution to start reducing your electricity bills immediately.",
    monthlyPrice: 299.0,
    annualPrice: 249.0,
    features: [
      "High-Efficiency Solar Panels",
      "Real-Time Performance Monitoring",
      "Hybrid Inverter Support",
      "Basic Installation & Setup",
    ],
    isPopular: false,
  },
  {
    id: 2,
    name: "Standard Solar Plan",
    description: "Balanced solution with enhanced performance and better energy storage options.",
    monthlyPrice: 499.0,
    annualPrice: 419.0,
    features: [
      "High-Efficiency Solar Panels",
      "Real-Time Performance Monitoring",
      "Hybrid Inverter + Battery Support",
      "Advanced Monitoring Dashboard",
      "Priority Installation",
    ],
    isPopular: true,
    badge: "Most Popular",
  },
  {
    id: 3,
    name: "Premium Solar Plan",
    description: "Complete energy independence with top-tier equipment and full smart home integration.",
    monthlyPrice: 699.0,
    annualPrice: 589.0,
    features: [
      "Premium High-Efficiency Panels",
      "Real-Time Performance Monitoring",
      "Full Hybrid Battery System",
      "Smart Home Integration",
      "Premium Installation & Support",
      "Extended 25-Year Warranty",
    ],
    isPopular: false,
  },
];

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    let plans = await db.collection("plans").find({}).toArray();
    if (plans.length === 0) {
      await db.collection("plans").insertMany(DEFAULT_PLANS);
      plans = await db.collection("plans").find({}).toArray();
    }
    return NextResponse.json({ success: true, data: plans });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const allPlans = await db.collection("plans").find({}).toArray();
    const nextId = allPlans.length > 0 ? Math.max(...allPlans.map((p: any) => p.id)) + 1 : 1;
    
    const newPlan = {
      ...body,
      id: nextId,
      createdAt: new Date(),
    };
    
    await db.collection("plans").insertOne(newPlan);
    return NextResponse.json({ success: true, data: newPlan });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const { db } = await connectToDatabase();
    
    await db.collection("plans").updateOne({ id: Number(id) }, { $set: updateData });
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
    await db.collection("plans").deleteOne({ id: Number(id) });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
