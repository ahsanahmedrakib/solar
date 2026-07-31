import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Queries",
  description: "Review and manage contact form queries from website visitors.",
};

const AdminContactQueriesPage = dynamic(
  () => import("@/components/Admin/Contact/AdminContactPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminContactQueriesPage />;
}
