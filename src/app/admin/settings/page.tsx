import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";

const AdminSettingsPage = dynamic(
  () => import("@/components/Admin/Settings/AdminSettingsPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminSettingsPage />;
}
