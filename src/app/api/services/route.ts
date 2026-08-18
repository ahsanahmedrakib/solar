import { PUBLIC_CACHE_HEADERS } from "@/lib/cache";
import { readDataFile, withWriteLock, writeDataFile } from "@/lib/fileStore";
import { DEFAULT_SERVICES, type Service } from "@/data/services";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { getRequestTokenPayload } from "@/lib/token";
import { NextResponse } from "next/server";

const FILE_NAME = "servicesData";

function nextId(items: Service[]): number {
  return items.length > 0 ? Math.max(...items.map((i) => Number(i.id))) + 1 : 1;
}

export async function GET() {
  const allServices = readDataFile<Service[]>(FILE_NAME, DEFAULT_SERVICES);
  return NextResponse.json(
    { success: true, data: allServices },
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
    const {
      title,
      description,
      serviceDetails,
      image,
      alt,
      iconName,
      slug,
      images,
    } = body;

    if (!title || !description || !slug) {
      return NextResponse.json(
        { success: false, error: "title, description, and slug are required" },
        { status: 400 },
      );
    }

    return withWriteLock(async () => {
      const current = readDataFile<Service[]>(FILE_NAME, DEFAULT_SERVICES);
      const id = nextId(current);

      const savedImagePath = image ? await saveImage(image, "services", id) : "";
      const savedImages = Array.isArray(images)
        ? await Promise.all(
            images.map((img: string) => saveImage(img, "services", id)),
          )
        : [];

      const newService: Service = {
        id,
        title,
        description,
        serviceDetails: serviceDetails ?? "",
        image: savedImagePath,
        alt: alt ?? "",
        iconName: iconName ?? "",
        slug,
        images: savedImages,
      };

      writeDataFile(FILE_NAME, [...current, newService]);
      return newService;
    }).then((newService) =>
      NextResponse.json({ success: true, data: newService }),
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
      description,
      serviceDetails,
      image,
      alt,
      iconName,
      slug,
      images,
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 },
      );
    }

    return withWriteLock(async () => {
      const current = readDataFile<Service[]>(FILE_NAME, DEFAULT_SERVICES);
      const index = current.findIndex((i) => i.id === Number(id));
      if (index === -1) {
        return NextResponse.json(
          { success: false, error: "Service not found" },
          { status: 404 },
        );
      }

      const existing = current[index];
      const updated: Service = { ...existing };

      if (title !== undefined) updated.title = title;
      if (description !== undefined) updated.description = description;
      if (serviceDetails !== undefined) updated.serviceDetails = serviceDetails;
      if (alt !== undefined) updated.alt = alt;
      if (iconName !== undefined) updated.iconName = iconName;
      if (slug !== undefined) updated.slug = slug;

      if (image && image !== existing.image) {
        updated.image = await saveImage(image, "services", existing.id);
        await deleteImage(existing.image);
      }

      if (Array.isArray(images)) {
        const removed = (existing.images ?? []).filter(
          (img) => !images.includes(img),
        );
        updated.images = await Promise.all(
          images.map((img: string) => saveImage(img, "services", existing.id)),
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
      const current = readDataFile<Service[]>(FILE_NAME, DEFAULT_SERVICES);
      const existing = current.find((i) => i.id === Number(id));
      if (existing) {
        await deleteImage(existing.image);
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