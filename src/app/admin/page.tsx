import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";
import { getSiteInfo } from "@/lib/site";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

const SimpleDashboard = dynamic(
  () => import("@/components/Admin/Dashboard/SimpleDashboard"),
  { loading: () => <AdminPageLoading /> },
);

export async function generateMetadata(): Promise<Metadata> {
  const { companyName } = await getSiteInfo();
  return {
    title: { absolute: `${companyName} Admin` },
    description: `Dashboard overview for the ${companyName} admin panel.`,
  };
}

export default function Page() {
  return <SimpleDashboard />;
}

