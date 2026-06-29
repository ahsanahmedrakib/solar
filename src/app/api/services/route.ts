import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { saveImage, deleteImage } from "@/lib/imageHelper";

const DEFAULT_SERVICES = [
  {
    id: 1,
    title: "Solar Battery Storage",
    description: "Reliable energy storage solutions that store excess solar power for use during peak hours or blackouts.",
    image: "/images/services/service-item-image-1.jpg",
    alt: "Solar Battery Storage field",
    iconName: "Battery",
    slug: "solar-battery-storage",
  },
  {
    id: 2,
    title: "Residential Solar Solutions",
    description: "Custom designed solar systems for homes that help reduce electricity bills and support clean energy goals.",
    image: "/images/services/service-item-image-2.jpg",
    alt: "Engineers working on home solar design",
    iconName: "Sun",
    slug: "residential-solar-solutions",
  },
  {
    id: 3,
    title: "Solar System Maintenance",
    description: "Regular inspection, cleaning, and performance checks to ensure your solar panels are producing at maximum efficiency.",
    image: "/images/services/service-item-image-3.jpg",
    alt: "Engineer maintaining panels",
    iconName: "Wrench",
    slug: "solar-system-maintenance",
  },
  {
    id: 4,
    title: "Rooftop Solar Solutions",
    description: "Space efficient rooftop systems designed to maximize energy generation on residential and commercial roofs.",
    image: "/images/services/service-item-image-4.jpg",
    alt: "A smiling couple standing in front of their house with rooftop solar panels",
    iconName: "Zap",
    slug: "rooftop-solar-solutions",
  },
  {
    id: 5,
    title: "Solar Panel Installation",
    description: "Professional design, permitting, and high-quality installation services for reliable green energy production.",
    image: "/images/services/service-item-image-5.jpg",
    alt: "Two technicians installing and checking solar panels on a sunny day",
    iconName: "Shield",
    slug: "solar-panel-installation",
  },
  {
    id: 6,
    title: "Hybrid Solar Systems",
    description: "A smart combination of grid-tied solar panels and battery storage to ensure continuous power supply.",
    image: "/images/services/service-item-image-6.jpg",
    alt: "Engineers inspecting a massive commercial hybrid solar system farm",
    iconName: "Globe",
    slug: "hybrid-solar-systems",
  },
];

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    let services = await db.collection("services").find({}).toArray();
    if (services.length === 0) {
      await db.collection("services").insertMany(DEFAULT_SERVICES);
      services = await db.collection("services").find({}).toArray();
    }
    return NextResponse.json({ success: true, data: services });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const allServices = await db.collection("services").find({}).toArray();
    const nextId = allServices.length > 0 ? Math.max(...allServices.map((s: any) => s.id)) + 1 : 1;
    
    const savedImagePath = saveImage(body.image, "services", nextId);
    
    const newService = {
      ...body,
      image: savedImagePath,
      id: nextId,
      createdAt: new Date(),
    };
    
    await db.collection("services").insertOne(newService);
    return NextResponse.json({ success: true, data: newService });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const { db } = await connectToDatabase();
    
    const existing = await db.collection("services").findOne({ id: Number(id) });
    if (existing) {
      if (updateData.image && updateData.image !== existing.image) {
        updateData.image = saveImage(updateData.image, "services", id);
        deleteImage(existing.image);
      }
    }
    
    await db.collection("services").updateOne({ id: Number(id) }, { $set: updateData });
    return NextResponse.json({ success: true, data: { id, ...updateData } });
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
    
    const existing = await db.collection("services").findOne({ id: Number(id) });
    if (existing) {
      deleteImage(existing.image);
    }
    
    await db.collection("services").deleteOne({ id: Number(id) });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
