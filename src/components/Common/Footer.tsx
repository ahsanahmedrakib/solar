"use client";

import { DEFAULT_SERVICES } from "@/data/services";
import { DEFAULT_SECTIONS } from "@/data/settings";
import { COMPANY_NAME, SITE_LOGO } from "@/lib/config";
import { SOCIAL_ICONS } from "@/lib/const";
import { useQueryServices, useQuerySettings } from "@/lib/queries";
import { Mail, MapPin, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import Reveal from "./Reveal";

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
  companyName: COMPANY_NAME,
  tagline: getField(DEFAULT_SECTIONS, "general", "brand-tagline"),
  phone: getField(DEFAULT_SECTIONS, "general", "phone-number"),
  email: getField(DEFAULT_SECTIONS, "general", "contact-email"),
  address: getField(DEFAULT_SECTIONS, "general", "hq-address"),
  socialFb: getField(DEFAULT_SECTIONS, "social", "social-fb"),
  socialX: getField(DEFAULT_SECTIONS, "social", "social-x"),
  socialLi: getField(DEFAULT_SECTIONS, "social", "social-li"),
  socialIg: getField(DEFAULT_SECTIONS, "social", "social-ig"),
  socialYt: getField(DEFAULT_SECTIONS, "social", "social-youtube"),
  logo: SITE_LOGO,
};

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Projects", href: "/projects" },
];

