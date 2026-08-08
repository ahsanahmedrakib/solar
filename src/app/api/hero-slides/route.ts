import { db } from "@/lib/db";
import { isTableNotExistsError } from "@/lib/db-helpers";
import { deleteImage } from "@/lib/imageHelper";
import { getRequestTokenPayload } from "@/lib/token";
import { deleteVideo, saveVideo } from "@/lib/videoHelper";
import {
  isSupportedVideoUrl,
  normalizeVideoUrl,
} from "@/lib/videoUrl";
import { heroSlides } from "@/lib/schema";
import { asc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const site = searchParams.get("site");
    const slides =
      site === "ahead" || site === "palash"
        ? await db
            .select()
            .from(heroSlides)
            .where(eq(heroSlides.site, site))
            .orderBy(asc(heroSlides.order))
        : await db
            .select()
            .from(heroSlides)
            .orderBy(asc(heroSlides.order));
    return NextResponse.json({ success: true, data: slides });
  } catch (error: unknown) {
    if (isTableNotExistsError(error)) {
      return NextResponse.json({ success: true, data: [] });
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
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
      backgroundVideo,
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

    const siteName = site === "palash" ? "palash" : "ahead";
    const [siteCount] = await db
      .select({
        count: sql<number>`count(*)::int`,
      })
      .from(heroSlides)
      .where(eq(heroSlides.site, siteName));
    const existingCount = siteCount?.count ?? 0;
    const isFirstSlide = order === 1 || (order === undefined && existingCount === 0);

    let savedVideoPath = "";
    if (isFirstSlide) {
      if (!backgroundVideo) {
        return NextResponse.json(
          { success: false, error: "Background video is required for the first slide" },
          { status: 400 },
        );
      }
      savedVideoPath = await saveVideo(backgroundVideo, "hero", 0);
    } else if (backgroundVideo) {
      return NextResponse.json(
        {
          success: false,
          error: "Only the first hero slide can have a background video",
        },
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

    const savedImagePath = "";

    let finalOrder = order;
    if (finalOrder === undefined) {
      const [result] = await db
        .select({
          maxOrder: sql<number>`coalesce(max(${heroSlides.order}), 0)`,
        })
        .from(heroSlides);
      finalOrder = (result?.maxOrder ?? 0) + 1;
    }

    const [newSlide] = await db
      .insert(heroSlides)
      .values({
        tagline: tagline ?? "",
        title,
        titleAccent: titleAccent ?? "",
        description: description ?? "",
        image: savedImagePath,
        backgroundVideo: savedVideoPath,
        useVideoBackground: true,
        site: site === "palash" ? "palash" : "ahead",
        videoUrl: finalVideoUrl,
        showVideoButton: wantsVideoButton,
        isActive: isActive ?? true,
        order: finalOrder,
      })
      .returning();

    return NextResponse.json({ success: true, data: newSlide });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
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
      backgroundVideo,
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

    const [existing] = await db
      .select()
      .from(heroSlides)
      .where(eq(heroSlides.id, Number(id)))
      .limit(1);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: "Slide not found" },
        { status: 404 },
      );
    }

    const updateData: Record<string, unknown> = {};
    if (tagline !== undefined) updateData.tagline = tagline;
    if (title !== undefined) updateData.title = title;
    if (titleAccent !== undefined) updateData.titleAccent = titleAccent;
    if (description !== undefined) updateData.description = description;
    updateData.useVideoBackground = true;
    if (backgroundVideo !== undefined) {
      if (existing.order !== 1) {
        return NextResponse.json(
          {
            success: false,
            error: "Only the first hero slide can have a background video",
          },
          { status: 400 },
        );
      }
      if (!backgroundVideo) {
        return NextResponse.json(
          {
            success: false,
            error: "Background video is required for the first slide",
          },
          { status: 400 },
        );
      }
      const savedVideo = await saveVideo(backgroundVideo, "hero", id);
      if (savedVideo !== existing.backgroundVideo) {
        updateData.backgroundVideo = savedVideo;
        await deleteVideo(existing.backgroundVideo);
      }
    }
    if (site === "ahead" || site === "palash") updateData.site = site;

    const nextShowVideoButton =
      showVideoButton !== undefined ? showVideoButton : existing.showVideoButton;
    if (showVideoButton !== undefined)
      updateData.showVideoButton = showVideoButton;

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
        updateData.videoUrl = normalizeVideoUrl(rawVideoUrl);
      } else {
        updateData.videoUrl = "";
      }
    }

    if (isActive !== undefined) updateData.isActive = isActive;
    if (order !== undefined) updateData.order = order;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ success: true, data: existing });
    }

    await db
      .update(heroSlides)
      .set(updateData)
      .where(eq(heroSlides.id, Number(id)));

    return NextResponse.json({ success: true, data: { id, ...updateData } });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
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

    const [existing] = await db
      .select()
      .from(heroSlides)
      .where(eq(heroSlides.id, Number(id)))
      .limit(1);

    if (existing) {
      await deleteImage(existing.image);
      await deleteVideo(existing.backgroundVideo);
    }

    await db.delete(heroSlides).where(eq(heroSlides.id, Number(id)));
    return NextResponse.json({ success: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}

