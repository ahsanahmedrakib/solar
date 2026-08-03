"use client";

import Reveal from "@/components/Common/Reveal";
import RevealImage from "@/components/Common/RevealImage";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";

function RotatingBadge() {
  const pathId = useId();

  return (
    <div className="absolute top-6 right-4 sm:right-8 z-30 w-28 h-28 sm:w-32 sm:h-32 hidden sm:block select-none">
      <div className="w-full h-full relative animate-[spin_18s_linear_infinite]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <path
              id={pathId}
              d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
              fill="none"
            />
          </defs>
          <circle cx="50" cy="50" r="48" className="fill-forest-700/90" />
          <text className="text-[8.5px] font-bold fill-white tracking-[2.4px] uppercase">
            <textPath
              href={`#${pathId}`}
              startOffset="0"
              textAnchor="start"
              textLength={239}
              lengthAdjust="spacingAndGlyphs"
            >
              Ahead Solar Ltd&nbsp;&bull;&nbsp;Sunshine To Electricity&nbsp;&bull;&nbsp;
            </textPath>
          </text>
        </svg>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-accent-600 text-white flex items-center justify-center shadow-lg border-2 border-white/10">
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
              d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  const pathname = usePathname();

  return (
    <section className="bg-white py-20 lg:py-25 font-sans relative">
      {/* Main Grid Wrapper */}
      <div className="solar-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* ================= LEFT COLUMN: IMAGES & STATS ================= */}
        {/* Container aspect ratio shifted to 1.08/1 to slightly reduce the overall height */}
        <div className="relative w-full max-w-135 mx-auto aspect-[0.92/1] lg:col-span-6 order-2 lg:order-1 mt-12 lg:mt-0 select-none">
          {/* Rotating "Contact Us" Badge */}
          <RotatingBadge />

          {/* 1. Top Left Image (Office / Turbine Team) */}
          <RevealImage className="absolute top-0 left-0 w-[70%] h-[64%] rounded-xl overflow-hidden shadow-sm">
            <Image
              src="/images/aheadsolar/about-1.jpg"
              alt="Team discussing clean energy"
              fill
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="object-cover"
              priority
            />
          </RevealImage>

          {/* 3. Bottom Left Experience Card */}
          <Reveal
            variant="fade-up"
            delay={200}
            className="absolute bottom-0 left-0 w-[42%] aspect-[1/.85] flex flex-col justify-center items-center bg-forest-700 text-white p-4 rounded-lg shadow-md text-center z-20"
          >
            <div className="animate-float flex flex-col items-center">
              <h3 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-1 text-white">
                16+
              </h3>
              <p className="text-xs sm:text-sm text-white/70 font-semibold leading-snug">
                Years In
                <br />
                Solar Business
              </p>
            </div>
          </Reveal>

          {/* 4. Right Big Image (Engineers Walking) */}
          <RevealImage
            delay={150}
            className="absolute bottom-0 right-0 w-[56%] h-[74%] rounded-xl overflow-hidden shadow-2xl border-4 sm:border-8 border-white z-10"
          >
            <Image
              src="/images/aheadsolar/about-2.jpg"
              alt="Engineers walking on site"
              fill
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="object-cover"
            />
          </RevealImage>
        </div>

        {/* ================= RIGHT COLUMN: CONTENT ================= */}
        <div className="lg:col-span-6 lg:pl-10 space-y-6 order-1 lg:order-2">
          {/* Section Subtitle Badge */}
          <Reveal variant="fade-up" delay={0}>
            <span className="section-eyebrow">About Ahead Solar Ltd.</span>
          </Reveal>

          {/* Main Title Heading */}
          <Reveal variant="fade-up" delay={100}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold text-accent-500 tracking-tight leading-[1.1]">
              Pioneering Bangladesh&apos;s energy revolution
            </h2>
          </Reveal>

          {/* Paragraph Text */}
          <Reveal variant="fade-up" delay={180}>
            <p className="text-[#888888] text-sm sm:text-base font-normal leading-relaxed max-w-xl">
              At Ahead Solar Ltd., we are pioneering Bangladesh&apos;s energy
              revolution. We specialize in advanced commercial and industrial
              energy storage solutions, primarily focusing on Rooftop Solar and
              BESS (Battery Energy Storage System) fusion systems. Driven by our
              mission to replace all diesel generators with our solar and
              storage fusion systems, we are dedicated to creating profits and
              giving back to society with sunshine.
            </p>
          </Reveal>

          <hr className="border-gray-100 my-6" />

          {/* Features Block with Mini Image Grid alignment */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Core Features List */}
            <div className="sm:col-span-7 space-y-6">
              {/* Feature Item 1 */}
              <Reveal variant="fade-up" delay={100}>
                <div className="flex gap-4 items-start group">
                  <div className="shrink-0 w-12 h-12 rounded-[18px] bg-accent-500 text-accent-500 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="#fff"
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
                    <h4 className="font-heading text-lg font-bold text-accent-500 mb-1">
                      R&D Driven Approach
                    </h4>
                    <p className="text-xs sm:text-sm text-[#888888] leading-normal text-justify">
                      We are the only solar company focused on research and
                      development to continuously improve system performance and
                      adapt to evolving technology.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Feature Item 2 */}
              <Reveal variant="fade-up" delay={200}>
                <div className="flex gap-4 items-start group">
                  <div className="shrink-0 w-12 h-12 rounded-[18px] bg-accent-500 text-accent-500 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="#fff"
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
                    <h4 className="font-heading text-lg font-bold text-accent-500 mb-1">
                      Five Milestone Firsts
                    </h4>
                    <p className="text-xs sm:text-sm text-[#888888] leading-normal text-justify">
                      As an industry leader, we have achieved five milestone
                      &quot;firsts,&quot; including Bangladesh&apos;s first
                      MW-Scale Energy Storage Project and the country&apos;s
                      first BESS Assembly plant.
                    </p>
                  </div>
                </div>
              </Reveal>

              {/* Feature Item 3 */}
              <Reveal variant="fade-up" delay={300}>
                <div className="flex gap-4 items-start group">
                  <div className="shrink-0 w-12 h-12 rounded-[18px] bg-accent-500 text-accent-500 flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="#fff"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-heading text-lg font-bold text-accent-500 mb-1">
                      First Solar 3-Wheeler Approval
                    </h4>
                    <p className="text-xs sm:text-sm text-[#888888] leading-normal text-justify">
                      In the realm of sustainable mobility, we secured
                      Bangladesh&apos;s first Solar 3-wheeler approval from the
                      DNCC.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Inset Photo (Solar Panels Installation) */}
            <RevealImage
              delay={150}
              className="sm:col-span-5 relative w-full aspect-4/3 sm:aspect-square rounded-lg overflow-hidden shadow-sm bg-gray-100"
            >
              <Image
                src="/images/aheadsolar/about-3.jpg"
                alt="Solar fields installation"
                fill
                sizes="(max-width: 640px) 100vw, 20vw"
                className="object-cover"
              />
            </RevealImage>
          </div>

          {/* Bottom Action Footer Container */}
          {pathname !== "/about" && (
            <Reveal variant="fade-up" delay={150}>
              <div className="pt-4 flex flex-row flex-wrap items-center gap-6">
                {/* CTA Button */}
                <Link href="/about" className="btn-brand group">
                  More About Us
                  <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Link>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

