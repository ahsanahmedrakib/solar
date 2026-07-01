"use client";

import { DEFAULT_HERO_SLIDES, type HeroSlide } from "@/data/hero-slides";
import { Play, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Hero() {
  const [slides, setSlides] = useState<HeroSlide[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  useEffect(() => {
    async function loadSlides() {
      try {
        const res = await fetch("/api/hero-slides");
        const json = await res.json();
        if (json.success && Array.isArray(json.data)) {
          const activeSlides = json.data
            .filter((slide: HeroSlide) => slide.isActive)
            .sort((a: HeroSlide, b: HeroSlide) => a.order - b.order);
          if (activeSlides.length > 0) {
            setSlides(activeSlides);
          } else {
            setSlides(DEFAULT_HERO_SLIDES);
          }
        } else {
          setSlides(DEFAULT_HERO_SLIDES);
        }
      } catch {
        setSlides(DEFAULT_HERO_SLIDES);
      } finally {
        setLoading(false);
      }
    }
    loadSlides();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-187.5 bg-slate-900 flex items-center animate-pulse">
        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-20 pb-16">
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
          speed={900}
          loop={slides.length > 1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass: "hero-swiper-bullet",
            bulletActiveClass: "hero-swiper-bullet-active",
          }}
          className="h-full min-h-187.5"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="relative min-h-187.5 flex items-center bg-slate-900">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
                  style={{ backgroundImage: `url('${slide.image}')` }}
                />
                <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-transparent z-10" />

                <div className="max-w-7xl mx-auto w-full px-6 md:px-12 z-20 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative">
                  <div className="lg:col-span-7 flex flex-col items-start space-y-6">
                    <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
                      <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
                      <span className="text-white text-xs md:text-sm font-medium tracking-wide">
                        {slide.tagline}
                      </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight max-w-2xl">
                      {slide.title} <br className="hidden md:inline" />
                      <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white to-gray-300">
                        {slide.titleAccent}
                      </span>
                    </h1>

                    <p className="text-gray-300 text-base md:text-lg font-normal max-w-xl leading-relaxed">
                      {slide.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
                      <Link
                        href="/contact"
                        className="bg-[#4CAF50] hover:bg-emerald-600 text-white font-semibold px-6 py-4 rounded-md transition-all duration-300 inline-flex items-center space-x-2 shadow-lg shadow-emerald-900/30 w-full sm:w-auto justify-center"
                      >
                        <span>Get Free Consultation</span>
                        <Play size={18} fill="white" />
                      </Link>

                      {slide.showVideoButton && slide.videoUrl && (
                        <button
                          type="button"
                          onClick={() => setActiveVideo(slide.videoUrl)}
                          className="group flex cursor-pointer items-center space-x-3 text-white font-medium hover:text-[#4CAF50] transition-colors duration-300 py-3 px-4 rounded-md"
                        >
                          <span className="w-12 h-12 rounded-full bg-[#4CAF50] group-hover:bg-emerald-600 flex items-center justify-center transition-colors duration-300 shadow-md">
                            <Play
                              size={18}
                              fill="white"
                              className="text-white ml-0.5"
                            />
                          </span>
                          <span className="tracking-wide">Watch Our Story</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5 hidden lg:block" />
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
}

