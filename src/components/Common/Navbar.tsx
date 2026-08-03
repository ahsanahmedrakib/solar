"use client";

import { DEFAULT_SECTIONS } from "@/data/settings";
import { SOCIAL_ICONS } from "@/lib/const";
import { useQuerySettings } from "@/lib/queries";
import { ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function getField(
  sections: { id: string; fields?: { id: string; value: string }[] }[],
  sectionId: string,
  fieldId: string,
): string {
  return (
    sections
      .find((s) => s.id === sectionId)
      ?.fields?.find((f) => f.id === fieldId)?.value ?? ""
  );
}

const FALLBACK = {
  phone: getField(DEFAULT_SECTIONS, "general", "phone-number"),
  email: getField(DEFAULT_SECTIONS, "general", "contact-email"),
  socialFb: getField(DEFAULT_SECTIONS, "social", "social-fb"),
  socialX: getField(DEFAULT_SECTIONS, "social", "social-x"),
  socialLi: getField(DEFAULT_SECTIONS, "social", "social-li"),
  socialIg: getField(DEFAULT_SECTIONS, "social", "social-ig"),
  logo: getField(DEFAULT_SECTIONS, "general", "site-logo") || "/logo.svg",
};

interface NavItem {
  label: string;
  href?: string;
  children?: { label: string; href: string }[];
}

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  {
    label: "Solution",
    children: [
      { label: "CAPEX", href: "/solutions/capex" },
      { label: "OPEX", href: "/solutions/opex" },
      { label: "Comparison", href: "/solutions/comparison" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  const { data, isFetching, isLoading } = useQuerySettings();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const resolved = useMemo(() => {
    if (!data) return FALLBACK;
    return {
      phone: getField(data, "general", "phone-number") || FALLBACK.phone,
      email: getField(data, "general", "contact-email") || FALLBACK.email,
      socialFb: getField(data, "social", "social-fb"),
      socialX: getField(data, "social", "social-x"),
      socialLi: getField(data, "social", "social-li"),
      socialIg: getField(data, "social", "social-ig"),
      logo: getField(data, "general", "site-logo") || FALLBACK.logo,
    };
  }, [data]);

  const logoSrc = resolved.logo;
  const settings = resolved;
  const showSkeleton = isLoading || isFetching;

  const isPathActive = (href: string) => {
    if (!pathname) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  const isActive = (item: NavItem) => {
    if (item.href && isPathActive(item.href)) return true;
    return item.children?.some((child) => isPathActive(child.href)) ?? false;
  };

  return (
    <>
      {/* 1. TOPBAR */}
      <div className="bg-forest-700 text-white/90 text-sm">
        <div className="solar-container flex justify-between items-center py-3">
          <div className="flex items-center flex-wrap gap-2 sm:gap-4">
            {showSkeleton ? (
              <>
                <div className="flex items-center gap-2 animate-pulse">
                  <div className="w-4 h-4 rounded bg-white/20" />
                  <div className="h-4 w-44 rounded bg-white/20" />
                </div>
                <div className="flex items-center gap-2 animate-pulse">
                  <div className="w-4 h-4 rounded bg-white/20" />
                  <div className="h-4 w-40 rounded bg-white/20" />
                </div>
              </>
            ) : (
              <>
                <a
                  href={`mailto:${settings.email}`}
                  className="inline-flex items-center gap-2 hover:text-gold-400 transition-colors"
                >
                  <Mail size={14} className="text-gold-500" />
                  <span>{settings.email}</span>
                </a>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center gap-2 hover:text-gold-400 transition-colors"
                >
                  <Phone size={14} className="text-gold-500" />
                  <span>{settings.phone}</span>
                </a>
              </>
            )}
          </div>

          <div className="flex items-center gap-2">
            {showSkeleton
              ? [1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-lg bg-white/20 animate-pulse"
                  />
                ))
              : (
                  [
                    {
                      key: "socialFb",
                      label: "facebook" as const,
                      href: settings.socialFb,
                    },
                    {
                      key: "socialX",
                      label: "x" as const,
                      href: settings.socialX,
                    },
                    {
                      key: "socialIg",
                      label: "instagram" as const,
                      href: settings.socialIg,
                    },
                    {
                      key: "socialLi",
                      label: "linkedin" as const,
                      href: settings.socialLi,
                    },
                  ] as const
                ).map(
                  (platform) =>
                    platform.href && (
                      <Link
                        key={platform.key}
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-lg text-accent-500 flex items-center justify-center transition-all hover:bg-forest-700"
                        aria-label={platform.label}
                      >
                        {SOCIAL_ICONS[platform.label]}
                      </Link>
                    ),
                )}
          </div>
        </div>
      </div>

      {/* 2. STICKY NAVBAR */}
      <header className="sticky top-0 z-50 transition-all duration-300">
        <div className="solar-container">
          <div
            className={`flex bg-white items-center justify-between gap-2 sm:gap-6 px-2 transition-all duration-300 ${
              !scrolled
                ? "py-2 my-3 rounded-lg shadow-md shadow-forest-900/5"
                : "py-2 rounded-lg border-b border-forest-700/10 mt-2 shadow-lg shadow-forest-900/10"
            }`}
          >
            {/* LOGO */}
            <Link href="/" className="shrink-0 flex items-center">
              {showSkeleton ? (
                <div className="h-11 w-40 rounded-full bg-gray-200 animate-pulse" />
              ) : (
                <Image
                  src={logoSrc}
                  width={160}
                  height={46}
                  alt="Ahead Solar logo"
                  className="h-7.5 sm:h-11 w-auto object-contain"
                />
              )}
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center gap-1 font-medium">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="relative group">
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        className={`nav-link-sweep py-2 px-3 rounded-full transition-colors inline-flex items-center gap-1 cursor-pointer ${
                          isActive(item)
                            ? "text-accent-500 nav-link-active"
                            : "text-accent-500 hover:text-gold-500"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          className="transition-transform duration-300 group-hover:rotate-180"
                        />
                      </button>

                      {/* Dropdown Panel */}
                      <div className="absolute left-0 top-full pt-2 opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300">
                        <div className="bg-white rounded-xl shadow-xl shadow-forest-900/10 border border-gray-100 py-2 min-w-48 overflow-hidden">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block px-4 py-2.5 text-sm transition-colors ${
                                isPathActive(child.href)
                                  ? "text-gold-500 bg-secondary"
                                  : "text-accent-500 hover:text-gold-500 hover:bg-secondary"
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href!}
                      className={`nav-link-sweep py-2 px-3 rounded-full transition-colors ${
                        isActive(item)
                          ? "text-accent-500 nav-link-active"
                          : "text-accent-500 hover:text-gold-500"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex gap-2">
              <Link
                href="/palash-charging-station"
                target="_blank"
                className="border-2 rounded-lg border-accent-500 mr-0 lg:mr-2.25"
              >
                <Image
                  src="/images/palash/logo-palash.png"
                  alt="palash"
                  height={40}
                  width={70}
                  className="p-2"
                />
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-accent-500 p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>

          {/* 3. MOBILE MENU */}
          {isMobileMenuOpen && (
            <div className="lg:hidden absolute left-0 right-0 top-full bg-secondary shadow-xl z-40 border-t border-forest-700/10 max-h-[calc(100dvh-64px)] overflow-y-auto overscroll-contain">
              <div className="solar-container">
                <nav className="flex flex-col py-4 font-medium text-accent-500">
                  {NAV_ITEMS.map((item) => (
                    <div key={item.label}>
                      {item.children ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              setOpenSubmenu(
                                openSubmenu === item.label ? null : item.label,
                              )
                            }
                            className={`w-full flex items-center justify-between py-3 border-b border-gray-100 cursor-pointer ${
                              isActive(item)
                                ? "text-gold-500"
                                : "hover:text-gold-500"
                            }`}
                          >
                            {item.label}
                            <ChevronDown
                              size={16}
                              className={`transition-transform duration-300 ${
                                openSubmenu === item.label ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          <div
                            className={`grid transition-all duration-300 ease-in-out ${
                              openSubmenu === item.label
                                ? "grid-rows-[1fr] opacity-100"
                                : "grid-rows-[0fr] opacity-0"
                            }`}
                          >
                            <div className="overflow-hidden">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  onClick={() => setIsMobileMenuOpen(false)}
                                  className={`block pl-6 py-3 border-b border-gray-100 text-sm ${
                                    isPathActive(child.href)
                                      ? "text-gold-500"
                                      : "hover:text-gold-500"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </div>
                        </>
                      ) : (
                        <Link
                          href={item.href!}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className={`py-3 border-b border-gray-100 block ${
                            isActive(item)
                              ? "text-gold-500"
                              : "hover:text-gold-500"
                          }`}
                        >
                          {item.label}
                        </Link>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

