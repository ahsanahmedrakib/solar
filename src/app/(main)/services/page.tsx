import dynamic from "next/dynamic";
import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { getSiteInfo } from "@/lib/site";
import type { Metadata } from "next";

const ServicesPage = dynamic(() => import("@/components/Services/ServicesPage"), {
  loading: () => <MainSitePageLoading />,
});

export async function generateMetadata(): Promise<Metadata> {
  const { companyName } = await getSiteInfo();
  return {
    title: "Services",
    description: `Discover ${companyName}'s solar energy services including battery storage, residential and commercial solar installation, and maintenance.`,
  };
}

export default function Page() {
  return (
    <div>
      <ServicesPage />
    </div>
  );
}
