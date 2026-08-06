import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { getSiteInfo, pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const BOTPage = dynamic(() => import("@/components/Solutions/BOTPage"), {
  loading: () => <MainSitePageLoading />,
});

export async function generateMetadata(): Promise<Metadata> {
  const info = await getSiteInfo();
  return pageMetadata(
    {
      title: "BOT Model",
      description: `Explore ${info.companyName}'s Build-Operate-Transfer (BOT) solar model - complete financing, installation, and operation by the service provider, with ownership transferred to the roof owner at zero additional cost.`,
      path: "/solutions/bot",
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
          { name: "BOT Model", href: "/solutions/bot" },
        ]}
      />
      <BOTPage />
    </div>
  );
}
