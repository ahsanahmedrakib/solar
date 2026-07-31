import dynamic from "next/dynamic";
import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { db } from "@/lib/db";
import { blogs } from "@/lib/schema";
import { slugToTitle, stripHtml, truncateText } from "@/lib/site";
import { eq } from "drizzle-orm";
import type { Metadata } from "next";

const SingleBlogPageContent = dynamic(
  () => import("@/components/Blogs/SingleBlogPageContent"),
  { loading: () => <MainSitePageLoading /> },
);

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fallbackTitle = slugToTitle(slug);
  try {
    const [blog] = await db
      .select()
      .from(blogs)
      .where(eq(blogs.slug, slug))
      .limit(1);
    if (!blog) return { title: fallbackTitle };
    return {
      title: blog.title,
      description: truncateText(stripHtml(blog.content || blog.blogDetails || "")),
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
      <SingleBlogPageContent slug={slug} title={title} />
    </div>
  );
}
