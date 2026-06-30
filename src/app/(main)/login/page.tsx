import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import dynamic from "next/dynamic";

const LoginPage = dynamic(() => import("@/components/Login/LoginPage"), {
  loading: () => <MainSitePageLoading />,
});

export default function Page() {
  return (
    <div>
      <LoginPage />
    </div>
  );
}

