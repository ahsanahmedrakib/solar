import Image from "next/image";
import React from "react";

interface StepItem {
  numberPosition: "left" | "center" | "right";
  title: string;
  description: string;
  bulletPoint: string;
  imageSrc: string;
  imageAlt: string;
  icon: React.ReactNode;
}

export default function HowItWorks() {
  const steps: StepItem[] = [
    {
      numberPosition: "left",
      title: "Site Assessment & Financial Modeling",
      description:
        "We evaluate your roof structure, energy consumption patterns, and design a system optimized for maximum savings.",
      bulletPoint: "Free technical and financial assessment",
      imageSrc: "/images/home/how-it-work-image-1.jpg",
      imageAlt: "Solar engineers assessing a site installation",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25A2.25 2.25 0 0 1 13.5 8V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z"
          />
        </svg>
      ),
    },
    {
      numberPosition: "center",
      title: "Engineering & Installation",
      description:
        "Our certified team handles system design, permitting, and professional installation with minimal disruption to your operations.",
      bulletPoint: "Certified engineers and technicians",
      imageSrc: "/images/home/how-it-work-image-2.jpg",
      imageAlt: "Engineers holding a clipboard near solar arrays",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m6.49 12 4.756 4.757L20 8M4 8l4.757 4.757M4 16l4.757-4.757"
          />
        </svg>
      ),
    },
    {
      numberPosition: "right",
      title: "Commissioning & 24/7 Monitoring",
      description:
        "Once operational, your system starts generating clean energy immediately with real-time performance monitoring.",
      bulletPoint: "24/7 remote plant monitoring",
      imageSrc: "/images/home/how-it-work-image-3.jpg",
      imageAlt: "Technicians analyzing performance data metrics on a tablet",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1-1.622-3.39m3.39 3.39a15.993 15.993 0 0 0 3.39-1.622m-3.39 3.39a15.997 15.997 0 0 0 1.62-3.387m10.126-5.043a3 3 0 1 1-5.78-1.128 2.25 2.25 0 0 0-2.4-2.245 4.5 4.5 0 0 1 8.4 2.245c0 .399-.078.78-.22 1.128Zm0 0a15.997 15.997 0 0 1-3.387 1.62M19.126 7.8a15.996 15.996 0 0 0-1.622-3.39m3.39 3.39a15.996 15.996 0 0 1-3.39 1.622m3.39-1.622a15.993 15.993 0 0 1-1.62 3.387M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
          />
        </svg>
      ),
    },
  ];

  return (
    <section
      className="bg-[#03141F] text-white py-16 px-4 sm:px-6 lg:py-24 lg:px-8 font-sans relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}
    >
      {/* Decorative subtle ambient backdrop glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#399d3e]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24">
        {/* ========================================================================= */}
        {/* TOP HEADER GRID LAYOUT                                                    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-4">
            {/* Tagline Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full text-xs font-semibold text-gray-300">
              <span className="w-1.5 h-1.5 bg-accent-600 rounded-full"></span>
              How It Works
            </div>
            {/* Header Main Text */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15] text-white">
              From assessment to energy savings in three steps
            </h2>
          </div>

          {/* Header Right Paragraph and CTA Button */}
          <div className="lg:col-span-5 space-y-5 lg:pl-4">
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              From initial site assessment and system design to professional
              installation and ongoing monitoring — our streamlined process
              ensures your rooftop solar project delivers maximum returns.
            </p>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE THREE-COLUMN STEPS VIEWPORTS                                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 pt-8">
          {steps?.map((step, idx) => (
            <div
              key={idx}
              className={`flex flex-col items-center text-center space-y-6 max-w-sm mx-auto ${
                step.numberPosition === "center" ? "lg:translate-y-12" : ""
              }`}
            >
              {/* IMAGE ELEMENT BLOCK WITH FLOATING ICON INTERACTION */}
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden p-1 bg-linear-to-b from-white/10 to-transparent shadow-xl">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-[#0A2233]">
                  <Image
                    src={step.imageSrc}
                    alt={step.imageAlt}
                    fill
                    sizes="(max-width: 768px) 100vw, 30vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                  {/* Absolute Centered Accent Overlay Overlay */}
                  <div className="absolute inset-0 bg-[#03141F]/10 mix-blend-multiply" />
                </div>

                {/* Floating Centered Accent Badge Layer */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-accent-600 text-white flex items-center justify-center shadow-md border-2 border-[#03141F] z-10">
                  {step.icon}
                </div>
              </div>

              {/* TEXT CONTENT DESCRIPTION MODULE */}
              <div className="space-y-3 px-2">
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 font-medium leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>

              {/* MICRO GREEN ACCENT LIST FOOTER DOT */}
              <div className="pt-2 border-t border-white/5 w-full max-w-60 flex justify-center">
                <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-gray-300 font-medium tracking-wide">
                  <span className="w-1.5 h-1.5 bg-accent-600 rounded-full shrink-0"></span>
                  <span>{step.bulletPoint}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
