import dynamic from "next/dynamic";
import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";

const BlogsPage = dynamic(() => import("@/components/Blogs/BlogsPage"), {
  loading: () => <MainSitePageLoading />,
});

export default function Page() {
  return (
    <div>
      <BlogsPage />
    </div>
  );
}
