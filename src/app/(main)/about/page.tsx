import dynamic from "next/dynamic";
import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { getSiteInfo } from "@/lib/site";
import type { Metadata } from "next";

const AboutPage = dynamic(() => import("@/components/About/AboutPage"), {
  loading: () => <MainSitePageLoading />,
});

export async function generateMetadata(): Promise<Metadata> {
  const { companyName, tagline } = await getSiteInfo();
  return {
    title: "About Us",
    description: `Learn about ${companyName} - ${tagline}. Discover our mission, team, and commitment to clean and reliable solar energy solutions.`,
  };
}

export default function Page() {
  return (
    <div>
      <AboutPage />
    </div>
  );
}
