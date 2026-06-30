"use client";

import { DEFAULT_SECTIONS } from "@/data/settings";
import { cn } from "@/lib/utils";
import {
  Briefcase,
  ChevronRight,
  CreditCard,
  FileText,
  ImageIcon,
  Layers,
  LayoutDashboard,
  Mail,
  Settings,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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
    title: "Plans",
    href: "/admin/plans",
    icon: CreditCard,
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
  )?.value ?? "/logo-white.svg";

export function AdminSidebar() {
  const pathname = usePathname();
  const [logoSrc, setLogoSrc] = useState(FALLBACK_LOGO);

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  useEffect(() => {
    async function loadLogo() {
      try {
        const res = await fetch("/api/settings");
        const json = await res.json();
        if (json.success && json.data) {
          const general = json.data.find(
            (section: { id: string }) => section.id === "general",
          );
          const logoField = general?.fields?.find(
            (field: { id: string; value: string }) => field.id === "site-logo",
          );
          if (logoField?.value) {
            setLogoSrc(logoField.value);
          }
        }
      } catch (error) {
        console.error("Failed to load site logo", error);
      }
    }
    loadLogo();
  }, []);

  return (
    <aside className="admin-sidebar">
      {/* Logo */}
      <div className="flex items-center justify-center py-2">
        <Link href="/">
          <Image
            src={logoSrc}
            width={160}
            height={50}
            alt="Sunex logo"
            className="h-12 w-auto object-contain"
          />
        </Link>
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


