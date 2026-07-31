import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { getSiteInfo } from "@/lib/site";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

const LoginPage = dynamic(() => import("@/components/Login/LoginPage"), {
  loading: () => <MainSitePageLoading />,
});

export async function generateMetadata(): Promise<Metadata> {
  const { companyName } = await getSiteInfo();
  return {
    title: "Login",
    description: `Sign in to the ${companyName} admin panel.`,
  };
}

export default function Page() {
  return (
    <div>
      <LoginPage />
    </div>
  );
}

