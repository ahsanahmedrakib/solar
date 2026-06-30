import dynamic from "next/dynamic";
import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";

const ServicesPage = dynamic(() => import("@/components/Services/ServicesPage"), {
  loading: () => <MainSitePageLoading />,
});

export default function Page() {
  return (
    <div>
      <ServicesPage />
    </div>
  );
}
