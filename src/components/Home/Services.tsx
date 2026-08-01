"use client";

import Reveal from "@/components/Common/Reveal";
import { DEFAULT_SERVICES } from "@/data/services";
import { useQueryServices } from "@/lib/queries";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ServicesCard from "./ServicesCard";

const SKELETON_COUNT = 3;

export default function Services() {
  const { data: rawServices, isFetching: loading } = useQueryServices();

  const services =
    rawServices && rawServices.length > 0 ? rawServices : DEFAULT_SERVICES;

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

          {/* SERVICES CARD GRID */}
          {loading ? (
            Array.from({ length: SKELETON_COUNT })?.map((_, i) => (
              <div
                key={i}
                className="h-115 rounded-lg overflow-hidden bg-gray-200 animate-pulse"
              />
            ))
          ) : (
            <ServicesCard services={services?.slice(0, 6)} />
          )}
        </div>
      </section>
    </div>
  );
}

