import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { getSiteInfo, pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ProjectsPage = dynamic(
  () => import("@/components/Projects/ProjectsPage"),
  {
    loading: () => <MainSitePageLoading />,
  },
);

export async function generateMetadata(): Promise<Metadata> {
  const info = await getSiteInfo();
  return pageMetadata(
    {
      title: "Projects",
      description: `Browse ${info.companyName}'s completed solar projects for residential, commercial, community, and industrial clients.`,
      path: "/projects",
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
          { name: "Projects", href: "/projects" },
        ]}
      />
      <ProjectsPage />
    </div>
  );
}

