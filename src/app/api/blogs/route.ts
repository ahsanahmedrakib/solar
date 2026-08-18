import { PUBLIC_CACHE_HEADERS } from "@/lib/cache";
import { readDataFile, withWriteLock, writeDataFile } from "@/lib/fileStore";
import { DEFAULT_BLOGS, type Blog } from "@/data/blogs";
import { deleteImage, saveImage } from "@/lib/imageHelper";
import { getRequestTokenPayload } from "@/lib/token";
import { NextResponse } from "next/server";

const FILE_NAME = "blogsData";

function nextId(items: Blog[]): number {
  return items.length > 0 ? Math.max(...items.map((i) => Number(i.id))) + 1 : 1;
}

export async function GET() {
  const allBlogs = readDataFile<Blog[]>(FILE_NAME, DEFAULT_BLOGS);
  return NextResponse.json(
    { success: true, data: allBlogs },
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
      category,
      imageUrl,
      slug,
      content,
      tags,
      date,
      blogDetails,
      images,
    } = body;

    if (!title || !slug) {
      return NextResponse.json(
        { success: false, error: "title and slug are required" },
        { status: 400 },
      );
    }

    return withWriteLock(async () => {
      const current = readDataFile<Blog[]>(FILE_NAME, DEFAULT_BLOGS);
      const id = nextId(current);

      const savedImagePath = imageUrl ? await saveImage(imageUrl, "blogs", id) : "";
      const savedImages = Array.isArray(images)
        ? await Promise.all(
            images.map((img: string) => saveImage(img, "blogs", id)),
          )
        : [];

      const newBlog: Blog = {
        id,
        title,
        category: category ?? "",
        imageUrl: savedImagePath,
        slug,
        content: content ?? "",
        tags: tags ?? [],
        date:
          date ??
          new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        blogDetails: blogDetails ?? "",
        images: savedImages,
      };

      writeDataFile(FILE_NAME, [...current, newBlog]);
      return newBlog;
    }).then((newBlog) =>
      NextResponse.json({ success: true, data: newBlog }),
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
      category,
      imageUrl,
      slug,
      content,
      tags,
      date,
      blogDetails,
      images,
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 },
      );
    }

    return withWriteLock(async () => {
      const current = readDataFile<Blog[]>(FILE_NAME, DEFAULT_BLOGS);
      const index = current.findIndex((i) => i.id === Number(id));
      if (index === -1) {
        return NextResponse.json(
          { success: false, error: "Blog not found" },
          { status: 404 },
        );
      }

      const existing = current[index];
      const updated: Blog = { ...existing };

      if (title !== undefined) updated.title = title;
      if (category !== undefined) updated.category = category;
      if (slug !== undefined) updated.slug = slug;
      if (content !== undefined) updated.content = content;
      if (tags !== undefined) updated.tags = tags;
      if (date !== undefined) updated.date = date;
      if (blogDetails !== undefined) updated.blogDetails = blogDetails;

      if (imageUrl && imageUrl !== existing.imageUrl) {
        updated.imageUrl = await saveImage(imageUrl, "blogs", existing.id);
        await deleteImage(existing.imageUrl);
      }

      if (Array.isArray(images)) {
        const removed = (existing.images ?? []).filter(
          (img) => !images.includes(img),
        );
        updated.images = await Promise.all(
          images.map((img: string) => saveImage(img, "blogs", existing.id)),
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
      const current = readDataFile<Blog[]>(FILE_NAME, DEFAULT_BLOGS);
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