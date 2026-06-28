"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  BarChart3,
  Settings,
  Zap,
  ChevronRight,
  Bell,
  HelpCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    title: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

const bottomNavItems = [
  {
    title: "Notifications",
    href: "/admin/notifications",
    icon: Bell,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">
          <Zap size={20} />
        </div>
        <div className="sidebar-logo-text">
          <span className="sidebar-brand">Sunex</span>
          <span className="sidebar-brand-sub">Admin Panel</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section">
          <p className="sidebar-section-label">Main Menu</p>
          <ul className="sidebar-nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
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
            {bottomNavItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
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
      <div className="sidebar-user">
        <div className="sidebar-user-avatar">
          <span>A</span>
        </div>
        <div className="sidebar-user-info">
          <p className="sidebar-user-name">Admin User</p>
          <p className="sidebar-user-role">Super Admin</p>
        </div>
        <Settings size={14} className="sidebar-user-settings" />
      </div>
    </aside>
  );
}
