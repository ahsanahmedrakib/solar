import Image from "next/image";
import React from "react";

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function CoreFeatures() {
  const features: FeatureItem[] = [
    {
      id: "01.",
      title: "High Efficiency Solar Panels",
      description:
        "Advance solar panels design to capture max sunlight & deliver consistent",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499c.151-.312.56-.312.712 0l2.164 4.494 4.887.69c.346.049.484.484.223.73l-3.57 3.424.871 4.908c.06.342-.294.614-.593.444L12 15.918l-4.194 2.247a.75.75 0 01-1.096-.813l.872-4.908-3.57-3.424a.75.75 0 01.222-.73l4.888-.69 2.163-4.494z"
          />
        </svg>
      ),
    },
    {
      id: "02.",
      title: "Expert System Design",
      description:
        "Customized solar system layouts tailored property, energy usage, & future power.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-3m0 0a9.001 9.001 0 018.716 5.253M12 3a9.001 9.001 0 00-8.716 5.253M3.284 8.253l17.432 0M3.284 14.253h17.432"
          />
        </svg>
      ),
    },
    {
      id: "03.",
      title: "Certified Installation Team",
      description:
        "Installed by certified professionals who follow strict safety standards.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
          />
        </svg>
      ),
    },
    {
      id: "04.",
      title: "Smart Energy Monitoring",
      description:
        "Real-time system monitoring that allows you to track energy production usage.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125S3.75 12.653 3.75 10.375"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-[#FAFBFD] py-16 px-4 sm:px-6 lg:py-24 lg:px-8 font-sans overflow-x-hidden">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* ========================================================================= */}
        {/* TOP ROW: HEADERS AND CALL TO ACTION                                      */}
        {/* ========================================================================= */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
              <span className="w-1.5 h-1.5 bg-[#44B549] rounded-full"></span>
              Our Core Features
            </div>
            {/* Main Title Header */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051720] tracking-tight leading-[1.15]">
              Innovative solar feature with real environmental impact
            </h2>
          </div>

          {/* Top Description & Action Link */}
          <div className="flex flex-col sm:flex-row items-start lg:items-end gap-5 lg:max-w-md">
            <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
              Our core features are designed to maximize renewable energy
              production while reducing environmental impact and supporting a
              cleaner future.
            </p>
            <button className="inline-flex items-center gap-2 bg-[#44B549] hover:bg-[#399d3e] transition-colors text-white font-semibold text-sm px-6 py-3.5 rounded-lg shadow-sm whitespace-nowrap">
              Contact Us
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

        {/* ========================================================================= */}
        {/* MAIN BODY GRID: ENGINEER PHOTO AND RECTANGULAR FEATURES                  */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT AREA: MASKED ENGINEER WITH PANEL PHOTO */}
          <div className="lg:col-span-5">
            <Image
              src="/images/home/our-core-feature-image.png"
              alt="Solar engineer holding panel"
              width={800}
              height={900}
              className="w-full h-auto"
              priority
            />
          </div>
          {/* RIGHT AREA: 2X2 CONTENT CARDS GRID */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100/40 hover:shadow-md transition-shadow duration-300 flex flex-col justify-between relative overflow-hidden min-h-55"
              >
                {/* Upper row: Icon Badge & Custom Text Number */}
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-full bg-[#44B549] text-white flex items-center justify-center shadow-sm">
                    {feature.icon}
                  </div>
                  <span className="text-sm font-extrabold text-[#051720] tracking-wider">
                    {feature.id}
                  </span>
                </div>

                {/* Content text section */}
                <div className="mt-6 space-y-2">
                  <h3 className="text-lg sm:text-xl font-bold text-[#051720] tracking-tight">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
