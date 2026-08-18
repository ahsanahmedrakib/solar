import { NO_CACHE_HEADERS, PUBLIC_CACHE_HEADERS } from "@/lib/cache";
import { readDataFile, withWriteLock, writeDataFile } from "@/lib/fileStore";
import { DEFAULT_PROJECTS, type Project } from "@/data/projects";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { getRequestTokenPayload } from "@/lib/token";
import { NextResponse } from "next/server";

const FILE_NAME = "projectsData";

function nextId(items: Project[]): number {
  return items.length > 0 ? Math.max(...items.map((i) => Number(i.id))) + 1 : 1;
}

export async function GET(request: Request) {
  const isAdmin = Boolean(getRequestTokenPayload(request));
  const allProjects = readDataFile<Project[]>(FILE_NAME, isAdmin ? [] : DEFAULT_PROJECTS);
  return NextResponse.json(
    { success: true, data: allProjects },
    { headers: isAdmin ? NO_CACHE_HEADERS : PUBLIC_CACHE_HEADERS },
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
    const {
      title,
      imageUrl,
      slug,
      category,
      client,
      location,
      projectDetails,
      isFeatured,
      images,
    } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, error: "title and slug are required" },
        { status: 400 },
      );
    }

    return withWriteLock(async () => {
      const current = readDataFile<Project[]>(FILE_NAME, []);
      const id = nextId(current);

      const savedImagePath = imageUrl
        ? await saveImage(imageUrl, "projects", id)
        : "";
      const savedImages = Array.isArray(images)
        ? await Promise.all(
            images.map((img: string) => saveImage(img, "projects", id)),
          )
        : [];

      const newProject: Project = {
        id,
        title,
        imageUrl: savedImagePath,
        slug,
        category: category ?? "",
        isFeatured: isFeatured ?? false,
        client: client ?? "",
        location: location ?? "",
        projectDetails: projectDetails ?? "",
        images: savedImages,
      };

      writeDataFile(FILE_NAME, [...current, newProject]);
      return newProject;
    }).then((newProject) =>
      NextResponse.json({ success: true, data: newProject }),
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
    const {
      id,
      title,
      imageUrl,
      slug,
      category,
      client,
      location,
      projectDetails,
      isFeatured,
      images,
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 },
      );
    }

    return withWriteLock(async () => {
      const current = readDataFile<Project[]>(FILE_NAME, []);
      const index = current.findIndex((i) => i.id === Number(id));
      if (index === -1) {
        return NextResponse.json(
          { success: false, error: "Project not found" },
          { status: 404 },
        );
      }

      const existing = current[index];
      const updated: Project = { ...existing };

      if (title !== undefined) updated.title = title;
      if (slug !== undefined) updated.slug = slug;
      if (category !== undefined) updated.category = category;
      if (client !== undefined) updated.client = client;
      if (location !== undefined) updated.location = location;
      if (projectDetails !== undefined) updated.projectDetails = projectDetails;
      if (isFeatured !== undefined) updated.isFeatured = isFeatured;

      if (imageUrl && imageUrl !== existing.imageUrl) {
        updated.imageUrl = await saveImage(imageUrl, "projects", existing.id);
        await deleteImage(existing.imageUrl);
      }

      if (Array.isArray(images)) {
        const removed = (existing.images ?? []).filter(
          (img) => !images.includes(img),
        );
        updated.images = await Promise.all(
          images.map((img: string) => saveImage(img, "projects", existing.id)),
        );
        for (const img of removed) {
          await deleteImage(img);
        }
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
      const current = readDataFile<Project[]>(FILE_NAME, []);
      const existing = current.find((i) => i.id === Number(id));
      if (existing) {
        await deleteImage(existing.imageUrl);
        for (const img of existing.images ?? []) {
          await deleteImage(img);
        }
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