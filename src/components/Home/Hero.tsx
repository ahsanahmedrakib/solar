"use strict";
"use client";

import { ArrowUpRight, FileText, Play, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const authors = [
  { id: 1, name: "Alex Johnson", avatar: "/images/home/author-1.jpg" },
  {
    id: 2,
    name: "Maria Garcia",
    avatar: "/images/home/author-2.jpg",
  },
  { id: 3, name: "James Wilson", avatar: "/images/home/author-3.jpg" },
];
export default function Hero() {
  return (
    <div className="w-full relative min-h-187.5 flex items-center bg-slate-900 overflow-hidden select-none">
      {/* BACKGROUND IMAGE WITH DARK BLUR OVERLAY */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 scale-105"
        style={{
          backgroundImage: `url('/images/home/hero-bg-image.jpg')`, // Replace with your actual asset path
        }}
      />
      <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/60 to-transparent z-10" />

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 z-20 pt-20 pb-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT HERO TEXT & CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#4CAF50] animate-pulse" />
            <span className="text-white text-xs md:text-sm font-medium tracking-wide">
              Solar Energy for Tomorrow
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.15] tracking-tight max-w-2xl">
            Power Your Future with <br className="hidden md:inline" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white to-gray-300">
              Clean Solar Energy
            </span>
          </h1>

          {/* Description */}
          <p className="text-gray-300 text-base md:text-lg font-normal max-w-xl leading-relaxed">
            From expert system design to seamless installation and ongoing
            support, we combine technical expertise with a commitment to
            performance, safety.
          </p>

          {/* Call to Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-4 w-full sm:w-auto">
            <Link
              href="#consultation"
              className="bg-[#4CAF50] hover:bg-emerald-600 text-white font-semibold px-6 py-4 rounded-md transition-all duration-300 inline-flex items-center space-x-2 shadow-lg shadow-emerald-900/30 w-full sm:w-auto justify-center"
            >
              <span>Get Free Consultation</span>
              <ArrowUpRight size={18} />
            </Link>

            <button
              type="button"
              className="group flex items-center space-x-3 text-white font-medium hover:text-[#4CAF50] transition-colors duration-300 py-3 px-4 rounded-md"
            >
              <span className="w-12 h-12 rounded-full bg-[#4CAF50] group-hover:bg-emerald-600 flex items-center justify-center transition-colors duration-300 shadow-md">
                <Play size={18} fill="white" className="text-white ml-0.5" />
              </span>
              <span className="tracking-wide">Watch Our Story</span>
            </button>
          </div>

          {/* TESTIMONIAL / AVATAR ROW */}
          <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 pt-10 border-t border-white/10 w-full max-w-xl">
            {/* Overlapping Avatar Stack */}
            <div className="flex -space-x-3 overflow-hidden">
              {authors.map((a) => (
                <div key={a.avatar} className="rounded-full">
                  <Image
                    src={a.avatar}
                    width="160"
                    height="50"
                    alt="logo"
                  />{" "}
                </div>
              ))}
            </div>
            {/* Quote */}
            <p className="text-gray-300 text-sm italic font-light leading-snug">
              “Empowering homes and businesses with clean solar energy for
              brighter tomorrow.”
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN (Kept clean or open for complex compositions/spacing matching image layouts) */}
        <div className="lg:col-span-5 hidden lg:block" />
      </div>

      {/* FLOATING ACTION TOOLBAR SIDEBAR (Right edge) */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col space-y-px bg-white rounded-l-md shadow-2xl border border-r-0 border-gray-200 overflow-hidden">
        <button
          type="button"
          aria-label="Documentation"
          className="p-3.5 text-gray-700 hover:text-[#4CAF50] hover:bg-gray-50 transition-colors border-b border-gray-100"
        >
          <FileText size={20} />
        </button>
        <button
          type="button"
          aria-label="Cart"
          className="p-3.5 text-gray-700 hover:text-[#4CAF50] hover:bg-gray-50 transition-colors"
        >
          <ShoppingCart size={20} />
        </button>
      </div>
    </div>
  );
}
