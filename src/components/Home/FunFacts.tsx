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
      metric: "25+ Years",
      label: "Panel Performance Lifespan",
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
            d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
          />
        </svg>
      ),
    },
    {
      metric: "4800+",
      label: "Solar Powered Homes",
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
            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      metric: "10K+",
      label: "Trees Worth Of a CO₂",
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
      metric: "100%",
      label: "Commitment to Clean",
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
            Measurable success in solar energy solutions
          </h2>

          {/* Descriptive Context Paragraph */}
          <p className="text-gray-500 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
            Each figure represents the trust of our customers and the positive
            change we create through efficient, dependable, and clean energy
            systems.
          </p>

          {/* Subdivided Stats Dashboard Box */}
          <div className="bg-[#F3F7F9] rounded-[2rem] p-6 sm:p-8 border border-gray-100/50 mt-8">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 relative">
              {/* Decorative cross lines matching image layout structure */}
              <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gray-200/60 transform -translate-y-1/2 hidden sm:block" />
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-gray-200/60 transform -translate-x-1/2 hidden sm:block" />

              {facts.map((fact, index) => (
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
                    <p className="text-[11px] sm:text-xs font-semibold text-gray-400 leading-normal max-w-[140px] mx-auto">
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
            className="w-full h-auto rounded-[2rem] shadow-sm"
            priority
          />
        </div>
      </div>
    </section>
  );
}
