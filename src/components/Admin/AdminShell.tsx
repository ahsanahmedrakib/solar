"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { SidebarProvider } from "@/components/Admin/SidebarContext";

const AdminHeader = dynamic(
  () => import("@/components/Admin/AdminHeader").then((m) => ({ default: m.AdminHeader })),
  { ssr: false },
);

const AdminSidebar = dynamic(
  () => import("@/components/Admin/AdminSidebar").then((m) => ({ default: m.AdminSidebar })),
  { ssr: false },
);

export function AdminShell({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="admin-layout">
        <AdminSidebar />
        <div className="admin-main">
          <AdminHeader />
          <main className="admin-page">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
