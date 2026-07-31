import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description: "Update company identity, SEO metadata, and social links.",
};

const AdminSettingsPage = dynamic(
  () => import("@/components/Admin/Settings/AdminSettingsPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminSettingsPage />;
}
