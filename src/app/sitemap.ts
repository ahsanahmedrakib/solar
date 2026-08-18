import type { MetadataRoute } from "next";
import { unstable_cache } from "next/cache";
import { SITE_URL } from "@/lib/config";
import { db } from "@/lib/db";
import { isTableNotExistsError } from "@/lib/db-helpers";
import { blogs, projects, services } from "@/lib/schema";

export const dynamic = "force-dynamic";

const getCachedSitemapRows = unstable_cache(
  async () =>
    Promise.all([
      db
        .select({ slug: services.slug, updatedAt: services.createdAt })
        .from(services),
      db
        .select({ slug: projects.slug, updatedAt: projects.createdAt })
        .from(projects),
      db
        .select({ slug: blogs.slug, updatedAt: blogs.createdAt })
        .from(blogs),
    ]),
  ["sitemap-rows"],
  { revalidate: 3600, tags: ["services", "projects", "blogs"] },
);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/palash-charging-station`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    const [serviceRows, projectRows, blogRows] = await getCachedSitemapRows();

    entries.push(
      ...serviceRows.map((item) => ({
        url: `${SITE_URL}/services/${item.slug}`,
        lastModified: item.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
      ...projectRows.map((item) => ({
        url: `${SITE_URL}/projects/${item.slug}`,
        lastModified: item.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
      ...blogRows.map((item) => ({
        url: `${SITE_URL}/blogs/${item.slug}`,
        lastModified: item.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    );
  } catch (error) {
    if (!isTableNotExistsError(error)) {
      throw error;
    }
  }

  return entries;
}
