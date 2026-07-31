import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
  description: "View analytics for the solar company website.",
};

const AdminAnalyticsPage = dynamic(
  () => import("@/components/Admin/Analytics/AdminAnalyticsPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminAnalyticsPage />;
}
