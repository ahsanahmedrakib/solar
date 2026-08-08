"use client";

import {
  DEFAULT_HERO_SLIDES,
  PALASH_HERO_SLIDES,
  type HeroSite,
} from "@/data/hero-slides";
import { useQueryHeroSlides } from "@/lib/queries";
import { normalizeVideoUrl } from "@/lib/videoUrl";
import { Play, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function AnimatedWords({
  text,
  baseDelay = 0.4,
  step = 0.07,
}: {
  text: string;
  baseDelay?: number;
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          className="anime-word"
          style={{ transitionDelay: `${baseDelay + i * step}s` }}
        >
          {word}
          {i < words.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </>
  );
}

export default function Hero({ site = "ahead" }: { site?: HeroSite }) {
  const { data: rawSlides = [], isFetching: loading } =
    useQueryHeroSlides(site);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  const fallbackSlides =
    site === "palash" ? PALASH_HERO_SLIDES : DEFAULT_HERO_SLIDES;
  const defaultVideo =
    site === "palash"
      ? PALASH_HERO_SLIDES[0].backgroundVideo
      : DEFAULT_HERO_SLIDES[0].backgroundVideo;

  const slides = useMemo(() => {
    if (rawSlides?.length > 0) {
      const active = rawSlides
        .filter((s) => s.isActive)
        .sort((a, b) => a.order - b.order);
      return active.length > 0 ? active : fallbackSlides;
    }
    return fallbackSlides;
  }, [rawSlides, fallbackSlides]);

  const heroVideo = defaultVideo;

  if (loading) {
    return (
      <div className="w-full min-h-187.5 bg-slate-900 flex items-center animate-pulse">
        <div className="solar-container pt-20 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="h-8 w-52 rounded-full bg-slate-700" />
              <div className="space-y-3">
                <div className="h-12 w-full max-w-xl rounded bg-slate-700" />
                <div className="h-12 w-3/4 rounded bg-slate-700" />
                <div className="h-12 w-1/2 rounded bg-slate-700" />
              </div>
              <div className="h-5 w-full max-w-md rounded bg-slate-700" />
              <div className="flex gap-4 pt-4">
                <div className="h-14 w-44 rounded-md bg-slate-700" />
                <div className="h-14 w-48 rounded-md bg-slate-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full relative min-h-187.5 overflow-hidden select-none hero-swiper">
        <Swiper
          modules={[Autoplay, EffectFade, Pagination]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          slidesPerView={1}
          speed={900}
          loop={slides?.length > 1}
          autoplay={{
            delay: 7000,
            disableOnInteraction: false,
            waitForTransition: false, // keep this
            // optional extras that often help with fade:
            // pauseOnMouseEnter: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: "hero-swiper-bullet",
            bulletActiveClass: "hero-swiper-bullet-active",
          }}
          className="h-full min-h-187.5"
        >
          {slides?.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="swiper-slide-transform">
                <div className="relative min-h-187.5 flex items-start bg-forest-900">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={heroVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                  />
                  <div className="absolute inset-0 bg-linear-to-r from-forest-900/90 via-forest-900/60 to-transparent z-10" />

                  <div className="solar-container z-20 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
                    <div className="lg:col-span-7 flex flex-col items-start space-y-6">
                      <div className="hero-anime-item inline-flex items-center space-x-2 bg-white text-accent-500 px-4 py-1.5 rounded-full shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-accent-500 animate-pulse" />
                        <span className="text-xs md:text-sm font-semibold tracking-wide text-gold-500">
                          {slide.tagline}
                        </span>
                      </div>

                      <h1 className="font-heading text-4xl md:text-5xl lg:text-[68px] font-bold text-accent-600 leading-[1.1] tracking-tight max-w-3xl uppercase">
                        <AnimatedWords
                          text={slide.title}
                          baseDelay={0.35}
                          step={0.06}
                        />
                        <br className="hidden md:inline" />
                        <span className="text-stroke-white">
                          <AnimatedWords
                            text={slide.titleAccent}
                            baseDelay={
                              0.35 + slide.title.split(" ").length * 0.06
                            }
                            step={0.06}
                          />
                        </span>
                      </h1>

                      <p className="hero-anime-item text-white/75 text-base md:text-lg font-normal max-w-xl leading-relaxed">
                        {slide.description}
                      </p>

                      <div className="hero-anime-item flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
                        <Link
                          href="/contact"
                          className="btn-brand w-full sm:w-auto justify-center group"
                        >
                          <span>Get Free Consultation</span>
                          <Play
                            size={18}
                            fill="currentColor"
                            className="transition-transform duration-300 group-hover:translate-x-1"
                          />
                        </Link>

                        {slide.showVideoButton && slide.videoUrl && (
                          <button
                            type="button"
                            onClick={() => setActiveVideo(slide.videoUrl)}
                            className="group flex cursor-pointer items-center space-x-3 text-white font-medium hover:text-accent-500 transition-colors duration-300 py-3 px-4 rounded-full"
                          >
                            <span className="relative w-12 h-12 rounded-full bg-accent-500 group-hover:bg-forest-700 flex items-center justify-center transition-colors duration-300 shadow-md">
                              <span className="absolute inset-0 rounded-full bg-accent-500/50 pulse-ring" />
                              <Play
                                size={18}
                                fill="white"
                                className="text-white ml-0.5 relative"
                              />
                            </span>
                            <span className="tracking-wide">
                              Watch Our Story
                            </span>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="lg:col-span-5 hidden lg:block" />
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
                src={normalizeVideoUrl(activeVideo)}
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
}

