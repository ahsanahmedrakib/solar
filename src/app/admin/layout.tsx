import { AdminHeader } from "@/components/Admin/AdminHeader";
import { AdminSidebar } from "@/components/Admin/AdminSidebar";
import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin Dashboard - Sunex Solar",
  description: "Sunex Solar Admin Panel",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout-root">
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-main">
          <AdminHeader />
          <main className="admin-page">{children}</main>
        </div>
      </div>
    </div>
  );
}

