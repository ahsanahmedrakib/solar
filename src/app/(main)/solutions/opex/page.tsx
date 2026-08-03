import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { getSiteInfo, pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const OpExPage = dynamic(() => import("@/components/Solutions/OpExPage"), {
  loading: () => <MainSitePageLoading />,
});

export async function generateMetadata(): Promise<Metadata> {
  const info = await getSiteInfo();
  return pageMetadata(
    {
      title: "OpEx Model",
      description: `Discover ${info.companyName}'s OpEx solar model - zero upfront investment, no financial risk, annual installments, and guaranteed maintenance for 20 years.`,
      path: "/solutions/opex",
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
          { name: "OpEx Model", href: "/solutions/opex" },
        ]}
      />
      <OpExPage />
    </div>
  );
}
