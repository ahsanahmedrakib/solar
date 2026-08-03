import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { getSiteInfo, pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ComparisonPage = dynamic(
  () => import("@/components/Solutions/ComparisonPage"),
  {
    loading: () => <MainSitePageLoading />,
  },
);

export async function generateMetadata(): Promise<Metadata> {
  const info = await getSiteInfo();
  return pageMetadata(
    {
      title: "CapEx vs OpEx Comparison",
      description: `Compare ${info.companyName}'s CapEx and OpEx solar models side by side to choose the right financial structure for your rooftop solar project.`,
      path: "/solutions/comparison",
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
          { name: "Model Comparison", href: "/solutions/comparison" },
        ]}
      />
      <ComparisonPage />
    </div>
  );
}
