import Reveal from "@/components/Common/Reveal";
import RevealImage from "@/components/Common/RevealImage";
import Image from "next/image";

export default function WhatWeDo() {
  return (
    <section className="relative w-full overflow-hidden bg-secondary px-4 py-12 md:px-8 lg:px-16 lg:py-25">
      <div className="solar-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* ================= LEFT COLUMN ================= */}
          <div className="space-y-8 lg:col-span-6">
            <div>
              {/* Badge */}
              <Reveal variant="fade-up">
                <span className="section-eyebrow">What We Do</span>
              </Reveal>

              {/* Main Heading */}
              <Reveal variant="fade-up" delay={100}>
                <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-accent-500 sm:text-4xl lg:text-[52px] lg:leading-[1.1]">
                  Complete solar services built for performance
                </h2>
              </Reveal>
            </div>

            {/* Subtitle */}
            <Reveal variant="fade-up" delay={200}>
              <p className="text-sm leading-relaxed text-[#888888] sm:text-base max-w-xl">
                Our team provides end-to-end solar solutions including site
                assessment, custom system design, professional installation, and
                ongoing maintenance.
              </p>
            </Reveal>

            {/* Video Preview Container with Play Button Overlay */}
            <RevealImage
              delay={250}
              className="relative w-full h-60 sm:h-85 overflow-hidden rounded-lg shadow-md"
            >
              <Image
                src="/images/about/what-we-do-video-image.jpg"
                alt="Engineers looking at a laptop in front of wind turbines"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-102"
              />
            </RevealImage>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="space-y-8 lg:col-span-6 lg:mt-4">
            {/* Upper Right Feature Image */}
            <RevealImage
              delay={150}
              className="relative w-full h-60 sm:h-85 overflow-hidden rounded-lg shadow-md"
            >
              <Image
                src="/images/about/what-we-do-body-image.jpg"
                alt="Workers installing solar panels on a rooftop"
                fill
                priority
                className="object-cover"
              />
            </RevealImage>

            {/* Info Box & Reviews Breakdown Row */}
            <Reveal variant="fade-up" delay={220}>
              <div className="border-b border-gray-200 pb-8 grid grid-cols-1 gap-6 sm:grid-cols-12 items-center">
                {/* Feature Content */}
                <div className="flex items-start gap-4 sm:col-span-8">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-accent-500 text-white shadow-sm">
                    {/* Calendar / Project Icon */}
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-5 7h3m-3 4h3m-6-4h.01M9 16h.01"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-accent-500">
                      Complete Solar Solutions
                    </h4>
                    <p className="mt-1 text-sm text-[#888888] leading-normal">
                      We provide end-to-end solar services from site assessment
                      &amp; system design.
                    </p>
                  </div>
                </div>

                {/* Vertical divider line for larger viewports */}
                <div className="hidden sm:block h-12 w-px bg-gray-200 sm:col-span-1 justify-self-center"></div>

                {/* Rating metrics */}
                <div className="sm:col-span-3 space-y-1">
                  <div className="flex items-baseline gap-1">
                    <span className="font-heading text-2xl font-bold tracking-tight text-accent-500">
                      4.9
                    </span>
                    <span className="text-xs font-semibold text-[#888888]">
                      /5.0
                    </span>
                    <span className="ml-1 text-accent-500">★</span>
                  </div>
                  <p className="text-xs font-medium text-[#888888] leading-tight">
                    Average Website Ratings
                  </p>
                </div>
              </div>
            </Reveal>

            {/* CTA Button */}
            {/* <div>
              <button className="inline-flex items-center gap-2 rounded-lg bg-[#28CBC6] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#20a29e] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600">
                Learn More
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.5}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}

