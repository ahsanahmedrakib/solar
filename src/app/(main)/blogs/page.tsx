import dynamic from "next/dynamic";
import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { getSiteInfo } from "@/lib/site";
import type { Metadata } from "next";

const BlogsPage = dynamic(() => import("@/components/Blogs/BlogsPage"), {
  loading: () => <MainSitePageLoading />,
});

export async function generateMetadata(): Promise<Metadata> {
  const { companyName } = await getSiteInfo();
  return {
    title: "Blog",
    description: `Explore solar energy insights, installation guides, and industry news from ${companyName}.`,
  };
}

export default function Page() {
  return (
    <div>
      <BlogsPage />
    </div>
  );
}
