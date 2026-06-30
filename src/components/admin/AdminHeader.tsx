"use client";

import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/services": "Services",
  "/admin/projects": "Projects",
  "/admin/plans": "Plans",
  "/admin/team": "Team",
  "/admin/blogs": "Blogs",
  "/admin/contact": "Contact",
  "/admin/settings": "Settings",
  "/admin/analytics": "Analytics",
};

export function AdminHeader() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Page Not Found";

  return (
    <header className="admin-header min-h-15">
      <div className="admin-header-left">
        <button className="admin-header-menu-btn" aria-label="Toggle menu">
          <Menu size={20} />
        </button>
        <div>
          <h1 className="admin-header-title">{title}</h1>
          <p className="admin-header-breadcrumb">Home / {title}</p>
        </div>
      </div>

      <div className="admin-header-right">
        <div className="admin-header-avatar">
          <span>A</span>
        </div>
      </div>
    </header>
  );
}

