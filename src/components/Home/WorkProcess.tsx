"use client";

import Reveal from "@/components/Common/Reveal";
import { DEFAULT_HERO_SLIDES } from "@/data/hero-slides";
import { Activity, ClipboardCheck, HardHat, Play, X } from "lucide-react";
import { useState } from "react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Site Assessment & Planning",
    description:
      "We evaluate your roof structure, energy consumption, and design a custom solar system optimized for maximum savings.",
    icon: <ClipboardCheck className="w-12 h-12 text-white stroke-[1.5]" />,
  },
  {
    number: "02",
    title: "Engineering & Installation",
    description:
      "Our certified team handles system design, permitting, and professional installation with minimal disruption.",
    icon: <HardHat className="w-12 h-12 text-white stroke-[1.5]" />,
  },
  {
    number: "03",
    title: "Commissioning & Monitoring",
    description:
      "Your system starts generating clean energy immediately, backed by real-time 24/7 remote performance monitoring.",
    icon: <Activity className="w-12 h-12 text-white stroke-[1.5]" />,
  },
];

const WorkProcess = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videoUrl =
    DEFAULT_HERO_SLIDES.find((s) => s.showVideoButton && s.videoUrl)
      ?.videoUrl ?? "";

  return (
    <>
      <section className="py-16 lg:py-25 px-4 bg-secondary font-sans overflow-x-hidden">
        <div className="solar-container">
          {/* Header Section */}
          <div className="text-center mb-16 space-y-4">
            <Reveal variant="fade-up">
              <span className="section-eyebrow justify-center">
                Our Work Process
              </span>
            </Reveal>
            <Reveal variant="fade-up" delay={100}>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold tracking-tight leading-[1.1] text-accent-500">
                From consultation to clean energy in three steps
              </h2>
            </Reveal>
            <Reveal variant="fade-up" delay={180}>
              <p className="text-[#888888] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                Our streamlined process takes you from a free site assessment to
                a fully operational solar plant — handled end-to-end by
                certified engineers.
              </p>
            </Reveal>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            {steps.map((step, index) => (
              <Reveal
                key={step.number}
                variant="fade-up"
                delay={index * 160}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Curved Connector Arrows (Visible on MD screens and above, except last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] z-0 pointer-events-none">
                    <svg
                      viewBox="0 0 160 50"
                      fill="none"
                      className="w-full h-auto text-accent-500"
                    >
                      <path
                        d={
                          index % 2 === 0
                            ? "M 10 10 Q 80 -10 145 35" // Upward curve
                            : "M 10 35 Q 80 55 145 10" // Downward curve
                        }
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        fill="none"
                      />
                      {/* Arrowhead */}
                      <polygon
                        points={
                          index % 2 === 0
                            ? "140,30 148,37 141,40"
                            : "140,15 148,8 141,5"
                        }
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}

                {/* Icon Card Container */}
                <div className="relative mb-6 z-10">
                  <div className="w-32 h-32 bg-accent-500 rounded-3xl flex items-center justify-center shadow-lg shadow-accent-500/25 group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-500">
                    {step.icon}
                  </div>

                  {/* Number Badge */}
                  <div className="absolute -top-1 -right-1 bg-gold-500 text-white font-heading font-bold text-sm w-9 h-9 rounded-full flex items-center justify-center ring-4 ring-white">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-forest-700 mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <div
        className="w-full bg-cover bg-center relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/home/intro-video-image.jpg')",
          backgroundAttachment: "fixed",
          minHeight: "680px",
        }}
      >
        <div className="absolute inset-0 bg-forest-900/80" />
        <div className="absolute inset-0 bg-linear-to-t from-forest-900/95 via-forest-900/60 to-black/40" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center px-4 py-24">
          <Reveal variant="zoom" delay={100}>
            <button
              type="button"
              onClick={() => videoUrl && setActiveVideo(videoUrl)}
              disabled={!videoUrl}
              aria-label="Play intro video"
              className="group relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex items-center justify-center bg-accent-500 hover:bg-accent-600 text-accent-500 transition-all duration-300 shadow-2xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="absolute inset-0 rounded-full bg-accent-500 pulse-ring" />
              <Play
                size={34}
                fill="#fff"
                className="ml-1 relative transition-transform duration-300 group-hover:scale-110"
              />
            </button>
          </Reveal>

          <Reveal variant="fade-up" delay={220}>
            <h3 className="font-heading mt-10 text-accent-500 text-3xl sm:text-5xl font-bold tracking-tight text-center uppercase">
              See How We Power a Greener Tomorrow
            </h3>
          </Reveal>

          <Reveal variant="fade-up" delay={320}>
            <p className="mt-3 text-white/70 text-sm sm:text-base font-medium tracking-wide text-center max-w-md">
              Watch our story — from site assessment to a fully operational
              rooftop solar plant.
            </p>
          </Reveal>
        </div>
      </div>

      {activeVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={() => setActiveVideo(null)}
        >
          <div className="relative w-full max-w-4xl mx-4">
            <button
              type="button"
              onClick={() => setActiveVideo(null)}
              className="absolute -top-12 right-0 text-white/80 hover:text-white transition z-10"
            >
              <X size={28} />
            </button>
            <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
              <iframe
                src={activeVideo}
                className="w-full h-full"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                title="Video Player"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WorkProcess;

