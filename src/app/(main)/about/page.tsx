import dynamic from "next/dynamic";
import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";

const AboutPage = dynamic(() => import("@/components/About/AboutPage"), {
  loading: () => <MainSitePageLoading />,
});

export default function Page() {
  return (
    <div>
      <AboutPage />
    </div>
  );
}
