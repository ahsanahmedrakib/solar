import dynamic from "next/dynamic";
import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";

const ContactsPage = dynamic(() => import("@/components/Contact/ContactsPage"), {
  loading: () => <MainSitePageLoading />,
});

export default function Page() {
  return (
    <div>
      <ContactsPage />
    </div>
  );
}
