import { eq } from "drizzle-orm";
import { getDefaultField } from "@/data/settings";
import { db } from "@/lib/db";
import { settings } from "@/lib/schema";

type SettingsField = { id?: string; value?: string };
type SettingsSection = { id?: string; fields?: SettingsField[] };
type SettingsDocument = { sections?: SettingsSection[] };

export interface SiteInfo {
  companyName: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  favicon: string;
}

const FALLBACK: SiteInfo = {
  companyName: getDefaultField("general", "company-name"),
  tagline: getDefaultField("general", "brand-tagline"),
  metaTitle: getDefaultField("seo", "meta-title"),
  metaDescription: getDefaultField("seo", "meta-desc"),
  keywords: getDefaultField("seo", "meta-keywords"),
  favicon: getDefaultField("general", "site-favicon"),
};

export async function getSiteInfo(): Promise<SiteInfo> {
  try {
    const rows = await db
      .select()
      .from(settings)
      .where(eq(settings.settingsId, "global"))
      .limit(1);
    const data = rows[0] as SettingsDocument | undefined;
    const field = (sectionId: string, fieldId: string) =>
      data?.sections
        ?.find((s: SettingsSection) => s.id === sectionId)
        ?.fields?.find((f: SettingsField) => f.id === fieldId)?.value ?? "";

    return {
      companyName: field("general", "company-name") || FALLBACK.companyName,
      tagline: field("general", "brand-tagline") || FALLBACK.tagline,
      metaTitle: field("seo", "meta-title") || FALLBACK.metaTitle,
      metaDescription:
        field("seo", "meta-desc") || FALLBACK.metaDescription,
      keywords: field("seo", "meta-keywords") || FALLBACK.keywords,
      favicon: field("general", "site-favicon") || FALLBACK.favicon,
    };
  } catch {
    return FALLBACK;
  }
}

export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0*39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function truncateText(text: string, maxLength = 160): string {
  const trimmed = text.trim();
  if (trimmed.length <= maxLength) return trimmed;
  const cut = trimmed.lastIndexOf(" ", maxLength);
  return `${trimmed.slice(0, cut > 0 ? cut : maxLength).trim()}...`;
}

export function slugToTitle(slug: string): string {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
