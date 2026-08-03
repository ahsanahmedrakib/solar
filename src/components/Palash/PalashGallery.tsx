"use client";

import Reveal from "@/components/Common/Reveal";
import Image from "next/image";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const galleryImages = [
  {
    src: "/images/palash/palash-1.webp",
    alt: "Palash Charging Station gallery image 1",
  },
  {
    src: "/images/palash/palash-2.webp",
    alt: "Palash Charging Station gallery image 2",
  },
  {
    src: "/images/palash/palash-3.webp",
    alt: "Palash Charging Station gallery image 3",
  },
  {
    src: "/images/palash/palash-4.webp",
    alt: "Palash Charging Station gallery image 4",
  },
  {
    src: "/images/palash/palash-5.webp",
    alt: "Palash Charging Station gallery image 5",
  },
  {
    src: "/images/palash/palash-6.webp",
    alt: "Palash Charging Station gallery image 6",
  },
  {
    src: "/images/palash/palash-7.webp",
    alt: "Palash Charging Station gallery image 7",
  },
];

export default function PalashGallery() {
  return (
    <section className="bg-secondary py-20 lg:py-25 px-4 sm:px-6 lg:px-8 font-sans overflow-x-hidden">
      <div className="solar-container">
        <Reveal variant="fade-up">
          <span className="section-eyebrow">Station Gallery</span>
        </Reveal>
        <Reveal variant="fade-up" delay={100}>
          <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold text-accent-500 tracking-tight leading-[1.1]">
            Inside Palash Charging Station
          </h2>
        </Reveal>

        <Reveal variant="fade-up" delay={180}>
          <div className="mt-12">
            <Swiper
              modules={[Autoplay, Pagination]}
              loop={true}
              pagination={{ clickable: true }}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
              className="swiper-dots pb-12"
            >
              {galleryImages.map((image, index) => (
                <SwiperSlide key={image.src}>
                  <div className="relative w-full h-64 sm:h-72 lg:h-80 rounded-xl overflow-hidden shadow-md">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 hover:scale-105"
                      priority={index < 3}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

