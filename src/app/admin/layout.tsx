import { AdminGuard } from "@/components/Auth/AdminGuard";
import { AdminShell } from "@/components/Admin/AdminShell";
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
      <AdminGuard>
        <AdminShell>{children}</AdminShell>
      </AdminGuard>
    </div>
  );
}
