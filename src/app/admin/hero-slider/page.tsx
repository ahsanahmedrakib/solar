import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";

const AdminHeroPage = dynamic(
  () => import("@/components/Admin/Hero/AdminHeroPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminHeroPage />;
}
