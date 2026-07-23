"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function About() {
  const pathname = usePathname();

  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:py-20 lg:px-18 mx-auto font-sans relative">
      {/* Main Grid Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* ================= LEFT COLUMN: IMAGES & STATS ================= */}
        {/* Container aspect ratio shifted to 1.08/1 to slightly reduce the overall height */}
        <div className="relative w-full max-w-135 mx-auto aspect-[0.92/1] lg:col-span-6 order-2 lg:order-1 mt-12 lg:mt-0 select-none">
          {/* 1. Top Left Image (Office / Turbine Team) */}
          <div className="absolute top-0 left-0 w-[70%] h-[64%] rounded-xl overflow-hidden shadow-sm ">
            <Image
              src="/images/home/about-us-image-1.jpg"
              alt="Team discussing clean energy"
              fill
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="object-cover"
              priority
            />
          </div>

          {/* 2. Rotating "Contact Us" Badge
          {/* Positioned accurately to the top right of the composition */}
          {/* <div className="absolute top-4 right-5 z-30 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 animate-[spin_25s_linear_infinite] origin-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                id="contactBadgePath"
                d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                className="fill-none"
              /> */}
          {/* Dark Navy Inner Center Circle */}
          {/* <circle cx="50" cy="50" r="16" className="fill-[#051720]" /> */}
          {/* White Lightning Bolt Vector Icon */}
          {/* <path
                d="M49 38L43 49H49L48 58L57 45H49L52 38H49Z"
                className="fill-green stroke-white"
                strokeWidth="1"
                strokeLinejoin="round"
              /> */}
          {/* Bright Green Text Ring */}
          {/* <text className="text-[9.5px] font-extrabold fill-accent-600 tracking-[2.2px]">
                <textPath href="#contactBadgePath">
                  * Contact Us * Contact Us * Contact Us{" "}
                </textPath>
              </text>
            </svg> */}
          {/* </div> */}

          {/* 3. Bottom Left Experience Card */}
          {/* Aligned natively underneath the left edge of the top image */}
          <div className="absolute bottom-0 left-0 w-[42%] aspect-[1/.85] flex flex-col justify-center items-center bg-[#03141F] text-white p-4 rounded-xl shadow-md text-center z-20">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-1 text-white">
              16+
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-semibold leading-snug">
              Years In
              <br />
              Solar Business
            </p>
          </div>

          {/* 4. Right Big Image (Engineers Walking) */}
          {/* Elevated with thick white borders to emphasize the clean overlap cut layer */}
          <div className="absolute bottom-0 right-0 w-[56%] h-[74%] rounded-xl overflow-hidden shadow-2xl border-4 sm:border-8 border-white z-10">
            <Image
              src="/images/home/about-us-image-2.jpg"
              alt="Engineers walking on site"
              fill
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* ================= RIGHT COLUMN: CONTENT ================= */}
        <div className="lg:col-span-6 lg:pl-10 space-y-6 order-1 lg:order-2">
          {/* Section Subtitle Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F3F4F6] px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700">
            <span className="w-1.5 h-1.5 bg-[#31A24C] rounded-full"></span>
            About Our Company
          </div>

          {/* Main Title Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051720] tracking-tight leading-[1.15]">
            Pioneering large-scale rooftop solar solutions
          </h2>

          {/* Paragraph Text */}
          <p className="text-gray-500 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
            We are a vertically integrated solar energy company specializing in
            industrial and commercial rooftop projects. Our team combines
            world-class engineering with deep local expertise to deliver
            reliable, high-performance solar systems — from design through
            long-term operation.
          </p>

          <hr className="border-gray-100 my-6" />

          {/* Features Block with Mini Image Grid alignment */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Core Features List */}
            <div className="sm:col-span-7 space-y-6">
              {/* Feature Item 1 */}
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-11 h-11 rounded-full bg-[#31A24C] text-white flex items-center justify-center shadow-sm">
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
                      d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0 1 12 15a9.065 9.065 0 0 0-6.23.693L5 14.5m14.8.8 1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0 1 12 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#051720] mb-1">
                    R&D Driven Approach
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-normal">
                    We are the only solar company focused on research and
                    development to continuously improve system performance and
                    adapt to evolving technology.
                  </p>
                </div>
              </div>

              {/* Feature Item 2 */}
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-11 h-11 rounded-full bg-[#31A24C] text-white flex items-center justify-center shadow-sm">
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
                      d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21h.75a.75.75 0 0 0 .75-.75V9.375m0 0A2.25 2.25 0 0 1 9.375 7.125h5.25a2.25 2.25 0 0 1 2.25 2.25v6.375m-10.5 0V5.625a2.25 2.25 0 0 1 2.25-2.25h5.25a2.25 2.25 0 0 1 2.25 2.25v13.125"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#051720] mb-1">
                    Vertically Integrated Solutions
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-normal">
                    From supply chain and project scheduling to manufacturing,
                    installation, and after-sales service — all functions are
                    integrated for complete project delivery.
                  </p>
                </div>
              </div>
            </div>

            {/* Inset Photo (Solar Panels Installation) */}
            <div className="sm:col-span-5 relative w-full aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden shadow-sm bg-gray-100">
              <Image
                src="/images/home/about-us-body-image.jpg"
                alt="Solar fields installation"
                fill
                sizes="(max-width: 640px) 100vw, 20vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Bottom Action Footer Container */}
          {pathname !== "/about" && (
            <div className="pt-4 flex flex-row flex-wrap items-center gap-6">
              {/* CTA Button */}
              <Link href="/about">
                <button className="inline-flex items-center cursor-pointer gap-2 bg-accent-600 hover:bg-[#399d3e] transition-colors text-white font-semibold text-sm px-6 py-3.5 rounded-lg shadow-sm group">
                  More About Us
                  <ArrowUpRight />
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
