import Image from "next/image";

export default function WhatWeDo() {
  return (
    <section className="relative w-full overflow-hidden bg-[#fafbfc] px-4 py-12 md:px-8 lg:px-16 lg:py-24">
      {/* Floating Sticky Sidebar mockup from the original design */}
      <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col gap-2 rounded-l-md border border-r-0 border-gray-200 bg-white p-2 shadow-sm md:flex">
        <button className="p-2 text-gray-600 hover:text-green-600">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>
        <button className="p-2 text-gray-600 hover:text-green-600">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16 items-start">
          {/* ================= LEFT COLUMN ================= */}
          <div className="space-y-8 lg:col-span-6">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                What We Do
              </span>

              {/* Main Heading */}
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B2545] sm:text-4xl lg:text-5xl lg:leading-[1.15]">
                Complete solar services built for performance
              </h2>
            </div>

            {/* Subtitle */}
            <p className="text-sm leading-relaxed text-gray-500 sm:text-base max-w-xl">
              Our team provides end-to-end solar solutions including site
              assessment, custom system design, professional installation, and
              ongoing maintenance.
            </p>

            {/* Video Preview Container with Play Button Overlay */}
            <div className="relative group w-full h-60 sm:h-85 overflow-hidden rounded-2xl shadow-md">
              <Image
                src="/images/about/what-we-do-video-image.jpg"
                alt="Engineers looking at a laptop in front of wind turbines"
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-102"
              />
            </div>
          </div>

          {/* ================= RIGHT COLUMN ================= */}
          <div className="space-y-8 lg:col-span-6 lg:mt-4">
            {/* Upper Right Feature Image */}
            <div className="relative w-full h-60 sm:h-85 overflow-hidden rounded-2xl shadow-md">
              <Image
                src="/images/about/what-we-do-body-image.jpg"
                alt="Workers installing solar panels on a rooftop"
                fill
                priority
                className="object-cover"
              />
            </div>

            {/* Info Box & Reviews Breakdown Row */}
            <div className="border-b border-gray-200 pb-8 grid grid-cols-1 gap-6 sm:grid-cols-12 items-center">
              {/* Feature Content */}
              <div className="flex items-start gap-4 sm:col-span-8">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#4CAF50] text-white shadow-sm">
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
                  <h4 className="text-base font-bold text-[#0B2545]">
                    Complete Solar Solutions
                  </h4>
                  <p className="mt-1 text-sm text-gray-500 leading-normal">
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
                  <span className="text-2xl font-bold tracking-tight text-[#0B2545]">
                    4.9
                  </span>
                  <span className="text-xs font-semibold text-gray-400">
                    /5.0
                  </span>
                  <span className="ml-1 text-emerald-500">★</span>
                </div>
                <p className="text-xs font-medium text-gray-500 leading-tight">
                  Average Website Ratings
                </p>
              </div>
            </div>

            {/* CTA Button */}
            {/* <div>
              <button className="inline-flex items-center gap-2 rounded-lg bg-[#4CAF50] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#43a047] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">
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
