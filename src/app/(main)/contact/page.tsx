import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { BreadcrumbJsonLd } from "@/components/SEO/JsonLd";
import { getSiteInfo, pageMetadata } from "@/lib/site";
import type { Metadata } from "next";
import dynamic from "next/dynamic";

const ContactsPage = dynamic(
  () => import("@/components/Contact/ContactsPage"),
  {
    loading: () => <MainSitePageLoading />,
  },
);

export async function generateMetadata(): Promise<Metadata> {
  const info = await getSiteInfo();
  return pageMetadata(
    {
      title: "Contact Us",
      description: `Get in touch with ${info.companyName} for solar panel installation, battery storage, and maintenance. Request a free consultation today.`,
      path: "/contact",
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
          { name: "Contact Us", href: "/contact" },
        ]}
      />
      <ContactsPage />
    </div>
  );
}

