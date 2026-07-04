import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";
import dynamic from "next/dynamic";

const SimpleDashboard = dynamic(
  () => import("@/components/Admin/Dashboard/SimpleDashboard"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <SimpleDashboard />;
}

