import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";

const AdminPlansPage = dynamic(
  () => import("@/components/Admin/Plans/AdminPlansPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminPlansPage />;
}
