import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team",
  description: "Manage team members shown on the solar company website.",
};

const AdminTeamPage = dynamic(
  () => import("@/components/Admin/Team/AdminTeamPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminTeamPage />;
}
