import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";

const AdminReviewsPage = dynamic(
  () => import("@/components/Admin/Reviews/AdminReviewsPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminReviewsPage />;
}
