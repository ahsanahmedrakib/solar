import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { saveImage, deleteImage } from "@/lib/imageHelper";

const DEFAULT_TEAM = [
  {
    id: 1,
    name: "Leslie Alexander",
    role: "Lead Solar Engineer",
    image: "/images/about/team-image-1.jpg",
  },
  {
    id: 2,
    name: "Marvin McKinney",
    role: "Lead Solar Engineer",
    image: "/images/about/team-image-2.jpg",
  },
  {
    id: 3,
    name: "Kathryn Murphy",
    role: "Lead Solar Engineer",
    image: "/images/about/team-image-3.jpg",
  },
];

export async function GET() {
  try {
    const { db } = await connectToDatabase();
    let team = await db.collection("team").find({}).toArray();
    if (team.length === 0) {
      await db.collection("team").insertMany(DEFAULT_TEAM);
      team = await db.collection("team").find({}).toArray();
    }
    return NextResponse.json({ success: true, data: team });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { db } = await connectToDatabase();
    
    const allMembers = await db.collection("team").find({}).toArray();
    const nextId = allMembers.length > 0 ? Math.max(...allMembers.map((m: any) => m.id)) + 1 : 1;
    
    const savedImagePath = saveImage(body.image, "team", nextId);
    
    const newMember = {
      ...body,
      image: savedImagePath,
      id: nextId,
      createdAt: new Date(),
    };
    
    await db.collection("team").insertOne(newMember);
    return NextResponse.json({ success: true, data: newMember });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updateData } = body;
    const { db } = await connectToDatabase();
    
    const existing = await db.collection("team").findOne({ id: Number(id) });
    if (existing) {
      if (updateData.image && updateData.image !== existing.image) {
        updateData.image = saveImage(updateData.image, "team", id);
        deleteImage(existing.image);
      }
    }
    
    await db.collection("team").updateOne({ id: Number(id) }, { $set: updateData });
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
    
    const existing = await db.collection("team").findOne({ id: Number(id) });
    if (existing) {
      deleteImage(existing.image);
    }
    
    await db.collection("team").deleteOne({ id: Number(id) });
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
