import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { getSiteInfo, pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ServicesPage = dynamic(
  () => import("@/components/Services/ServicesPage"),
  {
    loading: () => <MainSitePageLoading />,
  },
);

export async function generateMetadata(): Promise<Metadata> {
  const info = await getSiteInfo();
  return pageMetadata(
    {
      title: "Services",
      description: `Discover ${info.companyName}'s solar energy services including battery storage, residential and commercial solar installation, and maintenance.`,
      path: "/services",
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
          { name: "Services", href: "/services" },
        ]}
      />
      <ServicesPage />
    </div>
  );
}

