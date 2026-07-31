import { AdminShell } from "@/components/Admin/AdminShell";
import { AdminGuard } from "@/components/Auth/AdminGuard";
import { getSiteInfo } from "@/lib/site";
import type { Metadata } from "next";
import "./admin.css";

export async function generateMetadata(): Promise<Metadata> {
  const { companyName } = await getSiteInfo();
  return {
    title: {
      default: `${companyName} Admin`,
      template: `%s | ${companyName} Admin`,
    },
    description: `${companyName} Admin Panel`,
    robots: { index: false, follow: false },
  };
}

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

