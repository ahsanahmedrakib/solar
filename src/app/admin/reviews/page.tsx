import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews",
  description: "Manage customer testimonials shown on the website.",
};

const AdminReviewsPage = dynamic(
  () => import("@/components/Admin/Reviews/AdminReviewsPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminReviewsPage />;
}
