import dynamic from "next/dynamic";
import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { getSiteInfo } from "@/lib/site";
import type { Metadata } from "next";

const ProjectsPage = dynamic(() => import("@/components/Projects/ProjectsPage"), {
  loading: () => <MainSitePageLoading />,
});

export async function generateMetadata(): Promise<Metadata> {
  const { companyName } = await getSiteInfo();
  return {
    title: "Projects",
    description: `Browse ${companyName}'s completed solar projects for residential, commercial, community, and industrial clients.`,
  };
}

export default function Page() {
  return (
    <div>
      <ProjectsPage />
    </div>
  );
}
