"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Menu, Search } from "lucide-react";
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
};

export function AdminHeader() {
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Admin Panel";

  return (
    <header className="admin-header min-h-10">
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
        <div className="admin-search-wrapper">
          <Search size={16} className="admin-search-icon" />
          <Input
            id="admin-global-search"
            placeholder="Search anything..."
            className="admin-search-input"
          />
        </div>

        <Button
          id="admin-notification-btn"
          variant="ghost"
          size="icon"
          className="admin-header-icon-btn"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="admin-notif-badge">3</span>
        </Button>

        <div className="admin-header-avatar">
          <span>A</span>
        </div>
      </div>
    </header>
  );
}

