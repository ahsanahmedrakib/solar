"use client";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ImageSliderProps {
  images?: string[];
  cover?: string;
  alt?: string;
}

export default function ImageSlider({
  images,
  cover,
  alt = "Image",
}: ImageSliderProps) {
  const gallery = (Array.isArray(images) ? images : []).filter(Boolean);

  const slides =
    gallery.length > 0 ? [cover, ...gallery] : cover ? [cover] : [];
  const uniqueSlides = slides.filter(
    (img, index, arr) => Boolean(img) && arr.indexOf(img) === index,
  );

  if (uniqueSlides.length === 0) return null;

  if (uniqueSlides.length === 1) {
    return (
      <div
        className="h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url('${uniqueSlides[0]}')` }}
        aria-label={alt}
      />
    );
  }

  return (
    <div className="relative h-full w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        navigation
        pagination={{ el: ".single-image-pagination", clickable: true }}
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={0}
        slidesPerView={1}
        className="h-full w-full single-image-slider"
      >
        {uniqueSlides.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full w-full bg-cover bg-center"
              style={{ backgroundImage: `url('${img}')` }}
              aria-label={`${alt} - image ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

