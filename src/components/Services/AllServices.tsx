"use client";

import { DEFAULT_SERVICES, type Service } from "@/data/services";
import { iconRenderer } from "@/lib/iconRenderer";
import type { ServiceCard } from "@/types/services";
import { useEffect, useState } from "react";
import ServicesCard from "../Home/ServicesCard";

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

const AllServices = () => {
  const [services, setServices] = useState<ServiceCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadServices() {
      try {
        const res = await fetch("/api/services");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data?.length > 0) {
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
    <div>
      <div className="bg-white font-sans overflow-x-hidden">
        <section className="bg-[#F7F9FA] py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                {Array.from({ length: 6 })?.map((_, i) => (
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
    </div>
  );
};

export default AllServices;
