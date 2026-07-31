import { MainSitePageLoading } from "@/components/Common/MainSitePageLoading";
import { getSiteInfo, pageMetadata } from "@/lib/site";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

const LoginPage = dynamic(() => import("@/components/Login/LoginPage"), {
  loading: () => <MainSitePageLoading />,
});

export async function generateMetadata(): Promise<Metadata> {
  const info = await getSiteInfo();
  return pageMetadata(
    {
      title: "Login",
      description: `Sign in to the ${info.companyName} admin panel.`,
      path: "/login",
      noindex: true,
    },
    info,
  );
}

export default function Page() {
  return (
    <div>
      <LoginPage />
    </div>
  );
}
