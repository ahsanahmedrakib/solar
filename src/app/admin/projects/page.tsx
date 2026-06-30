import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";

const AdminProjectsPage = dynamic(
  () => import("@/components/Admin/Projects/AdminProjectsPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminProjectsPage />;
}
