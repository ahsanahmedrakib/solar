"use client";

import Image from "next/image";
import { useState } from "react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
}

const initialTeamMembers: TeamMember[] = [
  {
    name: "Leslie Alexander",
    role: "Lead Solar Engineer",
    image: "/images/about/team-image-1.jpg",
  },
  {
    name: "Marvin McKinney",
    role: "Lead Solar Engineer",
    image: "/images/about/team-image-2.jpg",
  },
  {
    name: "Kathryn Murphy",
    role: "Lead Solar Engineer",
    image: "/images/about/team-image-3.jpg",
  },
];

export default function Teams() {
  const [teamMembers] = useState<TeamMember[]>(() => {
    try {
      const stored =
        typeof window !== "undefined"
          ? localStorage.getItem("admin_team")
          : null;
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed as TeamMember[];
        }
      }
    } catch (e) {
      console.error("Error loading team members", e);
    }
    return initialTeamMembers;
  });
  return (
    <section className="relative w-full bg-white px-4 py-12 md:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER SEPARATOR GRID ================= */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12 items-end mb-16">
          {/* Left Heading Side */}
          <div className="lg:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#f4f7fa] px-3 py-1 text-xs font-semibold text-gray-700 border border-gray-100">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
              Our Expert Team
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-[#0B2545] sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              Skilled professional powering your clean energy future
              <span className="text-green-500">.</span>
            </h2>
          </div>

          {/* Right Paragraph & CTA Side */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <p className="text-sm leading-relaxed text-gray-500 sm:text-base">
              Our team of experienced engineers, technicians, and energy
              specialists work together to design, install, and maintain solar
              systems.
            </p>
            <div>
              <button className="inline-flex items-center gap-2 rounded-lg bg-[#4CAF50] px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#43a047]">
                View All Members
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
            </div>
          </div>
        </div>

        {/* ================= TEAM CARDS GRID ================= */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group flex flex-col overflow-hidden rounded-3xl bg-[#f4f7fa] transition-all duration-300 hover:shadow-md"
            >
              {/* Profile Image Container */}
              <div className="relative aspect-4/3 w-full overflow-hidden p-4 pb-0">
                <div className="relative h-full w-full overflow-hidden rounded-2xl">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    unoptimized
                    sizes="(max-w-7xl) 100vw, (max-w-md) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </div>

              {/* Text Meta Content Area */}
              <div className="flex flex-col items-center text-center px-6 py-8">
                <h3 className="text-xl font-bold text-[#0B2545]">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-gray-400 font-medium">
                  {member.role}
                </p>

                {/* Social Share Icons Footer */}
                <div className="mt-6 flex items-center gap-3 border-t border-gray-200/60 pt-6 w-full justify-center">
                  {/* Pinterest Placeholder */}
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 bg-white transition-colors hover:text-red-600 hover:border-red-200"
                  >
                    <span className="text-xs font-serif font-bold">P</span>
                  </a>
                  {/* X / Twitter Placeholder */}
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 bg-white transition-colors hover:text-black hover:border-black"
                  >
                    <span className="text-xs font-bold font-mono">X</span>
                  </a>
                  {/* Facebook Placeholder */}
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 bg-white transition-colors hover:text-blue-600 hover:border-blue-200"
                  >
                    <span className="text-xs font-bold">f</span>
                  </a>
                  {/* Instagram Placeholder */}
                  <a
                    href="#"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 bg-white transition-colors hover:text-pink-600 hover:border-pink-200"
                  >
                    <span className="text-xs font-bold">📷</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
