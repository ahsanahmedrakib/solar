import { AdminShell } from "@/components/Admin/AdminShell";
import { AdminGuard } from "@/components/Auth/AdminGuard";
import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: "Admin Dashboard - Ahead Solar",
  description: "Ahead Solar Admin Panel",
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

