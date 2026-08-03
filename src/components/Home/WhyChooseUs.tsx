import Reveal from "@/components/Common/Reveal";
import RevealImage from "@/components/Common/RevealImage";
import Image from "next/image";
import React from "react";

const WhyChooseUs: React.FC = () => {
  return (
    <>
      <section className="bg-white py-20 lg:py-25 font-sans overflow-x-hidden">
        <div className="solar-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          <div className="lg:col-span-6 space-y-6 lg:pr-6">
            {/* Tagline Badge */}
            <Reveal variant="fade-up">
              <span className="section-eyebrow">Why Choose Us</span>
            </Reveal>

            {/* Main Heading */}
            <Reveal variant="fade-up" delay={100}>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold text-accent-500 tracking-tight leading-[1.1]">
                One-stop rooftop solar solution provider for industries
              </h2>
            </Reveal>

            {/* Subheading Description */}
            <Reveal variant="fade-up" delay={180}>
              <p className="text-[#888888] text-sm sm:text-base font-normal leading-relaxed max-w-xl">
                We deliver complete solar solutions — from system design and
                engineering to installation and ongoing maintenance — backed by
                16+ years of experience serving Bangladesh&apos;s top industrial
                sectors.
              </p>
            </Reveal>

            {/* Highlighted Partner Feature Card */}
            <Reveal variant="fade-up" delay={240}>
              <div className="relative bg-secondary rounded-lg p-5 sm:p-6 border-l-4 border-accent-500 flex gap-4 items-start shadow-sm transition-all duration-500 hover:shadow-md group">
                <div className="shrink-0 w-12 h-12 rounded-[18px] bg-accent-500 text-accent-500 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="#fff"
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
                  <h4 className="font-heading text-base sm:text-lg font-bold text-accent-500">
                    Flexible CapEx & OpEx Models
                  </h4>
                  <p className="text-xs sm:text-sm text-[#888888] leading-relaxed">
                    Choose to own your system with our CapEx model or start
                    saving from day one with our OpEx model — we provide the
                    right financial and technical solution for every business.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Statistics */}
            <Reveal variant="fade-up" delay={200}>
              <div className="border-t border-b border-gray-100 py-6 my-8">
                <div className="grid grid-cols-3 gap-4 sm:gap-6 text-left">
                  <div>
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-accent-500 tracking-tight">
                      52MWp
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#888888] font-medium mt-1">
                      Largest Rooftop Project
                    </p>
                  </div>
                  <div className="border-l border-gray-200 pl-4 sm:pl-6">
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-accent-500 tracking-tight">
                      30GWh
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#888888] font-medium mt-1">
                      Green Energy Per Year
                    </p>
                  </div>
                  <div className="border-l border-gray-200 pl-4 sm:pl-6">
                    <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-accent-500 tracking-tight">
                      16+
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#888888] font-medium mt-1">
                      Years In Solar Business
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT COLUMN: IMAGES */}
          <div className="lg:col-span-6 w-full space-y-4">
            {/* Large Top Image */}
            <RevealImage className="relative w-full aspect-[2.1/1] rounded-lg overflow-hidden shadow-sm bg-gray-100">
              <Image
                src="/images/aheadsolar/why-1.jpg"
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
                ]?.map((label, idx) => (
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
            </RevealImage>

            {/* Bottom Split Images */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Engineer Image */}
              <RevealImage
                delay={120}
                className="relative w-full aspect-[1.15/1] sm:aspect-[0.9/1] rounded-lg overflow-hidden shadow-sm bg-gray-100"
              >
                <Image
                  src="/images/aheadsolar/why-2.jpg"
                  alt="Solar engineer inspecting photovoltaic panels"
                  fill
                  sizes="(max-width: 640px) 100vw, 25vw"
                  className="object-cover"
                />
              </RevealImage>

              {/* Green Support Card */}
              <Reveal
                variant="fade-up"
                delay={220}
                className="w-full aspect-[1.15/1] sm:aspect-[0.9/1] bg-accent-500 text-white p-6 sm:p-8 rounded-lg shadow-sm flex flex-col justify-end relative overflow-hidden group"
              >
                <div className="absolute top-6 left-6 w-20 h-20 sm:w-24 sm:h-24 md:w-30 md:h-30 opacity-95 transition-transform duration-500 group-hover:scale-110">
                  <Image
                    src="/images/home/why-choose-info-image.png"
                    alt="Solar engineer inspecting photovoltaic panels"
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>

                <div className="space-y-2 sm:space-y-3 z-10">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight">
                    24/7 Data Monitoring
                  </h3>
                  <div className="w-full h-px bg-forest-700/20 my-1 sm:my-2" />
                  <p className="text-xs sm:text-sm leading-relaxed">
                    Real-time monitoring and analysis of every solar plant to
                    ensure peak performance.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyChooseUs;

