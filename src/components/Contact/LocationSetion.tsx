"use client";

import { DEFAULT_SECTIONS, type Section } from "@/data/settings";
import { useQuerySettings } from "@/lib/queries";
import { useMemo } from "react";

function getMapUrl(sections: Section[]): string {
  const social = sections.find((s) => s.id === "social");
  const field = social?.fields?.find((f) => f.id === "google-map");
  return field?.value?.trim() || "";
}

export default function LocationSection() {
  const { data, isFetching: loading } = useQuerySettings();

  const mapUrl = useMemo(() => {
    const sections =
      data && Array.isArray(data) && data.length > 0 ? data : DEFAULT_SECTIONS;
    return getMapUrl(sections);
  }, [data]);

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:py-24">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Top Mini-Badge Indicator */}
        <div className="inline-flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-full px-4 py-1.5 mb-5 shadow-sm">
          <span className="w-1.5 h-1.5 bg-[#4caf50] rounded-full animate-pulse" />
          <span className="text-gray-600 text-xs font-semibold tracking-wide">
            Our Location
          </span>
        </div>

        {/* Section Heading & Subtext */}
        <h2 className="text-[#011c2b] text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 max-w-3xl leading-tight">
          Connecting you to clean energy
        </h2>
        <p className="text-gray-500 text-sm sm:text-base leading-relaxed max-w-2xl mb-12 sm:mb-16">
          No matter where you are, our expert team is ready to provide reliable
          solar solutions, on-site support, and consultations to help you
          transition to sustainable energy with ease.
        </p>

        {/* Map Container Wrap */}
        <div className="relative w-full h-80 sm:h-112.5 lg:h-130 rounded-2xl overflow-hidden shadow-md border border-gray-100">
          {loading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse rounded-2xl" />
          ) : (
            <iframe
              title="Office Location Map"
              src={mapUrl}
              className="w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>
      </div>
    </section>
  );
}
