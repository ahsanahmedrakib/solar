"use client";

import type { ServiceCard } from "@/types/services";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ServicesCardSwiper = ({ services }: { services: ServiceCard[] }) => {
  return (
    <div>
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="swiper-dots pb-12"
      >
        {services?.map((service) => (
          <SwiperSlide key={service.id}>
            <Link
              href={"services/" + service.slug}
              className="relative h-115 rounded-lg overflow-hidden shadow-sm group flex flex-col justify-end p-4 transition-transform duration-300 hover:-translate-y-1"
            >
              {/* Full background image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${service.image})` }}
              />

              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-accent-400/80 via-transparent to-transparent z-0" />

              {/* Content box */}
              <div className="relative z-10 w-full rounded-xl p-5 backdrop-blur-md transition-all duration-300 border bg-gold-900/40 backdrop-brightness-90 border-white/20 group-hover:bg-gold-900/70 group-hover:border-accent-500/30">
                <h3 className="font-heading text-lg lg:text-xl font-bold leading-snug tracking-tight text-white">
                  {service.title}
                </h3>

                {/* Description – appears on hover */}
                {service.description && (
                  <p className="mt-2 text-sm text-white/80 line-clamp-2 max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100">
                    {service.description}
                  </p>
                )}

                <div className="mt-4 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-white group-hover:text-accent-400 transition-colors">
                  <span>View Details</span>
                  <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent-500 text-gold-700">
                    <ArrowUpRight size={12} />
                  </span>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ServicesCardSwiper;

