import type { Metadata } from "next";
import { getDefaultField } from "@/data/settings";
import {
  COMPANY_NAME,
  FACEBOOK_PAGE_URL,
  FAVICON,
  LINKEDIN_URL,
  SITE_LOGO,
  SITE_URL,
} from "@/lib/config";
import { readDataFile } from "@/lib/fileStore";

type SettingsField = { id?: string; value?: string };
type SettingsSection = { id?: string; fields?: SettingsField[] };

export interface SiteInfo {
  companyName: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  favicon: string;
  logo: string;
  email: string;
  phone: string;
  address: string;
  facebookUrl: string;
  linkedinUrl: string;
}

const FALLBACK: SiteInfo = {
  companyName: COMPANY_NAME,
  tagline: getDefaultField("general", "brand-tagline"),
  metaTitle: getDefaultField("seo", "meta-title"),
  metaDescription: getDefaultField("seo", "meta-desc"),
  keywords: getDefaultField("seo", "meta-keywords"),
  favicon: FAVICON,
  logo: SITE_LOGO,
  email: getDefaultField("general", "contact-email"),
  phone: getDefaultField("general", "phone-number"),
  address: getDefaultField("general", "hq-address"),
  facebookUrl: getDefaultField("social", "social-fb") || FACEBOOK_PAGE_URL,
  linkedinUrl: getDefaultField("social", "social-li") || LINKEDIN_URL,
};

export async function getSiteInfo(): Promise<SiteInfo> {
  try {
    const data = readDataFile<{ sections?: SettingsSection[] } | null>(
      "settingsData",
      null,
    );
    const field = (sectionId: string, fieldId: string) =>
      data?.sections
        ?.find((s: SettingsSection) => s.id === sectionId)
        ?.fields?.find((f: SettingsField) => f.id === fieldId)?.value ?? "";

    return {
      companyName: COMPANY_NAME,
      tagline: field("general", "brand-tagline") || FALLBACK.tagline,
      metaTitle: field("seo", "meta-title") || FALLBACK.metaTitle,
      metaDescription:
        field("seo", "meta-desc") || FALLBACK.metaDescription,
      keywords: field("seo", "meta-keywords") || FALLBACK.keywords,
      favicon: FAVICON,
      logo: SITE_LOGO,
      email: field("general", "contact-email") || FALLBACK.email,
      phone: field("general", "phone-number") || FALLBACK.phone,
      address: field("general", "hq-address") || FALLBACK.address,
      facebookUrl: field("social", "social-fb") || FALLBACK.facebookUrl,
      linkedinUrl: field("social", "social-li") || FALLBACK.linkedinUrl,
    };
  } catch {
    return FALLBACK;
  }
}

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}

export interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  images?: string[];
  type?: "website" | "article";
  noindex?: boolean;
}

export async function pageMetadata(
  opts: PageMetadataOptions,
  site?: SiteInfo,
): Promise<Metadata> {
  const info = site ?? (await getSiteInfo());
  const canonical = absoluteUrl(opts.path);
  const images = (opts.images ?? [])
    .filter((src) => src && /^(?:\/|https?:\/\/)/.test(src))
    .map((src) => absoluteUrl(src));

  const metadata: Metadata = {
    title: opts.title,
    description: opts.description,
    alternates: { canonical },
    openGraph: {
      title: opts.title,
      description: opts.description,
      url: canonical,
      siteName: info.companyName,
      locale: "en_US",
      type: opts.type ?? "website",
      ...(images.length > 0 ? { images } : {}),
    },
    twitter: {
      card: images.length > 0 ? "summary_large_image" : "summary",
      title: opts.title,
      description: opts.description,
      ...(images.length > 0 ? { images } : {}),
    },
  };

  if (opts.noindex) {
    metadata.robots = { index: false, follow: false };
  }

  return metadata;
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
