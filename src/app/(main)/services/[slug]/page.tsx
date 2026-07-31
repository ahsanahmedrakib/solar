import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import JsonLd, { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { SITE_URL } from "@/lib/config";
import { db } from "@/lib/db";
import { services } from "@/lib/schema";
import {
  absoluteUrl,
  getSiteInfo,
  pageMetadata,
  slugToTitle,
  stripHtml,
  truncateText,
} from "@/lib/site";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const SingleServicePage = dynamic(
  () => import("@/components/Services/SingleServicePage"),
  { loading: () => <MainSitePageLoading /> },
);

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fallbackTitle = slugToTitle(slug);
  try {
    const [service] = await db
      .select()
      .from(services)
      .where(eq(services.slug, slug))
      .limit(1);
    if (!service) return { title: fallbackTitle };
    return pageMetadata({
      title: service.title,
      description: truncateText(service.description || service.title),
      path: `/services/${service.slug}`,
      images: [service.image],
    });
  } catch {
    return { title: fallbackTitle };
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const title = slugToTitle(slug);

  let serviceJsonLd: object | null = null;
  try {
    const [service] = await db
      .select()
      .from(services)
      .where(eq(services.slug, slug))
      .limit(1);
    if (service) {
      const info = await getSiteInfo();
      serviceJsonLd = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.title,
        description: truncateText(
          stripHtml(service.serviceDetails || service.description || ""),
        ),
        url: absoluteUrl(`/services/${service.slug}`),
        image: absoluteUrl(service.image),
        serviceType: service.title,
        provider: {
          "@type": "Organization",
          name: info.companyName,
          url: SITE_URL,
        },
        areaServed: "BD",
      };
    }
  } catch {
    serviceJsonLd = null;
  }

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: title, href: `/services/${slug}` },
        ]}
      />
      {serviceJsonLd ? <JsonLd data={serviceJsonLd} /> : null}
      <SingleServicePage slug={slug} title={title} />
    </div>
  );
}

