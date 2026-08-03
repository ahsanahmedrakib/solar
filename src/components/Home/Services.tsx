"use client";

import Reveal from "@/components/Common/Reveal";
import { DEFAULT_SERVICES } from "@/data/services";
import { useQueryServices } from "@/lib/queries";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ServicesCardSwiper from "./ServicesCardSwiper";

export default function Services() {
  const { data: rawServices, isFetching: loading } = useQueryServices();

  const services =
    rawServices && rawServices.length > 0 ? rawServices : DEFAULT_SERVICES;

  if (loading) {
    return (
      <section className="bg-white py-20 lg:py-25 font-sans overflow-x-hidden">
        <div className="solar-container space-y-12 lg:space-y-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
            <div className="lg:col-span-7 space-y-4">
              <div className="h-6 w-28 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-12 w-full max-w-xl rounded bg-gray-200 animate-pulse" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 })?.map((_, i) => (
              <div
                key={i}
                className="relative w-full aspect-[0.84/1] rounded-lg bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white font-sans overflow-x-hidden">
      {/* OUR SERVICES */}
      <section className="bg-secondary py-20 lg:py-25 px-4 sm:px-6 lg:px-8">
        <div className="solar-container space-y-12">
          {/* HEADER ROW */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <Reveal variant="fade-up">
                <span className="section-eyebrow">Our Services</span>
              </Reveal>
              <Reveal variant="fade-up" delay={100}>
                <h2 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold text-accent-500 tracking-tight leading-[1.1]">
                  Comprehensive solar solutions for every business need
                </h2>
              </Reveal>
            </div>

            <Reveal variant="fade-up" delay={180}>
              <div>
                <p className="text-[#888888] text-sm sm:text-base leading-relaxed max-w-md">
                  From system design and professional installation to energy
                  storage and ongoing maintenance — our integrated solutions
                  deliver reliable performance for industrial and commercial
                  facilities.
                </p>
                <Link
                  href="/services"
                  className="btn-brand mt-5 group inline-flex"
                >
                  View All Services
                  <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </Reveal>
          </div>

          <ServicesCardSwiper services={services?.slice(0, 6)} />
        </div>
      </section>
    </div>
  );
}

