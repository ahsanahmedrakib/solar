import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";

const AdminContactQueriesPage = dynamic(
  () => import("@/components/Admin/Contact/AdminContactPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminContactQueriesPage />;
}
