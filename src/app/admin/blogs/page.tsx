import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";

const AdminBlogsPage = dynamic(
  () => import("@/components/Admin/Blogs/AdminBlogsPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminBlogsPage />;
}
