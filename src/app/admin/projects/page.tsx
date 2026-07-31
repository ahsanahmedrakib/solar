import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Manage the solar projects showcased on the website.",
};

const AdminProjectsPage = dynamic(
  () => import("@/components/Admin/Projects/AdminProjectsPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminProjectsPage />;
}
