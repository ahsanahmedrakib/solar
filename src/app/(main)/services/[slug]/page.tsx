import dynamic from "next/dynamic";
import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { db } from "@/lib/db";
import { services } from "@/lib/schema";
import { slugToTitle, truncateText } from "@/lib/site";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

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
    return {
      title: service.title,
      description: truncateText(service.description || service.title),
    };
  } catch {
    return { title: fallbackTitle };
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const title = slugToTitle(slug);
  return (
    <div>
      <SingleServicePage slug={slug} title={title} />
    </div>
  );
}
