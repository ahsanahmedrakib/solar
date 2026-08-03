import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Palash Partner Applications",
  description:
    "Review and manage dealership & partner applications from the Palash Charging Station page.",
};

const AdminPalashApplicationsPage = dynamic(
  () =>
    import(
      "@/components/Admin/PalashApplications/AdminPalashApplicationsPage"
    ),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminPalashApplicationsPage />;
}
