"use client";

import { useSidebar } from "@/components/Admin/SidebarContext";
import { useAuth } from "@/components/Auth/AuthProvider";
import { LogOut, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

const pageTitles: Record<string, string> = {
  "/admin": "Dashboard",
  "/admin/services": "Services",
  "/admin/projects": "Projects",
  "/admin/team": "Team",
  "/admin/blogs": "Blogs",
  "/admin/contact": "Contact",
  "/admin/settings": "Settings",
  "/admin/users": "Users",
  "/admin/analytics": "Analytics",
};

export function AdminHeader() {
  const { user, logout } = useAuth();
  const { toggle } = useSidebar();
  const pathname = usePathname();
  const title = pageTitles[pathname] ?? "Page Not Found";

  return (
    <header className="admin-header min-h-15">
      <div className="admin-header-left">
        <button
          className="admin-header-menu-btn"
          aria-label="Toggle menu"
          onClick={toggle}
        >
          <Menu size={20} />
        </button>
        <div>
          <h1 className="admin-header-title">{title}</h1>
          <p className="admin-header-breadcrumb">Home / {title}</p>
        </div>
      </div>

      <div className="admin-header-right">
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-(--admin-text-primary)">
              {user?.name}
            </p>
            <p className="text-[10px] text-(--admin-text-muted) capitalize">
              {user?.role === "superadmin" ? "Super Admin" : "Admin"}
            </p>
          </div>
          <div className="admin-header-avatar">
            <span>{user?.name?.charAt(0) || "A"}</span>
          </div>
          <button
            onClick={logout}
            className="text-(--admin-text-muted) hover:text-(--admin-danger) transition p-1.5 cursor-pointer"
            title="Logout"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}

