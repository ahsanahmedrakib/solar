import dynamic from "next/dynamic";
import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";

const ProjectsPage = dynamic(() => import("@/components/Projects/ProjectsPage"), {
  loading: () => <MainSitePageLoading />,
});

export default function Page() {
  return (
    <div>
      <ProjectsPage />
    </div>
  );
}
