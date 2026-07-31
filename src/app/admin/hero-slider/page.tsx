import dynamic from "next/dynamic";
import { AdminPageLoading } from "@/components/Admin/AdminPageLoading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hero Slider",
  description: "Manage the homepage hero slider slides and content.",
};

const AdminHeroPage = dynamic(
  () => import("@/components/Admin/Hero/AdminHeroPage"),
  { loading: () => <AdminPageLoading /> },
);

export default function Page() {
  return <AdminHeroPage />;
}
