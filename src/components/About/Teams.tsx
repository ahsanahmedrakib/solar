"use client";

import { DEFAULT_TEAM, type TeamMember } from "@/data/team";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const SOCIAL_ICONS = {
  facebook: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
      fill="#1877F2"
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  instagram: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#E4405F"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  ),
  x: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
      fill="#000000"
    >
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.847h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.806l5.38 7.12 6.715-7.12zM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644z" />
    </svg>
  ),
  linkedin: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="200"
      height="200"
      viewBox="0 0 24 24"
      fill="#0A66C2"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.351V9.358h3.414v1.513h.048c.475-.9 1.633-1.85 3.36-1.85 3.593 0 4.256 2.363 4.256 5.437v5.994zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9.358h3.564v11.094zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
    </svg>
  ),
} as const;

export default function Teams() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(DEFAULT_TEAM);

  useEffect(() => {
    async function loadTeam() {
      try {
        const res = await fetch("/api/team");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setTeamMembers(json.data);
        }
      } catch (error) {
        console.error("Failed to load team members", error);
      }
    }
    loadTeam();
  }, []);
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

                {member.socialLinks && (
                  <div className="mt-6 flex items-center gap-3 border-t border-gray-200/60 pt-6 w-full justify-center">
                    {(
                      Object.keys(SOCIAL_ICONS) as Array<
                        keyof typeof SOCIAL_ICONS
                      >
                    ).map((platform) => {
                      const url = member.socialLinks?.[platform];
                      if (!url) return null;
                      return (
                        <Link
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 text-gray-400 bg-white transition-colors`}
                        >
                          {SOCIAL_ICONS[platform]}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
