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
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobilePagesOpen, setIsMobilePagesOpen] = useState(false);
  const [isMobileLayoutsOpen, setIsMobileLayoutsOpen] = useState(false);

  const mainPages = [
    "Service Details",
    "Blog Details",
    "Projects",
    "Project Details",
    "Our Team",
    "Team Details",
    "Pricing Plans",
    "Testimonials",
    "Image Gallery",
    "Video Gallery",
    "FAQs",
    "404",
  ];

  return (
    <div className="w-full relative">
      {/* 1. TOP BAR */}
      <div className="bg-[#4CAF50] text-white text-sm py-2 px-6 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Contact Info */}
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
          {/* Social Media Links */}
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

      {/* 2. MAIN HEADER / NAVBAR */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          {/* LOGO */}
          <div className="flex items-center space-x-2">
            <Image src="/logo.svg" width="160" height="50" alt="logo" />
          </div>

          {/* DESKTOP NAVIGATION LINKS (Hover Action via CSS) */}
          <nav className="hidden lg:flex items-center space-x-8 text-gray-700 font-medium h-full">
            <Link
              href="/"
              className="text-[#4CAF50] flex items-center space-x-1 py-4"
            >
              <span>Home</span>
              <ChevronDown size={14} />
            </Link>
            <Link
              href="/about"
              className="hover:text-[#4CAF50] transition-colors py-4"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="hover:text-[#4CAF50] transition-colors py-4"
            >
              Services
            </Link>
            <Link
              href="#"
              className="hover:text-[#4CAF50] transition-colors py-4"
            >
              Blogs
            </Link>

            {/* LEVEL 1: PAGES DROPDOWN CONTAINER */}
            <div className="relative group py-4">
              <button className="hover:text-[#4CAF50] transition-colors flex items-center space-x-1 focus:outline-none">
                <span>Pages</span>
                <ChevronDown
                  size={14}
                  className="transition-transform duration-200 group-hover:rotate-180"
                />
              </button>

              {/* Level 1 Menu Box */}
              <div className="absolute left-0 top-[calc(100%-8px)] hidden group-hover:block w-60 bg-[#4CAF50] text-white rounded-b-md shadow-lg py-2 text-sm z-50">
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

                {/* LEVEL 2: HEADER LAYOUTS SUBMENU */}
                <div className="relative group/sub">
                  <button className="w-full flex justify-between items-center px-6 py-2.5 hover:bg-emerald-600 transition-colors">
                    <span>Header Layouts</span>
                    <ChevronRight size={14} />
                  </button>
                  {/* Level 2 Submenu Box */}
                  <div className="absolute left-full top-0 hidden group-hover/sub:block w-48 bg-emerald-600 text-white rounded-md shadow-lg py-2">
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-emerald-700"
                    >
                      Layout Version 1
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-emerald-700"
                    >
                      Layout Version 2
                    </Link>
                  </div>
                </div>

                {/* LEVEL 2: FOOTER LAYOUTS SUBMENU */}
                <div className="relative group/sub">
                  <button className="w-full flex justify-between items-center px-6 py-2.5 hover:bg-emerald-600 transition-colors">
                    <span>Footer Layouts</span>
                    <ChevronRight size={14} />
                  </button>
                  {/* Level 2 Submenu Box */}
                  <div className="absolute left-full top-0 hidden group-hover/sub:block w-48 bg-emerald-600 text-white rounded-md shadow-lg py-2">
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-emerald-700"
                    >
                      Footer Classic
                    </Link>
                    <Link
                      href="#"
                      className="block px-4 py-2 hover:bg-emerald-700"
                    >
                      Footer Modern
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="#"
              className="hover:text-[#4CAF50] transition-colors py-4"
            >
              Contact Us
            </Link>
          </nav>

          {/* CTA BUTTON */}
          <div className="hidden lg:block">
            <Link
              href="#"
              className="bg-[#4CAF50] hover:bg-emerald-600 text-white font-medium px-6 py-3 rounded-md transition-all inline-flex items-center space-x-2"
            >
              <span>Contact Us</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 focus:outline-none p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* 3. MOBILE RESPONSIVE DRAWER MENU */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl z-50 py-4 max-h-[85vh] overflow-y-auto">
          <nav className="flex flex-col px-6 space-y-3 font-medium text-gray-800">
            <Link
              href="#"
              className="text-[#4CAF50] py-2 border-b border-gray-50"
            >
              Home
            </Link>
            <Link
              href="#"
              className="py-2 border-b border-gray-50 hover:text-[#4CAF50]"
            >
              About Us
            </Link>
            <Link
              href="#"
              className="py-2 border-b border-gray-50 hover:text-[#4CAF50]"
            >
              Services
            </Link>
            <Link
              href="#"
              className="py-2 border-b border-gray-50 hover:text-[#4CAF50]"
            >
              Blogs
            </Link>

            {/* Mobile Collapsible Pages Accordion */}
            <div className="border-b border-gray-50 py-2">
              <button
                onClick={() => setIsMobilePagesOpen(!isMobilePagesOpen)}
                className="w-full flex justify-between items-center hover:text-[#4CAF50] text-left"
              >
                <span>Pages</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${isMobilePagesOpen ? "rotate-180" : ""}`}
                />
              </button>

              {isMobilePagesOpen && (
                <div className="pl-4 mt-2 space-y-2 bg-gray-50 p-2 rounded-md text-sm text-gray-600">
                  {mainPages.map((item) => (
                    <Link
                      key={item}
                      href="#"
                      className="block py-1.5 hover:text-[#4CAF50]"
                    >
                      {item}
                    </Link>
                  ))}

                  {/* Nesting Header Layouts Accordion */}
                  <div className="pt-1">
                    <button
                      onClick={() =>
                        setIsMobileLayoutsOpen(!isMobileLayoutsOpen)
                      }
                      className="w-full flex justify-between items-center py-1.5 font-semibold text-gray-700"
                    >
                      <span>Layout Options</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform ${isMobileLayoutsOpen ? "rotate-180" : ""}`}
                      />
                    </button>
                    {isMobileLayoutsOpen && (
                      <div className="pl-3 mt-1 space-y-1 text-xs border-l-2 border-[#4CAF50]/30">
                        <Link
                          href="#"
                          className="block py-1 hover:text-[#4CAF50]"
                        >
                          Header Layout V1
                        </Link>
                        <Link
                          href="#"
                          className="block py-1 hover:text-[#4CAF50]"
                        >
                          Header Layout V2
                        </Link>
                        <Link
                          href="#"
                          className="block py-1 hover:text-[#4CAF50]"
                        >
                          Footer Classic
                        </Link>
                        <Link
                          href="#"
                          className="block py-1 hover:text-[#4CAF50]"
                        >
                          Footer Modern
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link href="#" className="py-2 hover:text-[#4CAF50]">
              Contact Us
            </Link>

            <div className="pt-4">
              <Link
                href="#"
                className="bg-[#4CAF50] text-white font-medium px-4 py-2.5 rounded-md w-full justify-center inline-flex items-center space-x-2"
              >
                <span>Contact Us</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
