"use client";

import { useAuth } from "@/components/Auth/AuthProvider";
import { DEFAULT_SECTIONS } from "@/data/settings";
import { useQuerySettings } from "@/lib/queries";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  ChevronRight,
  FileText,
  ImageIcon,
  Layers,
  LayoutDashboard,
  Lock,
  LogOut,
  Mail,
  MessageSquareText,
  Settings,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useSidebar } from "./SidebarContext";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Services",
    href: "/admin/services",
    icon: Briefcase,
  },
  {
    title: "Projects",
    href: "/admin/projects",
    icon: Layers,
  },
  {
    title: "Team",
    href: "/admin/team",
    icon: Users,
  },
  {
    title: "Blogs",
    href: "/admin/blogs",
    icon: FileText,
  },
  {
    title: "Hero Slider",
    href: "/admin/hero-slider",
    icon: ImageIcon,
  },
  {
    title: "Contact Queries",
    href: "/admin/contact",
    icon: Mail,
  },
  {
    title: "Reviews",
    href: "/admin/reviews",
    icon: MessageSquareText,
  },
  {
    title: "Users",
    href: "/admin/users",
    icon: Lock,
  },
];

const bottomNavItems = [
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

const FALLBACK_LOGO =
  DEFAULT_SECTIONS.find((s) => s.id === "general")?.fields?.find(
    (f) => f.id === "admin-logo",
  )?.value ?? "/logo.svg";

export function AdminSidebar() {
  const { user, logout } = useAuth();
  const { mobileOpen, setMobileOpen } = useSidebar();
  const pathname = usePathname();
  const { data } = useQuerySettings();

  const logoSrc = useMemo(() => {
    if (data) {
      const general = data.find((section) => section.id === "general");
      const logoField = general?.fields?.find(
        (field) => field.id === "site-logo",
      );
      if (logoField?.value) return logoField.value;
    }
    return FALLBACK_LOGO;
  }, [data]);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={closeMobile}
        />
      )}

      <aside
        className="admin-sidebar"
        style={mobileOpen ? { transform: "translateX(0)" } : undefined}
      >
        {/* Mobile close button */}
        <button
          onClick={closeMobile}
          className="absolute top-4 right-4 text-(--admin-text-muted) hover:text-(--admin-text-primary) transition md:hidden cursor-pointer"
          aria-label="Close menu"
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="flex items-center justify-center py-2">
          <Link href="/" onClick={closeMobile}>
            <Image
              src={logoSrc}
              width={160}
              height={50}
              alt="Admin logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <p className="sidebar-section-label">Main Menu</p>
            <ul className="sidebar-nav-list">
              {navItems?.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      className={cn("sidebar-nav-item", active && "active")}
                    >
                      <Icon size={18} className="sidebar-nav-icon" />
                      <span className="sidebar-nav-label">{item.title}</span>
                      {active && (
                        <ChevronRight size={14} className="sidebar-nav-arrow" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="sidebar-section">
            <p className="sidebar-section-label">Support</p>
            <ul className="sidebar-nav-list">
              {bottomNavItems?.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={closeMobile}
                      className={cn("sidebar-nav-item", active && "active")}
                    >
                      <Icon size={18} className="sidebar-nav-icon" />
                      <span className="sidebar-nav-label">{item.title}</span>
                      {active && (
                        <ChevronRight size={14} className="sidebar-nav-arrow" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* User Profile */}
        <div className="sidebar-user flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="sidebar-user-avatar">
              <span>{user?.name?.charAt(0) || "A"}</span>
            </div>
            <div className="sidebar-user-info">
              <p className="sidebar-user-name">{user?.name || "Admin"}</p>
              <p className="sidebar-user-role">
                {user?.role === "superadmin" ? "Super Admin" : "Admin"}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              logout();
              closeMobile();
            }}
            className="text-(--admin-text-muted) hover:text-(--admin-danger) transition cursor-pointer"
            title="Logout"
          >
            <LogOut className="text-red-500" />
          </button>
        </div>
      </aside>
    </>
  );
}

