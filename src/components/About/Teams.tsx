"use client";

import Reveal from "@/components/Common/Reveal";
import { DEFAULT_TEAM } from "@/data/team";
import { SOCIAL_ICONS } from "@/lib/const";
import { useQueryTeam } from "@/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";

export default function Teams() {
  const { data: rawTeam = [], isFetching: loading } = useQueryTeam();

  const teamMembers = useMemo(() => {
    if (rawTeam?.length > 0) return rawTeam;
    return DEFAULT_TEAM;
  }, [rawTeam]);
  return (
    <section className="relative w-full bg-white px-4 py-12 md:px-8 lg:px-16 lg:py-25">
      <div className="solar-container">
        {/* ================= HEADER SEPARATOR GRID ================= */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-12 items-end mb-16">
          {/* Left Heading Side */}
          <div className="lg:col-span-7 space-y-4">
            <Reveal variant="fade-up">
              <span className="section-eyebrow">Our Expert Team</span>
            </Reveal>
            <Reveal variant="fade-up" delay={100}>
              <h2 className="font-heading text-3xl font-bold tracking-tight text-accent-500 sm:text-4xl lg:text-[52px] lg:leading-[1.1]">
                Skilled professional powering your clean energy future
                <span className="text-accent-500">.</span>
              </h2>
            </Reveal>
          </div>

          {/* Right Paragraph & CTA Side */}
          <div className="lg:col-span-5 space-y-6 lg:pl-4">
            <Reveal variant="fade-up" delay={180}>
              <p className="text-sm leading-relaxed text-[#888888] sm:text-base">
                Our team of experienced engineers, technicians, and energy
                specialists work together to design, install, and maintain solar
                systems.
              </p>
            </Reveal>
          </div>
        </div>

        {/* ================= SKELETON LOADING ================= */}
        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 })?.map((_, index) => (
              <div
                key={index}
                className="flex flex-col overflow-hidden rounded-lg bg-white animate-pulse"
              >
                <div className="relative aspect-4/3 w-full overflow-hidden p-4 pb-0">
                  <div className="h-full w-full overflow-hidden rounded-lg bg-gray-200" />
                </div>
                <div className="flex flex-col items-center text-center px-6 py-8">
                  <div className="h-5 w-40 rounded-md bg-gray-200" />
                  <div className="mt-3 h-4 w-28 rounded-md bg-gray-200" />
                  <div className="mt-6 flex items-center gap-3 border-t border-gray-200/60 pt-6 w-full justify-center">
                    <div className="h-8 w-8 rounded-full bg-gray-200" />
                    <div className="h-8 w-8 rounded-full bg-gray-200" />
                    <div className="h-8 w-8 rounded-full bg-gray-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= TEAM CARDS GRID ================= */}
        {!loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers?.map((member, index) => (
              <Reveal
                key={index}
                variant="fade-up"
                delay={(index % 3) * 120}
                className="group flex flex-col overflow-hidden rounded-lg bg-white transition-all duration-300 hover:shadow-md"
              >
                {/* Profile Image Container */}
                <div className="relative aspect-4/3 w-full overflow-hidden p-4 pb-0">
                  <div className="relative h-full w-full overflow-hidden rounded-lg">
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
                  <h3 className="font-heading text-xl font-bold text-accent-500">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-sm text-[#888888] font-medium">
                    {member.role}
                  </p>

                  {member.socialLinks && (
                    <div className="mt-6 flex items-center gap-3 border-t border-forest-700/10 pt-6 w-full justify-center">
                      {(
                        Object.keys(SOCIAL_ICONS) as Array<
                          keyof typeof SOCIAL_ICONS
                        >
                      )?.map((platform) => {
                        const url = member.socialLinks?.[platform];
                        if (!url) return null;
                        return (
                          <Link
                            key={platform}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-10 w-10 items-center justify-center rounded-full border border-accent-500 transition-colors"
                          >
                            {SOCIAL_ICONS[platform]}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

