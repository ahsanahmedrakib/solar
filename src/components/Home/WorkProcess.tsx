"use client";

import Reveal from "@/components/Common/Reveal";
import { Activity, ClipboardCheck, HardHat } from "lucide-react";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Site Assessment & Planning",
    description:
      "We evaluate your roof structure, energy consumption, and design a custom solar system optimized for maximum savings.",
    icon: <ClipboardCheck className="w-12 h-12 text-white stroke-[1.5]" />,
  },
  {
    number: "02",
    title: "Engineering & Installation",
    description:
      "Our certified team handles system design, permitting, and professional installation with minimal disruption.",
    icon: <HardHat className="w-12 h-12 text-white stroke-[1.5]" />,
  },
  {
    number: "03",
    title: "Commissioning & Monitoring",
    description:
      "Your system starts generating clean energy immediately, backed by real-time 24/7 remote performance monitoring.",
    icon: <Activity className="w-12 h-12 text-white stroke-[1.5]" />,
  },
];

const WorkProcess = () => {
  return (
    <>
      <section className="py-16 lg:py-25 px-4 bg-secondary font-sans overflow-x-hidden">
        <div className="solar-container">
          {/* Header Section */}
          <div className="text-center mb-16 space-y-4">
            <Reveal variant="fade-up">
              <span className="section-eyebrow justify-center">
                Our Work Process
              </span>
            </Reveal>
            <Reveal variant="fade-up" delay={100}>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold tracking-tight leading-[1.1] text-accent-500">
                From consultation to clean energy in three steps
              </h2>
            </Reveal>
            <Reveal variant="fade-up" delay={180}>
              <p className="text-[#888888] text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
                Our streamlined process takes you from a free site assessment to
                a fully operational solar plant — handled end-to-end by
                certified engineers.
              </p>
            </Reveal>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 relative">
            {steps.map((step, index) => (
              <Reveal
                key={step.number}
                variant="fade-up"
                delay={index * 160}
                className="group relative flex flex-col items-center text-center"
              >
                {/* Curved Connector Arrows (Visible on MD screens and above, except last item) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] z-0 pointer-events-none">
                    <svg
                      viewBox="0 0 160 50"
                      fill="none"
                      className="w-full h-auto text-accent-500"
                    >
                      <path
                        d={
                          index % 2 === 0
                            ? "M 10 10 Q 80 -10 145 35" // Upward curve
                            : "M 10 35 Q 80 55 145 10" // Downward curve
                        }
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray="4 4"
                        fill="none"
                      />
                      {/* Arrowhead */}
                      <polygon
                        points={
                          index % 2 === 0
                            ? "140,30 148,37 141,40"
                            : "140,15 148,8 141,5"
                        }
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}

                {/* Icon Card Container */}
                <div className="relative mb-6 z-10">
                  <div className="w-32 h-32 bg-accent-500 rounded-3xl flex items-center justify-center shadow-lg shadow-accent-500/25 group-hover:scale-105 group-hover:-translate-y-1 transition-transform duration-500">
                    {step.icon}
                  </div>

                  {/* Number Badge */}
                  <div className="absolute -top-1 -right-1 bg-gold-500 text-white font-heading font-bold text-sm w-9 h-9 rounded-full flex items-center justify-center ring-4 ring-white">
                    {step.number}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-forest-700 mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[#888888] text-sm leading-relaxed max-w-xs">
                  {step.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default WorkProcess;
