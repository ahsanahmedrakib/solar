import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Manage the solar services displayed on the website.",
};

const AdminServicesPage = dynamic(
  () => import("@/components/Admin/Services/AdminServicesPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminServicesPage />;
}
