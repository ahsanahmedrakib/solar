import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { getSiteInfo, pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const CapExPage = dynamic(() => import("@/components/Solutions/CapExPage"), {
  loading: () => <MainSitePageLoading />,
});

export async function generateMetadata(): Promise<Metadata> {
  const info = await getSiteInfo();
  return pageMetadata(
    {
      title: "CapEx Model",
      description: `Explore ${info.companyName}'s CapEx solar model - full ownership of your rooftop solar system, capital investment from your own source, and free electricity after payback.`,
      path: "/solutions/capex",
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
          { name: "CapEx Model", href: "/solutions/capex" },
        ]}
      />
      <CapExPage />
    </div>
  );
}
