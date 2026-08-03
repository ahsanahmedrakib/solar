import Reveal from "@/components/Common/Reveal";
import RevealImage from "@/components/Common/RevealImage";
import Image from "next/image";
import React from "react";

interface SolutionFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface ModelOverviewProps {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  image: string;
  imageAlt: string;
  features: SolutionFeature[];
}

export default function ModelOverview({
  badge,
  title,
  titleAccent,
  description,
  image,
  imageAlt,
  features,
}: ModelOverviewProps) {
  return (
    <section className="bg-white py-20 lg:py-25 px-4 sm:px-6 lg:px-8 font-sans overflow-x-hidden">
      <div className="solar-container space-y-16">
        {/* Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-6">
            <RevealImage className="relative w-full aspect-4/3 rounded-lg overflow-hidden shadow-sm">
              <Image
                src={image}
                alt={imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            </RevealImage>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <Reveal variant="fade-up">
              <span className="section-eyebrow">{badge}</span>
            </Reveal>

            <Reveal variant="fade-up" delay={100}>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold text-accent-500 tracking-tight leading-[1.1]">
                {title} <span className="text-accent-500">{titleAccent}</span>
              </h2>
            </Reveal>

            <Reveal variant="fade-up" delay={180}>
              <p className="text-[#888888] text-sm sm:text-base font-normal leading-relaxed text-justify">
                {description}
              </p>
            </Reveal>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features?.map((feature, index) => (
            <Reveal key={feature.id} variant="fade-up" delay={index * 100}>
              <div className="group bg-secondary rounded-lg p-6 sm:p-8 shadow-sm border border-white/60 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between relative overflow-hidden min-h-55 card-shine">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-[18px] text-white bg-accent-500 flex items-center justify-center shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                    {feature.icon}
                  </div>
                  <span className="font-heading text-sm font-extrabold text-accent-500 tracking-wider">
                    {feature.id}
                  </span>
                </div>

                <div className="mt-6 space-y-2">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-accent-500 tracking-tight group-hover:text-accent-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#888888] font-medium leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
