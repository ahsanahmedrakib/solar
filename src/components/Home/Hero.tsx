"use client";

import { ArrowUpRight, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

interface HeroSlide {
  id: number;
  tagline: string;
  title: string;
  titleAccent: string;
  description: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  showVideoButton: boolean;
  isActive: boolean;
  order: number;
}

const FALLBACK_SLIDE: HeroSlide = {
  id: 0,
  tagline: "Solar Energy for Tomorrow",
  title: "Power Your Future with",
  titleAccent: "Clean Solar Energy",
  description:
    "From expert system design to seamless installation and ongoing support, we combine technical expertise with a commitment to performance, safety.",
  image: "/images/home/hero-bg-image.jpg",
  ctaText: "Get Free Consultation",
  ctaLink: "#consultation",
  showVideoButton: true,
  isActive: true,
  order: 1,
};

const avatars = [
  { src: "/images/home/author-1.jpg", alt: "User review 1" },
  { src: "/images/home/author-2.jpg", alt: "User review 2" },
  { src: "/images/home/author-3.jpg", alt: "User review 3" },
];

export default function Hero() {
  const [slides, setSlides] = useState<HeroSlide[]>([FALLBACK_SLIDE]);

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
          }
        }
      } catch (error) {
        console.error("Failed to load hero slides", error);
      }
    }
    loadSlides();
  }, []);

  return (
    <div className="w-full relative min-h-187.5 overflow-hidden select-none hero-swiper">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        effect="fade"
        speed={900}
        loop={slides.length > 1}
        autoplay={{
          delay: 6000,
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
                      href={slide.ctaLink}
                      className="bg-[#4CAF50] hover:bg-emerald-600 text-white font-semibold px-6 py-4 rounded-md transition-all duration-300 inline-flex items-center space-x-2 shadow-lg shadow-emerald-900/30 w-full sm:w-auto justify-center"
                    >
                      <span>{slide.ctaText}</span>
                      <ArrowUpRight size={18} />
                    </Link>

                    {slide.showVideoButton && (
                      <button
                        type="button"
                        className="group flex items-center space-x-3 text-white font-medium hover:text-[#4CAF50] transition-colors duration-300 py-3 px-4 rounded-md"
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

                  <div className="flex flex-row items-center gap-4 sm:gap-6 pt-10 w-full max-w-2xl bg-transparent select-none">
                    <div className="flex -space-x-3 sm:-space-x-4 shrink-0">
                      {avatars.map((avatar, idx) => (
                        <div
                          key={idx}
                          className="inline-block h-12 w-12 sm:h-14 sm:w-14 rounded-full ring-1 ring-white/80 shadow-md bg-gray-800 relative overflow-hidden"
                        >
                          <Image
                            fill
                            sizes="(max-width: 640px) 48px, 56px"
                            className="object-cover rounded-full"
                            src={avatar.src}
                            alt={avatar.alt}
                          />
                        </div>
                      ))}
                    </div>

                    <div className="h-10 w-px bg-white/20 shrink-0" />

                    <div className="max-w-md">
                      <p className="text-white text-sm sm:text-base md:text-lg font-bold leading-snug tracking-tight">
                        “Empowering homes and businesses with clean solar energy
                        for brighter tomorrow.”
                      </p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 hidden lg:block" />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
