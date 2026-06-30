import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";

const AdminTeamPage = dynamic(
  () => import("@/components/Admin/Team/AdminTeamPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminTeamPage />;
}
