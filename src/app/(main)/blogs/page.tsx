import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { getSiteInfo, pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const BlogsPage = dynamic(() => import("@/components/Blogs/BlogsPage"), {
  loading: () => <MainSitePageLoading />,
});

export async function generateMetadata(): Promise<Metadata> {
  const info = await getSiteInfo();
  return pageMetadata(
    {
      title: "Blog",
      description: `Explore solar energy insights, installation guides, and industry news from ${info.companyName}.`,
      path: "/blogs",
    },
    info,
  );
}

export default function Page() {
  return (
    <div>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", href: "/" },
          { name: "Blog", href: "/blogs" },
        ]}
      />
      <BlogsPage />
    </div>
  );
}

