"use client";

import Reveal from "@/components/Common/Reveal";
import RevealImage from "@/components/Common/RevealImage";
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
      <div className="solar-container flex flex-col items-center text-center">
        {/* Top Mini-Badge Indicator */}
        <Reveal variant="fade-up">
          <div className="inline-flex items-center gap-2 bg-secondary border border-white rounded-full px-4 py-1.5 mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 bg-accent-500 rounded-full animate-pulse" />
            <span className="text-accent-500 text-xs font-semibold tracking-wide">
              Our Location
            </span>
          </div>
        </Reveal>

        {/* Section Heading & Subtext */}
        <Reveal variant="fade-up" delay={100}>
          <h2 className="font-heading text-accent-500 text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 max-w-3xl leading-tight">
            Connecting you to clean energy
          </h2>
        </Reveal>
        <Reveal variant="fade-up" delay={180}>
          <p className="text-[#888888] text-sm sm:text-base leading-relaxed max-w-2xl mb-12 sm:mb-16">
            No matter where you are, our expert team is ready to provide
            reliable solar solutions, on-site support, and consultations to help
            you transition to sustainable energy with ease.
          </p>
        </Reveal>

        {/* Map Container Wrap */}
        <RevealImage
          delay={200}
          className="relative w-full h-80 sm:h-112.5 lg:h-130 rounded-lg overflow-hidden shadow-md border border-gray-100"
        >
          {loading ? (
            <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg" />
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
        </RevealImage>
      </div>
    </section>
  );
}

