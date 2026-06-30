"use client";

import { DEFAULT_SECTIONS } from "@/data/settings";
import { SOCIAL_ICONS } from "@/lib/const";
import Link from "next/link";
import { useEffect, useState } from "react";

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
  companyName: getField(DEFAULT_SECTIONS, "general", "company-name"),
  tagline: getField(DEFAULT_SECTIONS, "general", "brand-tagline"),
  phone: getField(DEFAULT_SECTIONS, "general", "phone-number"),
  email: getField(DEFAULT_SECTIONS, "general", "contact-email"),
  address: getField(DEFAULT_SECTIONS, "general", "hq-address"),
  socialFb: getField(DEFAULT_SECTIONS, "social", "social-fb"),
  socialX: getField(DEFAULT_SECTIONS, "social", "social-x"),
  socialLi: getField(DEFAULT_SECTIONS, "social", "social-li"),
  socialIg: getField(DEFAULT_SECTIONS, "social", "social-ig"),
};

export default function Footer() {
  const [settings, setSettings] = useState(FALLBACK);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch("/api/settings");
        const json = await res.json();
        if (json.success && json.data) {
          setSettings({
            companyName:
              getField(json.data, "general", "company-name") ||
              FALLBACK.companyName,
            tagline:
              getField(json.data, "general", "brand-tagline") ||
              FALLBACK.tagline,
            phone:
              getField(json.data, "general", "phone-number") || FALLBACK.phone,
            email:
              getField(json.data, "general", "contact-email") || FALLBACK.email,
            address:
              getField(json.data, "general", "hq-address") || FALLBACK.address,
            socialFb:
              getField(json.data, "social", "social-fb") || FALLBACK.socialFb,
            socialX:
              getField(json.data, "social", "social-x") || FALLBACK.socialX,
            socialLi:
              getField(json.data, "social", "social-li") || FALLBACK.socialLi,
            socialIg:
              getField(json.data, "social", "social-ig") || FALLBACK.socialIg,
          });
        }
      } catch (error) {
        console.error("Failed to load footer settings", error);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  return (
    <footer
      className="bg-[#03141F] text-white pt-16 pb-8 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}
    >
      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="animate-pulse space-y-12">
            {/* UPPER GRID SKELETON */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
              <div className="lg:col-span-4 space-y-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-full bg-white/10" />
                  <div className="h-7 w-44 rounded-md bg-white/10" />
                </div>
                <div className="space-y-2">
                  <div className="h-4 w-72 rounded bg-white/10" />
                  <div className="h-4 w-56 rounded bg-white/10" />
                </div>
                <div className="space-y-3 pt-2">
                  <div className="h-4 w-32 rounded bg-white/10" />
                  <div className="flex items-center gap-3">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="w-9 h-9 rounded-full bg-white/10" />
                    ))}
                  </div>
                </div>
              </div>
              <div className="lg:col-span-8 rounded-3xl p-8 sm:p-10 bg-white/5 border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6">
                {[1, 2, 3].map((col) => (
                  <div key={col} className="space-y-4">
                    <div className="h-5 w-28 rounded bg-white/10" />
                    <div className="space-y-2.5">
                      {[1, 2, 3, 4, 5].map((row) => (
                        <div key={row} className="h-4 w-full rounded bg-white/10" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT ROW SKELETON */}
            <div className="py-8 border-t border-b border-white/5">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4 pl-0 sm:pl-4">
                    <div className="w-11 h-11 rounded-full bg-white/10 shrink-0" />
                    <div className="space-y-1.5">
                      <div className="h-3 w-24 rounded bg-white/10" />
                      <div className="h-5 w-40 rounded bg-white/10" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* COPYRIGHT SKELETON */}
            <div className="pt-8 text-center">
              <div className="h-4 w-64 rounded bg-white/10 mx-auto" />
            </div>
          </div>
        ) : (
          <>
        {/* ========================================================================= */}
        {/* UPPER FOOTER GRID SECTION                                                 */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-16">
          {/* BRAND COLUMN */}
          <div className="lg:col-span-4 space-y-6">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-accent-600 text-white flex items-center justify-center shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5"
                >
                  <path d="M11 21l-1-7H4l10-12 1 7h6z" />
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                {settings.companyName}
                <span className="text-accent-600">.</span>
              </span>
            </div>

            {/* Description Paragraph */}
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {settings.tagline}
            </p>

            {/* Social Links Row */}
            <div className="space-y-3 pt-2">
              <h4 className="text-sm font-bold tracking-tight text-white">
                Follow Us On Socials:
              </h4>
              <div className="flex items-center gap-3">
                {(
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
                        className="w-9 h-9 p-1 flex items-center justify-center transition-all "
                      >
                        {SOCIAL_ICONS[platform.label]}
                      </Link>
                    ),
                )}
              </div>
            </div>
          </div>

          {/* INNER CARD OVERLAY MAIN LINKS CONTROLLER */}
          <div className="lg:col-span-8 bg-[#092232]/80 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-white/5 grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6">
            {/* QUICK LINKS */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Home",
                  "About Us",
                  "Our Services",
                  "Blogs",
                  "Contact Us",
                ].map((link) => (
                  <li
                    key={link}
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-white font-medium transition-colors cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 bg-accent-600 rounded-full shrink-0" />
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* OUR SERVICES */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Our Services
              </h3>
              <ul className="space-y-2.5">
                {[
                  "Solar Battery Storage",
                  "Solar System Maintenance",
                  "Rooftop Solar Solutions",
                  "Solar Panel Maintenance",
                  "Hybrid Solar Systems",
                ].map((link) => (
                  <li
                    key={link}
                    className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 hover:text-white font-medium transition-colors cursor-pointer"
                  >
                    <span className="w-1.5 h-1.5 bg-accent-600 rounded-full shrink-0" />
                    {link}
                  </li>
                ))}
              </ul>
            </div>

            {/* NEWSLETTER SUBSCRIBE */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white tracking-tight">
                Subscribe To Newsletter
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed font-medium">
                Subscribe to receive solar tips, energy saving insights, &
                latest updates.
              </p>

              {/* Form Input Container */}
              <div className="relative pt-2">
                <input
                  type="email"
                  placeholder="Enter Email Address *"
                  className="w-full bg-transparent text-sm border-b border-white/20 pb-2.5 pr-10 text-white placeholder-gray-500 focus:outline-none focus:border-accent-600 transition-colors"
                />
                <button
                  type="button"
                  className="absolute right-0 bottom-2 w-6 h-6 rounded-full bg-accent-600 text-white flex items-center justify-center hover:bg-[#399d3e] transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={3}
                    stroke="currentColor"
                    className="w-3 h-3"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MIDDLE SECTION: CONTACT INFO ROW                                          */}
        {/* ========================================================================= */}
        <div className="py-8 border-t border-b border-white/5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {/* Phone Entry */}
            <div className="flex items-center gap-4 pl-0 sm:pl-4">
              <div className="w-11 h-11 rounded-full bg-accent-600/10 text-accent-600 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-1.514 2.02a11.967 11.967 0 0 1-5.717-5.717l2.02-1.514c.362-.272.528-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25z"
                  />
                </svg>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Phone Number
                </p>
                <p className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {settings.phone}
                </p>
              </div>
            </div>

            {/* Email Entry */}
            <div className="flex items-center gap-4 pl-0 md:pl-6 md:border-l md:border-white/5">
              <div className="w-11 h-11 rounded-full bg-accent-600/10 text-accent-600 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5A2.25 2.25 0 0 1 2.25 17.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />
                </svg>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Email Address
                </p>
                <p className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {settings.email}
                </p>
              </div>
            </div>

            {/* Location Entry */}
            <div className="flex items-center gap-4 pl-0 md:pl-6 md:border-l md:border-white/5">
              <div className="w-11 h-11 rounded-full bg-accent-600/10 text-accent-600 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0z"
                  />
                </svg>
              </div>
              <div className="space-y-0.5">
                <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider">
                  Our Location
                </p>
                <p className="text-base sm:text-lg font-bold text-white tracking-tight">
                  {settings.address}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* LOWER FOOTER SECTION: COPYRIGHT NOTICE                                    */}
        {/* ========================================================================= */}
        <div className="pt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-500 font-medium tracking-wide">
            Copyright © {new Date().getFullYear()} {settings.companyName}. All rights reserved.
          </p>
        </div>
          </>
        )}
      </div>
    </footer>
  );
}
