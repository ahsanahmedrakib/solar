import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { getSiteInfo, pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const AboutPage = dynamic(() => import("@/components/About/AboutPage"), {
  loading: () => <MainSitePageLoading />,
});

export async function generateMetadata(): Promise<Metadata> {
  const info = await getSiteInfo();
  return pageMetadata(
    {
      title: "About Us",
      description: `Learn about ${info.companyName} - ${info.tagline}. Discover our mission, team, and commitment to clean and reliable solar energy solutions.`,
      path: "/about",
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
          { name: "About Us", href: "/about" },
        ]}
      />
      <AboutPage />
    </div>
  );
}

