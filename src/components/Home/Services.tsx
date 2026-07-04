"use client";

import { DEFAULT_SERVICES, type Service } from "@/data/services";
import { iconRenderer } from "@/lib/iconRenderer";
import type { ServiceCard } from "@/types/services";
import { useEffect, useState } from "react";
import ServicesCard from "./ServicesCard";

function toServiceCard(service: Service): ServiceCard {
  return {
    id: service.id,
    title: service.title,
    description: service.description,
    image: service.image,
    alt: service.alt,
    iconSvg: iconRenderer(service.iconName),
    slug: service.slug,
  };
}

const SKELETON_COUNT = 3;

export default function Services() {
  const [services, setServices] = useState<ServiceCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setServices(json.data?.map(toServiceCard));
        } else {
          setServices(DEFAULT_SERVICES?.map(toServiceCard));
        }
      } catch (error) {
        console.error("Failed to load services", error);
        setServices(DEFAULT_SERVICES?.map(toServiceCard));
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <div className="bg-white font-sans overflow-x-hidden">
      {/* OUR SERVICES */}
      <section className="bg-[#F7F9FA] py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* HEADER ROW */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
                <span className="w-1.5 h-1.5 bg-[#31A24C] rounded-full"></span>
                Our Services
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051720] tracking-tight leading-[1.15]">
                Smart solar service designed for homes & businesses
              </h2>
            </div>

            <div>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                From system design and professional installation to energy
                storage, our smart solar solutions deliver reliable performance.
              </p>
              <button className="mt-4 inline-flex items-center gap-2 bg-accent-600 hover:bg-[#399d3e] transition-colors text-white font-semibold text-sm px-5 py-3 rounded-lg shadow-sm whitespace-nowrap">
                View All Services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </button>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
              {Array.from({ length: SKELETON_COUNT })?.map((_, i) => (
                <div
                  key={i}
                  className="bg-white rounded-4xl p-6 shadow-sm border border-gray-100/60 animate-pulse"
                >
                  <div className="w-full aspect-1.5/1 rounded-2xl bg-gray-200" />
                  <div className="mt-5 space-y-3">
                    <div className="h-5 w-3/4 rounded bg-gray-200" />
                    <div className="h-4 w-full rounded bg-gray-200" />
                    <div className="h-4 w-2/3 rounded bg-gray-200" />
                  </div>
                  <div className="pt-6">
                    <div className="h-4 w-28 rounded bg-gray-200" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ServicesCard services={services} />
          )}
        </div>
      </section>
    </div>
  );
}
