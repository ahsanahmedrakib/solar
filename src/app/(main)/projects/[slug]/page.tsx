import dynamic from "next/dynamic";
import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { db } from "@/lib/db";
import { projects } from "@/lib/schema";
import { slugToTitle, stripHtml, truncateText } from "@/lib/site";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

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
    return {
      title: project.title,
      description: truncateText(
        description || `${project.category} solar project for ${project.client} in ${project.location}.`,
      ),
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
      <SingleProjectPage slug={slug} title={title} />
    </div>
  );
}
