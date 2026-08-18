import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import JsonLd, { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { DEFAULT_BLOGS } from "@/data/blogs";
import { SITE_URL } from "@/lib/config";
import { readDataFile } from "@/lib/fileStore";
import {
  absoluteUrl,
  getSiteInfo,
  pageMetadata,
  slugToTitle,
  stripHtml,
  truncateText,
} from "@/lib/site";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const SingleBlogPageContent = dynamic(
  () => import("@/components/Blogs/SingleBlogPageContent"),
  { loading: () => <MainSitePageLoading /> },
);

interface Props {
  params: Promise<{ slug: string }>;
}

function getBlogBySlug(slug: string) {
  return readDataFile("blogsData", DEFAULT_BLOGS).find((b) => b.slug === slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const fallbackTitle = slugToTitle(slug);
  try {
    const blog = getBlogBySlug(slug);
    if (!blog) return { title: fallbackTitle };
    return pageMetadata({
      title: blog.title,
      description: truncateText(
        stripHtml(blog.content || blog.blogDetails || ""),
      ),
      path: `/blogs/${blog.slug}`,
      images: [blog.imageUrl],
      type: "article",
    });
  } catch {
    return { title: fallbackTitle };
  }
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const title = slugToTitle(slug);

  let articleJsonLd: object | null = null;
  try {
    const blog = getBlogBySlug(slug);
    if (blog) {
      const info = await getSiteInfo();
      articleJsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: blog.title,
        description: truncateText(stripHtml(blog.content || "")),
        image: [absoluteUrl(blog.imageUrl)],
        datePublished: blog.date,
        dateModified: blog.date,
        author: {
          "@type": "Organization",
          name: info.companyName,
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: info.companyName,
          logo: { "@type": "ImageObject", url: absoluteUrl(info.logo) },
        },
        mainEntityOfPage: absoluteUrl(`/blogs/${blog.slug}`),
        articleSection: blog.category,
        keywords: blog.tags?.join(", "),
      };
    }
  } catch {
    articleJsonLd = null;
  }

  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blogs" },
          { name: title, href: `/blogs/${slug}` },
        ]}
      />
      {articleJsonLd ? <JsonLd data={articleJsonLd} /> : null}
      <SingleBlogPageContent slug={slug} title={title} />
    </div>
  );
}

