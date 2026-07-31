import dynamic from "next/dynamic";
import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { getSiteInfo } from "@/lib/site";
import type { Metadata } from "next";

const ContactsPage = dynamic(() => import("@/components/Contact/ContactsPage"), {
  loading: () => <MainSitePageLoading />,
});

export async function generateMetadata(): Promise<Metadata> {
  const { companyName } = await getSiteInfo();
  return {
    title: "Contact Us",
    description: `Get in touch with ${companyName} for solar panel installation, battery storage, and maintenance. Request a free consultation today.`,
  };
}

export default function Page() {
  return (
    <div>
      <ContactsPage />
    </div>
  );
}
