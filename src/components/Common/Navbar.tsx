"use client";

import { DEFAULT_SECTIONS } from "@/data/settings";
import { SOCIAL_ICONS } from "@/lib/const";
import { useQuerySettings } from "@/lib/queries";
import { ArrowUpRight, ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

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

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobilePagesOpen, setIsMobilePagesOpen] = useState(false);

  const { data, isFetching, isLoading } = useQuerySettings();
  const pathname = usePathname();
  const mainPages = ["Demo 1", "Demo 2"];

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

  const isActive = (href: string) => {
    if (!pathname) return false;
    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <>
      {/* 1. TOP BAR */}
      <div className="bg-[#4CAF50] text-white text-sm py-2 px-6 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            {showSkeleton ? (
              <>
                <div className="flex items-center space-x-2 animate-pulse">
                  <div className="w-3.5 h-3.5 rounded bg-white/20" />
                  <div className="h-4 w-52 rounded bg-white/20" />
                </div>
                <div className="flex items-center space-x-2 animate-pulse">
                  <div className="w-3.5 h-3.5 rounded bg-white/20" />
                  <div className="h-4 w-48 rounded bg-white/20" />
                </div>
              </>
            ) : (
              <>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="hover:underline flex items-center space-x-2"
                >
                  <Phone size={14} />
                  <span>Phone Number: {settings.phone}</span>
                </a>
                <a
                  href={`mailto:${settings.email}`}
                  className="hover:underline flex items-center space-x-2"
                >
                  <Mail size={14} />
                  <span>Email Address: {settings.email}</span>
                </a>
              </>
            )}
          </div>
          <div className="flex items-center gap-1">
            {showSkeleton
              ? [1, 2, 3, 4]?.map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-white/20 animate-pulse"
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
                )?.map(
                  (platform) =>
                    platform.href && (
                      <Link
                        key={platform.key}
                        href={platform.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-9 h-9 p-2 flex items-center justify-center transition-all "
                      >
                        {SOCIAL_ICONS[platform.label]}
                      </Link>
                    ),
                )}
          </div>
        </div>
      </div>

      {/* 2. STICKY NAVBAR */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center space-x-2">
            <Link href="/">
              {showSkeleton ? (
                <div className="h-12 w-65 rounded-md bg-gray-200 animate-pulse" />
              ) : (
                <Image
                  src={logoSrc}
                  width={160}
                  height={50}
                  alt="Ahead Solar logo"
                  className="h-12 w-auto object-contain"
                />
              )}
            </Link>
          </div>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden lg:flex items-center space-x-8 text-gray-700 font-medium">
            <Link
              href="/"
              className={`flex items-center space-x-1 py-4 transition-colors ${
                isActive("/") ? "text-[#4CAF50]" : "hover:text-[#4CAF50]"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`py-4 transition-colors ${
                isActive("/about") ? "text-[#4CAF50]" : "hover:text-[#4CAF50]"
              }`}
            >
              About Us
            </Link>

            <Link
              href="/services"
              className={`py-4 transition-colors ${
                isActive("/services")
                  ? "text-[#4CAF50]"
                  : "hover:text-[#4CAF50]"
              }`}
            >
              Services
            </Link>

            <Link
              href="/projects"
              className={`py-4 transition-colors ${
                isActive("/projects")
                  ? "text-[#4CAF50]"
                  : "hover:text-[#4CAF50]"
              }`}
            >
              Projects
            </Link>

            <Link
              href="/blogs"
              className={`py-4 transition-colors ${
                isActive("/blogs") ? "text-[#4CAF50]" : "hover:text-[#4CAF50]"
              }`}
            >
              Blogs
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="bg-[#4CAF50] hover:bg-emerald-600 text-white font-medium px-6 py-3 rounded-md transition-all inline-flex items-center space-x-2"
            >
              <span>Contact Us</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-gray-700 p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* 3. MOBILE MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-22 bg-white border-t border-gray-100 shadow-xl z-50 max-h-[calc(100vh-104px)] overflow-y-auto">
          <nav className="flex flex-col px-6 py-6 space-y-4 font-medium text-gray-800">
            <Link
              href="/"
              className={`py-2 border-b border-gray-100 ${
                isActive("/") ? "text-[#4CAF50]" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`py-2 border-b border-gray-100 ${
                isActive("/about") ? "text-[#4CAF50]" : "hover:text-[#4CAF50]"
              }`}
            >
              About Us
            </Link>
            <Link
              href="/services"
              className={`py-2 border-b border-gray-100 ${
                isActive("/services")
                  ? "text-[#4CAF50]"
                  : "hover:text-[#4CAF50]"
              }`}
            >
              Services
            </Link>
            <Link
              href="/projects"
              className={`py-2 border-b border-gray-100 ${
                isActive("/projects")
                  ? "text-[#4CAF50]"
                  : "hover:text-[#4CAF50]"
              }`}
            >
              Projects
            </Link>
            <Link
              href="/blogs"
              className={`py-2 border-b border-gray-100 ${
                isActive("/blogs") ? "text-[#4CAF50]" : "hover:text-[#4CAF50]"
              }`}
            >
              Blogs
            </Link>

            {/* Demo Accordion */}
            <div className="border-b border-gray-100 py-2">
              <button
                onClick={() => setIsMobilePagesOpen(!isMobilePagesOpen)}
                className="w-full flex justify-between items-center hover:text-[#4CAF50] text-left"
              >
                <span>Demo</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isMobilePagesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isMobilePagesOpen && (
                <div className="pl-4 mt-3 space-y-3 bg-gray-50 p-4 rounded-md text-sm">
                  {mainPages?.map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="block py-1 hover:text-[#4CAF50]"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile CTA */}
            <div className="pt-4">
              <Link
                href="/contact"
                className="bg-[#4CAF50] text-white font-medium px-6 py-3.5 rounded-md w-full flex justify-center items-center space-x-2"
              >
                <span>Contact Us</span>
                <ArrowUpRight size={18} />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
