import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { saveImage, deleteImage } from "@/lib/imageHelper";

type Project = {
  id: number;
  title: string;
  imageUrl: string;
  slug: string;
  category: string;
  isFeatured: boolean;
  client: string;
  location: string;
  createdAt?: Date;
};

const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: "Rooftop Solar Installation for Residential Homes",
    imageUrl: "/images/projects/project-1.jpg",
    slug: "rooftop-solar-installation-for-residential-homes",
    category: "Residential Solar",
    isFeatured: true,
    client: "Johnson Family",
    location: "Austin, TX",
  },
  {
    id: 2,
    title: "Industrial Solar Power Installation Manufacturing Unit",
    imageUrl: "/images/projects/project-2.jpg",
    slug: "industrial-solar-power-installation-manufacturing-unit",
    category: "Industrial Solar",
    isFeatured: false,
    client: "Apex Manufacturing",
    location: "Detroit, MI",
  },
  {
    id: 3,
    title: "Sustainable Solar Energy Project for Communities",
    imageUrl: "/images/projects/project-3.jpg",
    slug: "sustainable-solar-energy-project-for-communities",
    category: "Community Solar",
    isFeatured: false,
    client: "Oakwood Community Council",
    location: "Portland, OR",
  },
  {
    id: 4,
    title: "Commercial Solar Plant for Office Building",
    imageUrl: "/images/projects/project-4.jpg",
    slug: "commercial-solar-plant-for-office-building",
    category: "Commercial Solar",
    isFeatured: true,
    client: "Vanguard Corporate Center",
    location: "Phoenix, AZ",
  },
  {
    id: 5,
    title: "Solar Installation for Educational Institute",
    imageUrl: "/images/projects/project-5.jpg",
    slug: "solar-installation-for-educational-institute",
    category: "Community Solar",
    isFeatured: false,
    client: "Pinecrest High School",
    location: "Denver, CO",
  },
  {
    id: 6,
    title: "Hybrid Solar System for Hospital Facility",
    imageUrl: "/images/projects/project-6.jpg",
    slug: "hybrid-solar-system-for-hospital-facility",
    category: "Commercial Solar",
    isFeatured: false,
    client: "St. Jude Medical Center",
    location: "Miami, FL",
  },
];

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    let projects = await db.collection("projects").find({}).toArray();
    if (projects.length === 0) {
      await db.collection("projects").insertMany(DEFAULT_PROJECTS);
      projects = await db.collection("projects").find({}).toArray();
    }
    return NextResponse.json({ success: true, data: projects });
  } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const allProjects = await db.collection("projects").find({}).toArray() as unknown as Project[];
    const nextId =
      allProjects.length > 0
        ? Math.max(...allProjects.map((p) => Number(p.id))) + 1
        : 1;
    
    const savedImagePath = saveImage(body.imageUrl, "projects", nextId);
    
    const newProject = {
      ...body,
      imageUrl: savedImagePath,
      id: nextId,
      createdAt: new Date(),
    };
    
    await db.collection("projects").insertOne(newProject);
    return NextResponse.json({ success: true, data: newProject });
  } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const { db } = await connectToDatabase();
    
    const existing = await db.collection("projects").findOne({ id: Number(id) });
    if (existing) {
      if (updateData.imageUrl && updateData.imageUrl !== existing.imageUrl) {
        updateData.imageUrl = saveImage(updateData.imageUrl, "projects", id);
        deleteImage(existing.imageUrl);
      }
    }
    
    await db.collection("projects").updateOne({ id: Number(id) }, { $set: updateData });
    return NextResponse.json({ success: true, data: { id, ...updateData } });
  } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return NextResponse.json({ success: false, error: message }, { status: 500 });
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
    
    const existing = await db.collection("projects").findOne({ id: Number(id) });
    if (existing) {
      deleteImage(existing.imageUrl);
    }
    
    await db.collection("projects").deleteOne({ id: Number(id) });
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
      const message = error instanceof Error ? error.message : String(error);
      return NextResponse.json({ success: false, error: message }, { status: 500 });
    }
}



