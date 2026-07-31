import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users",
  description: "Manage admin users, roles, and access for the solar website.",
};

const AdminUsersPage = dynamic(
  () => import("@/components/Admin/Users/AdminUsersPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminUsersPage />;
}
