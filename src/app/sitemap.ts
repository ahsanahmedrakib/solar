import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { readDataFile } from "@/lib/fileStore";
import { DEFAULT_PROJECTS } from "@/data/projects";
import { DEFAULT_SERVICES } from "@/data/services";

export const dynamic = "force-dynamic";

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
    const servicesData = readDataFile("servicesData", DEFAULT_SERVICES);
    const projectsData = readDataFile("projectsData", DEFAULT_PROJECTS);

    entries.push(
      ...servicesData.map((item) => ({
        url: `${SITE_URL}/services/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
      ...projectsData.map((item) => ({
        url: `${SITE_URL}/projects/${item.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.8,
      })),
    );
  } catch {
    // fall back to the static entries above if data files are unavailable
  }

  return entries;
}