export default function Footer() {
  const { data, isFetching, isLoading } = useQuerySettings();
  const {
    data: rawServices = [],
    isFetching: servicesFetching,
    isLoading: servicesIsLoading,
  } = useQueryServices();

  const settings = useMemo(() => {
    if (!data) return FALLBACK;
    return {
      companyName: COMPANY_NAME,
      tagline: getField(data, "general", "brand-tagline") || FALLBACK.tagline,
      phone: getField(data, "general", "phone-number") || FALLBACK.phone,
      email: getField(data, "general", "contact-email") || FALLBACK.email,
      address: getField(data, "general", "hq-address") || FALLBACK.address,
      socialFb: getField(data, "social", "social-fb"),
      socialX: getField(data, "social", "social-x"),
      socialLi: getField(data, "social", "social-li"),
      socialIg: getField(data, "social", "social-ig"),
      socialYt: getField(data, "social", "social-youtube"),
      logo: SITE_LOGO,
    };
  }, [data]);

  const services = useMemo(() => {
    if (rawServices?.length > 0) return rawServices;
    return DEFAULT_SERVICES;
  }, [rawServices]);

  const showSkeleton = isFetching && !isLoading;
  const showServicesSkeleton = servicesFetching && !servicesIsLoading;

  return (
    <footer className="bg-forest-700 text-white pt-0 font-sans">
      <div className="solar-container">
        {/* ========================================================================= */}
        {/* FOOTER CONTACT BOXES                                                     */}
        {/* ========================================================================= */}
        <Reveal variant="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 py-10 border-b border-white/20">
            <div className="flex items-center gap-5">
              <div
                className="w-16 h-16 rounded-xl bg-accent-500 text-white flex items-center justify-center shrink-0 chat-idle"
                style={{ animationDelay: "0s" }}
              >
                <Mail size={28} />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-white mb-1">
                  Support &amp; Email
                </h3>
                {showSkeleton ? (
                  <div className="h-5 w-44 rounded bg-white/10 animate-pulse" />
                ) : (
                  <a
                    href={`mailto:${settings.email}`}
                    className="text-white/80 hover:text-accent-400 transition-colors text-sm"
                  >
                    {settings.email}
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-5 md:border-l md:border-white/20 md:pl-6">
              <div
                className="w-16 h-16 rounded-xl bg-accent-500 text-white flex items-center justify-center shrink-0 chat-idle"
                style={{ animationDelay: "0.5s" }}
              >
                <Phone size={28} />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-white mb-1">
                  Customer Support
                </h3>
                {showSkeleton ? (
                  <div className="h-5 w-44 rounded bg-white/10 animate-pulse" />
                ) : (
                  <a
                    href={`tel:${settings.phone.replace(/\s/g, "")}`}
                    className="text-white/80 hover:text-accent-400 transition-colors text-sm"
                  >
                    {settings.phone}
                  </a>
                )}
              </div>
            </div>

            <div className="flex items-center gap-5 md:border-l md:border-white/20 md:pl-6">
              <div
                className="w-16 h-16 rounded-xl bg-accent-500 text-white flex items-center justify-center shrink-0 chat-idle"
                style={{ animationDelay: "1s" }}
              >
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="text-xl font-heading font-bold text-white mb-1">
                  Our Location
                </h3>
                {showSkeleton ? (
                  <div className="h-5 w-52 rounded bg-white/10 animate-pulse" />
                ) : (
                  <p className="text-white/80 text-sm">{settings.address}</p>
                )}
              </div>
            </div>
          </div>
        </Reveal>

        {/* ========================================================================= */}
        {/* MEGA FOOTER GRID                                                          */}
        {/* ========================================================================= */}
        <Reveal variant="fade-up" delay={100}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pt-14 pb-10">
            {/* BRAND COLUMN */}
            <div className="lg:col-span-5 space-y-6">
              <Link href="/">
                {showSkeleton ? (
                  <div className="h-12 w-44 rounded-md bg-white/10 animate-pulse" />
                ) : (
                  <Image
                    src={settings.logo}
                    width={160}
                    height={48}
                    alt="Ahead Solar logo"
                    className="h-12 w-auto object-contain"
                  />
                )}
              </Link>

              {showSkeleton ? (
                <div className="space-y-2 animate-pulse">
                  <div className="h-4 w-72 rounded bg-white/10" />
                  <div className="h-4 w-56 rounded bg-white/10" />
                </div>
              ) : (
                <p className="text-white/75 text-sm leading-relaxed max-w-sm">
                  {settings.tagline}
                </p>
              )}

              <div className="space-y-3">
                <h4 className="font-heading text-lg font-bold text-white">
                  Follow Us On Socials:
                </h4>
                <div className="flex items-center gap-2">
                  {showSkeleton
                    ? [1, 2, 3, 4, 5].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-xl bg-white/10 animate-pulse"
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
                          {
                            key: "socialYt",
                            label: "youtube" as const,
                            href: settings.socialYt,
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
                              className="rounded-xl flex items-center justify-center transition-all"
                              aria-label={platform.label}
                            >
                              {SOCIAL_ICONS[platform.label]}
                            </Link>
                          ),
                      )}
                </div>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div className="lg:col-span-3 space-y-5">
              <h3 className="font-heading text-xl font-bold text-accent-500">
                Quick Links
              </h3>
              <ul className="space-y-3">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="relative pl-4 text-white/75 hover:text-gold-500 transition-colors text-sm before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gold-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* OUR SERVICES */}
            <div className="lg:col-span-4 space-y-5">
              <h3 className="font-heading text-xl font-bold text-accent-500">
                Our Services
              </h3>
              {showServicesSkeleton ? (
                <div className="space-y-3 animate-pulse">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="h-4 w-40 rounded bg-white/10" />
                  ))}
                </div>
              ) : (
                <ul className="space-y-3">
                  {services?.slice(0, 5).map((service) => (
                    <li key={service.slug}>
                      <Link
                        href={"services/" + service.slug}
                        className="relative pl-4 text-white/75 hover:text-gold-500 transition-colors text-sm before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-gold-500"
                      >
                        {service.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          {/* </Reveal> */}

          {/* ========================================================================= */}
          {/* COPYRIGHT — ACCENT PILL                                                    */}
          {/* ========================================================================= */}

          {/* <Reveal variant="fade-up" delay={200}> */}
          <p className="flex justify-between flex-wrap gap-3 text-sm text-white/70 mb-6">
            <span>
              Copyright © {new Date().getFullYear()} {settings.companyName}. All
              rights reserved.
            </span>{" "}
            <span>
              Design &amp; Development by{" "}
              <Link href="https://bct.com.bd/" target="_blank">
                Bismillah Computer &amp; Technology
              </Link>
            </span>
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
