"use client";
"use strict";

import Image from "next/image";
import React from "react";

const WhyChooseUs: React.FC = () => {
  const services = [
    "Renewable Energy",
    "Residential Solar",
    "Sustainable Energy",
    "Solar Battery Storage",
  ];

  return (
    <>
      <section className="bg-white py-16 px-4 sm:px-6 lg:py-24 lg:px-20 mx-auto font-sans overflow-x-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* LEFT COLUMN: TEXT CONTENT & STATS */}
          <div className="lg:col-span-6 space-y-6 lg:pr-6">
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 bg-[#F3F4F6] px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700">
              <span className="w-1.5 h-1.5 bg-[#31A24C] rounded-full"></span>
              Why Choose Us
            </div>

            {/* Main Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051720] tracking-tight leading-[1.15]">
              Expert driven solar solutions built for efficiency & trust
            </h2>

            {/* Subheading Description */}
            <p className="text-gray-500 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
              We are committed to delivering reliable, high-quality solar
              solutions you can trust. With expert guidance, advanced
              technology, and end-to-end support.
            </p>

            {/* Highlighted Partner Feature Card */}
            <div className="relative bg-[#F4F7F9] rounded-2xl p-5 sm:p-6 border-l-4 border-[#31A24C] flex gap-4 items-start shadow-sm">
              <div className="shrink-0 w-12 h-12 rounded-full bg-[#051720] text-white flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.864 16.5a4.5 4.5 0 005.322-.024m0 0a4.5 4.5 0 005.322-6.104m-5.322 6.128a4.5 4.5 0 01-5.322-6.128m5.322 6.128v4.5m0-9.75a4.5 4.5 0 00-.001 9.001M12 3v3.75m0 9.75V21m0-12a3 3 0 110-6 3 3 0 010 6z"
                  />
                </svg>
              </div>
              <div className="space-y-1">
                <h4 className="text-base sm:text-lg font-bold text-[#051720]">
                  Trusted Clean Energy Partner
                </h4>
                <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                  We deliver reliable solar solutions through expert planning,
                  quality installations, and ongoing support.
                </p>
              </div>
            </div>

            {/* Statistics */}
            <div className="border-t border-b border-gray-100 py-6 my-8">
              <div className="grid grid-cols-3 gap-4 sm:gap-6 text-left">
                <div>
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#051720] tracking-tight">
                    1K+
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-400 font-medium mt-1">
                    Solar Installations
                  </p>
                </div>
                <div className="border-l border-gray-200 pl-4 sm:pl-6">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#051720] tracking-tight">
                    15MW+
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-400 font-medium mt-1">
                    Energy Generated
                  </p>
                </div>
                <div className="border-l border-gray-200 pl-4 sm:pl-6">
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#051720] tracking-tight">
                    25+
                  </h3>
                  <p className="text-[11px] sm:text-xs text-gray-400 font-medium mt-1">
                    Solar System Lifespan
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2">
              <button className="inline-flex items-center gap-2 bg-[#44B549] hover:bg-[#399d3e] transition-colors text-white font-semibold text-sm px-6 py-3.5 rounded-lg shadow-sm">
                Learn More
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: IMAGES */}
          <div className="lg:col-span-6 w-full space-y-4">
            {/* Large Top Image */}
            <div className="relative w-full aspect-[2.1/1] rounded-3xl sm:rounded-4xl overflow-hidden shadow-sm bg-gray-100">
              <Image
                src="/images/home/why-choose-us-image-2.jpg"
                alt="Expert solar engineers team installing panels on rooftop"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              {/* Image Labels */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 z-10">
                {[
                  "Solar Systems",
                  "Green Energy",
                  "Residential Solar",
                  "Solar Installation",
                ].map((label, idx) => (
                  <span
                    key={idx}
                    className={`text-[9px] sm:text-[11px] font-medium text-white px-2.5 py-1 rounded-md backdrop-blur-md bg-black/30 whitespace-nowrap ${
                      idx > 1 ? "hidden sm:inline-block" : ""
                    }`}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Split Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Engineer Image */}
              <div className="relative w-full aspect-[1.15/1] sm:aspect-[0.9/1] rounded-3xl sm:rounded-4xl overflow-hidden shadow-sm bg-gray-100">
                <Image
                  src="/images/home/why-choose-us-image-2.jpg"
                  alt="Solar engineer inspecting photovoltaic panels"
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover"
                />
              </div>

              {/* Green Support Card */}
              <div className="w-full aspect-[1.15/1] sm:aspect-[0.9/1] bg-[#44B549] text-white p-6 sm:p-8 rounded-3xl sm:rounded-4xl shadow-sm flex flex-col justify-end relative overflow-hidden group">
                <div className="absolute top-6 left-6 w-20 h-20 sm:w-24 sm:h-24 opacity-95 transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src="/images/home/why-choose-info-image.png"
                    alt="Solar engineer inspecting photovoltaic panels"
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2 sm:space-y-3 z-10">
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                    Long Term Support
                  </h3>
                  <div className="w-full h-px bg-white/20 my-1 sm:my-2" />
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
                    We provide dependable after-sales support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Services & CTA */}
      <div className="w-full mx-auto px-4 py-8 bg-white">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group flex items-center gap-2 bg-white hover:bg-gray-50 transition-all duration-200 px-5 py-3 rounded-3xl shadow-sm border border-gray-800 hover:shadow-md cursor-pointer active:scale-95"
            >
              <div className="w-3 h-3 bg-emerald-500 rounded-full shrink-0 group-hover:animate-pulse" />
              <span className="text-sm font-medium text-gray-800 whitespace-nowrap">
                {service}
              </span>
            </div>
          ))}
        </div>


        {/* Contact CTA */}
        <div className="bg-white rounded-3xl shadow-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center gap-5 max-w-2xl mx-auto">
          <div className="relative shrink-0">
            <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md">
              <Image
                src="/images/home/author-1.jpg"
                alt="Solar energy consultant"
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 rounded-2xl flex items-center justify-center shadow-md border-2 border-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M3 5a2 2 0 012-2 2 2 0 01-2-2 2 2 0 01-2-2 2 2 0 012-2 2 2 0 01-2-2 2 2 0 012-2zM21 15l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
          </div>

          <div className="flex-1">
            <p className="text-lg md:text-xl font-medium text-gray-800 leading-tight">
              Let&apos;s make something great work together.
            </p>
            <a
              href="#"
              className="inline-block mt-3 text-emerald-600 hover:text-emerald-700 font-semibold underline underline-offset-4 decoration-2 decoration-emerald-300 hover:decoration-emerald-500 transition-colors text-base"
            >
              Get Free Quote
            </a>
          </div>

          <button className="mt-4 md:mt-0 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 transition-colors text-white font-semibold rounded-3xl text-sm whitespace-nowrap flex items-center gap-2 shadow-lg shadow-emerald-500/30 active:scale-95">
            Contact Us
            <span className="text-xl leading-none">→</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default WhyChooseUs;
