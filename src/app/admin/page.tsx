import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";

const AdminDashboardPage = dynamic(
  () => import("@/components/Admin/Dashboard/AdminDashboardPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminDashboardPage />;
}
