import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs",
  description: "Manage blog posts published on the website.",
};

const AdminBlogsPage = dynamic(
  () => import("@/components/Admin/Blogs/AdminBlogsPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminBlogsPage />;
}
