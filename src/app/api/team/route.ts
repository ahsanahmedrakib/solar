import { PUBLIC_CACHE_HEADERS } from "@/lib/cache";
import { readDataFile, withWriteLock, writeDataFile } from "@/lib/fileStore";
import { DEFAULT_TEAM, type TeamMember } from "@/data/team";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { getRequestTokenPayload } from "@/lib/token";
import { NextResponse } from "next/server";

const FILE_NAME = "teamData";

function nextId(items: TeamMember[]): number {
  return items.length > 0 ? Math.max(...items.map((i) => Number(i.id))) + 1 : 1;
}

export async function GET() {
  const allMembers = readDataFile<TeamMember[]>(FILE_NAME, DEFAULT_TEAM);
  return NextResponse.json(
    { success: true, data: allMembers },
    { headers: PUBLIC_CACHE_HEADERS },
  );
}

export async function POST(request: Request) {
  try {
    const payload = getRequestTokenPayload(request);
    if (!payload) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 },
      );
    }

    const body = await request.json();
    const { name, role, image, bio, socialLinks } = body;

    if (!name || !role) {
      return NextResponse.json(
        { success: false, error: "name and role are required" },
        { status: 400 },
      );
    }

    return withWriteLock(async () => {
      const current = readDataFile<TeamMember[]>(FILE_NAME, DEFAULT_TEAM);
      const id = nextId(current);

      const savedImagePath = image ? await saveImage(image, "team", id) : "";

      const newMember: TeamMember = {
        id,
        name,
        role,
        image: savedImagePath,
        bio: bio ?? undefined,
        socialLinks: socialLinks ?? undefined,
      };

      writeDataFile(FILE_NAME, [...current, newMember]);
      return newMember;
    }).then((newMember) =>
      NextResponse.json({ success: true, data: newMember }),
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
    const { id, name, role, image, bio, socialLinks } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 },
      );
    }

    return withWriteLock(async () => {
      const current = readDataFile<TeamMember[]>(FILE_NAME, DEFAULT_TEAM);
      const index = current.findIndex((i) => i.id === Number(id));
      if (index === -1) {
        return NextResponse.json(
          { success: false, error: "Team member not found" },
          { status: 404 },
        );
      }

      const existing = current[index];
      const updated: TeamMember = { ...existing };

      if (name !== undefined) updated.name = name;
      if (role !== undefined) updated.role = role;
      if (bio !== undefined) updated.bio = bio;
      if (socialLinks !== undefined) updated.socialLinks = socialLinks;

      if (image && image !== existing.image) {
        updated.image = await saveImage(image, "team", existing.id);
        await deleteImage(existing.image);
      }

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
      const current = readDataFile<TeamMember[]>(FILE_NAME, DEFAULT_TEAM);
      const existing = current.find((i) => i.id === Number(id));
      if (existing) {
        await deleteImage(existing.image);
      }
      writeDataFile(
        FILE_NAME,
        current.filter((i) => i.id !== Number(id)),
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