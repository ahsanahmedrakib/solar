import Image from "next/image";
import React from "react";

interface StatFact {
  metric: string;
  label: string;
  icon: React.ReactNode;
}

export default function FunFacts() {
  const facts: StatFact[] = [
    {
      metric: "52 MWp",
      label: "Largest Rooftop Solar Project",
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
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      ),
    },
    {
      metric: "30 GWh",
      label: "Green Energy Generated Per Year",
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
            d="M12 3v18M6.343 18.364l11.314-11.314M18.364 18.364L6.343 7.029"
          />
        </svg>
      ),
    },
    {
      metric: "16+",
      label: "Years In Solar Business",
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
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
    {
      metric: "100%",
      label: "Commitment to Clean Energy",
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
            d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:py-24 lg:px-20 mx-auto font-sans overflow-x-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* ========================================================================= */}
        {/* LEFT COLUMN: HEADERS AND METRIC PANEL BLOCK                               */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 space-y-6 lg:pr-6">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F3F4F6] px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700">
            <span className="w-1.5 h-1.5 bg-[#44B549] rounded-full"></span>
            Our Fun Facts
          </div>

          {/* Main Section Header Title */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051720] tracking-tight leading-[1.15]">
            Driving Bangladesh&apos;s solar energy transformation
          </h2>

          {/* Descriptive Context Paragraph */}
          <p className="text-gray-500 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
            Our track record reflects the trust of Bangladesh&apos;s top
            industrial groups and the measurable impact we create through
            large-scale rooftop solar deployments.
          </p>

          {/* Subdivided Stats Dashboard Box */}
          <div className="bg-[#F3F7F9] rounded-xl p-6 sm:p-8 border border-gray-100/50 mt-8">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 relative">
              {/* Decorative cross lines matching image layout structure */}
              <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-200/60 transform -translate-y-1/2 hidden sm:block" />
              <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-200/60 transform -translate-x-1/2 hidden sm:block" />

              {facts?.map((fact, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center p-2 sm:p-4 space-y-3 ${
                    index % 2 !== 0 ? "sm:pl-6" : "sm:pr-6"
                  }`}
                >
                  {/* Glowing Icon Circular Container */}
                  <div className="w-11 h-11 rounded-full bg-[#44B549] text-white flex items-center justify-center shadow-sm">
                    {fact.icon}
                  </div>

                  {/* Fact Value Representation */}
                  <div className="space-y-1">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#051720] tracking-tight">
                      {fact.metric}
                    </h3>
                    <p className="text-[11px] sm:text-xs font-semibold text-gray-400 leading-normal max-w-35 mx-auto">
                      {fact.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: LARGE TEAM FIELD WORK IMAGE MASK                            */}
        {/* ========================================================================= */}
        <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
          <Image
            src="/images/home/our-fun-fact-image.jpg"
            alt="Engineers review solar tablet installation data"
            width={1200}
            height={900}
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="w-full h-auto rounded-xl shadow-sm"
            priority
          />
        </div>
      </div>
    </section>
  );
}
