import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";

const AdminUsersPage = dynamic(
  () => import("@/components/Admin/Users/AdminUsersPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminUsersPage />;
}
