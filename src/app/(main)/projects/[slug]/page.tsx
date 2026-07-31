import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { db } from "@/lib/db";
import { projects } from "@/lib/schema";
import { pageMetadata, slugToTitle, stripHtml, truncateText } from "@/lib/site";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const SingleProjectPage = dynamic(
  () => import("@/components/Projects/SingleProjectPage"),
  { loading: () => <MainSitePageLoading /> },
);

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fallbackTitle = slugToTitle(slug);
  try {
    const [project] = await db
      .select()
      .from(projects)
      .where(eq(projects.slug, slug))
      .limit(1);
    if (!project) return { title: fallbackTitle };
    const description = stripHtml(project.projectDetails || "");
    return pageMetadata({
      title: project.title,
      description: truncateText(
        description ||
          `${project.category} solar project for ${project.client} in ${project.location}.`,
      ),
      path: `/projects/${project.slug}`,
      images: [project.imageUrl],
    });
  } catch {
    return { title: fallbackTitle };
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const title = slugToTitle(slug);

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Projects", href: "/projects" },
          { name: title, href: `/projects/${slug}` },
        ]}
      />
      <SingleProjectPage slug={slug} title={title} />
    </div>
  );
}

