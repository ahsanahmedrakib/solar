import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";

const AdminCommentsPage = dynamic(
  () => import("@/components/Admin/Comments/AdminCommentsPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminCommentsPage />;
}
