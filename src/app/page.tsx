import dynamic from "next/dynamic";
import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";

const HomePage = dynamic(() => import("@/components/Home/HomePage"), {
  loading: () => <MainSitePageLoading />,
});

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
