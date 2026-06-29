"use strict";
"use client";

import {
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Globe,
  Mail,
  Menu,
  Phone,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobilePagesOpen, setIsMobilePagesOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/logo.svg");

  const pathname = usePathname();
  const mainPages = ["Demo 1", "Demo 2"];

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
            <a
              href="tel:+1123456789"
              className="hover:underline flex items-center space-x-2"
            >
              <Phone size={14} />
              <span>Phone Number: +(123) 456-789</span>
            </a>
            <a
              href="mailto:info@domainname.com"
              className="hover:underline flex items-center space-x-2"
            >
              <Mail size={14} />
              <span>Email Address: info@domainname.com</span>
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <span>Follow Us On Social:</span>
            <div className="flex items-center space-x-3">
              <Link href="#" className="hover:text-gray-200">
                <X size={16} />
              </Link>
              <Link href="#" className="hover:text-gray-200">
                <X size={16} />
              </Link>
              <Link href="#" className="hover:text-gray-200">
                <Globe size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STICKY NAVBAR */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center space-x-2">
            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoSrc}
                width={160}
                height={50}
                alt="Sunex logo"
                className="h-12 w-auto object-contain"
              />
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

            {/* Demo Dropdown */}
            <div className="relative group py-4">
              <button className="hover:text-[#4CAF50] transition-colors flex items-center space-x-1 focus:outline-none">
                <span>Demo</span>
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />
              </button>

              <div className="absolute left-0 top-full hidden group-hover:block w-60 bg-[#4CAF50] text-white rounded-b-md shadow-lg py-2 text-sm z-50">
                {mainPages.map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="block px-6 py-2.5 hover:bg-emerald-600 transition-colors"
                  >
                    {item}
                  </Link>
                ))}

                <hr className="border-emerald-600/50 my-1" />

                <div className="relative group/sub">
                  <button className="w-full flex justify-between items-center px-6 py-2.5 hover:bg-emerald-600 transition-colors">
                    <span>Demo 3</span>
                    <ChevronRight size={14} />
                  </button>
                  <div className="absolute left-full top-0 hidden group-hover/sub:block w-48 bg-emerald-600 text-white rounded-md shadow-lg py-2">
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-emerald-700"
                    >
                      Demo 3_1
                    </Link>
                  </div>
                </div>

                <div className="relative group/sub">
                  <button className="w-full flex justify-between items-center px-6 py-2.5 hover:bg-emerald-600 transition-colors">
                    <span>Demo 4</span>
                    <ChevronRight size={14} />
                  </button>
                  <div className="absolute left-full top-0 hidden group-hover/sub:block w-48 bg-emerald-600 text-white rounded-md shadow-lg py-2">
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-emerald-700"
                    >
                      Demo 4_1
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
                  {mainPages.map((item) => (
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
