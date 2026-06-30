import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";

const AdminAnalyticsPage = dynamic(
  () => import("@/components/Admin/Analytics/AdminAnalyticsPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminAnalyticsPage />;
}
