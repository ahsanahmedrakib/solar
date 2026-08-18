import { NO_CACHE_HEADERS, PUBLIC_CACHE_HEADERS } from "@/lib/cache";
import { readDataFile, withWriteLock, writeDataFile } from "@/lib/fileStore";
import {
  DEFAULT_HERO_SLIDES,
  PALASH_HERO_SLIDES,
  type HeroSlide,
  type HeroSite,
} from "@/data/hero-slides";
import { getRequestTokenPayload } from "@/lib/token";
import {
  isSupportedVideoUrl,
  normalizeVideoUrl,
} from "@/lib/videoUrl";
import { NextResponse } from "next/server";

const FILE_NAME = "heroSlidesData";

function nextId(items: HeroSlide[]): number {
  return items.length > 0 ? Math.max(...items.map((i) => Number(i.id))) + 1 : 1;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const site = searchParams.get("site");
  const isAdmin = Boolean(getRequestTokenPayload(request));
  const stored = readDataFile<HeroSlide[]>(FILE_NAME, []);

  const fallback =
    site === "palash" ? PALASH_HERO_SLIDES : DEFAULT_HERO_SLIDES;
  const slides =
    site === "ahead" || site === "palash"
      ? stored.filter((s) => s.site === site)
      : stored;

  const data = isAdmin ? slides : slides.length > 0 ? slides : fallback;
  return NextResponse.json(
    { success: true, data },
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
      tagline,
      title,
      titleAccent,
      description,
      site,
      videoUrl,
      showVideoButton,
      isActive,
      order,
    } = body;

    if (!title) {
      return NextResponse.json(
        { success: false, error: "title is required" },
        { status: 400 },
      );
    }

    const wantsVideoButton = showVideoButton ?? false;
    let finalVideoUrl = "";
    if (wantsVideoButton) {
      const rawVideoUrl = String(videoUrl ?? "").trim();
      if (!rawVideoUrl) {
        return NextResponse.json(
          {
            success: false,
            error: "Video URL is required when Show video button is enabled",
          },
          { status: 400 },
        );
      }
      if (!isSupportedVideoUrl(rawVideoUrl)) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Video URL must be a YouTube watch link or a Google Drive view link",
          },
          { status: 400 },
        );
      }
      finalVideoUrl = normalizeVideoUrl(rawVideoUrl);
    }

    return withWriteLock(async () => {
      const current = readDataFile<HeroSlide[]>(FILE_NAME, []);
      const id = nextId(current);
      const targetSite: HeroSite = site === "palash" ? "palash" : "ahead";

      let finalOrder = order;
      if (finalOrder === undefined) {
        finalOrder =
          current.filter((s) => s.site === targetSite).reduce(
            (max, s) => Math.max(max, Number(s.order) || 0),
            0,
          ) + 1;
      }

      const newSlide: HeroSlide = {
        id,
        tagline: tagline ?? "",
        title,
        titleAccent: titleAccent ?? "",
        description: description ?? "",
        site: targetSite,
        videoUrl: finalVideoUrl,
        showVideoButton: wantsVideoButton,
        isActive: isActive ?? true,
        order: finalOrder,
      };

      writeDataFile(FILE_NAME, [...current, newSlide]);
      return newSlide;
    }).then((newSlide) =>
      NextResponse.json({ success: true, data: newSlide }),
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
      tagline,
      title,
      titleAccent,
      description,
      site,
      videoUrl,
      showVideoButton,
      isActive,
      order,
    } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "ID is required" },
        { status: 400 },
      );
    }

    return withWriteLock(async () => {
      const current = readDataFile<HeroSlide[]>(FILE_NAME, []);
      const index = current.findIndex((i) => i.id === Number(id));
      if (index === -1) {
        return NextResponse.json(
          { success: false, error: "Slide not found" },
          { status: 404 },
        );
      }

      const existing = current[index];
      const updated: HeroSlide = { ...existing };

      if (tagline !== undefined) updated.tagline = tagline;
      if (title !== undefined) updated.title = title;
      if (titleAccent !== undefined) updated.titleAccent = titleAccent;
      if (description !== undefined) updated.description = description;
      if (site === "ahead" || site === "palash") updated.site = site;

      const nextShowVideoButton =
        showVideoButton !== undefined
          ? showVideoButton
          : existing.showVideoButton;
      if (showVideoButton !== undefined)
        updated.showVideoButton = showVideoButton;

      if (
        videoUrl !== undefined ||
        (showVideoButton !== undefined && nextShowVideoButton)
      ) {
        if (nextShowVideoButton) {
          const rawVideoUrl =
            videoUrl !== undefined ? String(videoUrl).trim() : existing.videoUrl;
          if (!rawVideoUrl) {
            return NextResponse.json(
              {
                success: false,
                error:
                  "Video URL is required when Show video button is enabled",
              },
              { status: 400 },
            );
          }
          if (!isSupportedVideoUrl(rawVideoUrl)) {
            return NextResponse.json(
              {
                success: false,
                error:
                  "Video URL must be a YouTube watch link or a Google Drive view link",
              },
              { status: 400 },
            );
          }
          updated.videoUrl = normalizeVideoUrl(rawVideoUrl);
        } else {
          updated.videoUrl = "";
        }
      }

      if (isActive !== undefined) updated.isActive = isActive;
      if (order !== undefined) updated.order = order;

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
      const current = readDataFile<HeroSlide[]>(FILE_NAME, []);
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