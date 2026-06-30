import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";

const AdminServicesPage = dynamic(
  () => import("@/components/Admin/Services/AdminServicesPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminServicesPage />;
}
