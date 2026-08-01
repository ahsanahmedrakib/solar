"use client";

import Reveal from "@/components/Common/Reveal";
import { DEFAULT_HERO_SLIDES } from "@/data/hero-slides";
import { Play, X } from "lucide-react";
import { useState } from "react";

const Banner = () => {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const videoUrl =
    DEFAULT_HERO_SLIDES.find((s) => s.showVideoButton && s.videoUrl)
      ?.videoUrl ?? "";

  return (
    <>
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

export default Banner;

