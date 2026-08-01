"use client";

import Counter from "@/components/Common/Counter";
import Reveal from "@/components/Common/Reveal";
import React, { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface StatItem {
  end: number;
  prefix?: string;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

export default function FAQAndStats() {
  // State to manage the open accordion item (Item 1 is open by default as in image_816b81.png)
  const [openId, setOpenId] = useState<number | null>(1);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question:
        "1. Is rooftop solar suitable for my factory or commercial building?",
      answer:
        "Yes, rooftop solar is ideal for most industrial and commercial buildings with adequate roof space. We assess roof structure, sunlight exposure, and your energy consumption to design a system that maximizes savings and performance.",
    },
    {
      id: 2,
      question:
        "2. What is the difference between CapEx and OpEx solar models?",
      answer:
        "With the CapEx model, you own the solar system outright and enjoy full savings from day one. With the OpEx model, we install and maintain the system at our cost — you simply pay for the electricity generated at a lower rate than the grid.",
    },
    {
      id: 3,
      question: "3. How much can I save with a rooftop solar system?",
      answer:
        "Savings depend on your current electricity consumption, roof size, and system design. Most industrial clients see 30-50% reduction in their electricity costs within the first year of installation.",
    },
    {
      id: 4,
      question: "4. What maintenance does a rooftop solar system require?",
      answer:
        "Rooftop solar systems require minimal maintenance. Regular cleaning to remove dust and debris, combined with annual performance inspections, is usually sufficient. We also provide 24/7 remote monitoring to detect issues early.",
    },
    {
      id: 5,
      question: "5. Can excess energy be sent back to the grid?",
      answer:
        "Yes, depending on your local regulations, excess energy can be exported to the grid through net metering arrangements. This further reduces your electricity costs and can generate additional revenue.",
    },
  ];

  const stats: StatItem[] = [
    {
      end: 52,
      suffix: "MWp",
      label: "Largest Rooftop Solar Project",
      icon: (
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
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
      ),
    },
    {
      end: 30,
      suffix: "GWh",
      label: "Green Energy Per Year",
      icon: (
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
            d="M12 3v18M6.343 18.364l11.314-11.314M18.364 18.364L6.343 7.029"
          />
        </svg>
      ),
    },
    {
      end: 100,
      suffix: "MWp",
      label: "Pipeline Capacity",
      icon: (
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
            d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"
          />
        </svg>
      ),
    },
  ];

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-white py-20 lg:py-25 font-sans">
      {/* FAQ ROW UPPER CONTAINER */}
      <div className="solar-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-gray-100">
        {/* LEFT COLUMN: CALLOUT STICKY BLOCK */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
          {/* Tagline Badge */}
          <Reveal variant="fade-up">
            <span className="section-eyebrow">Frequently Asked Questions</span>
          </Reveal>

          {/* Main Headline Heading */}
          <Reveal variant="fade-up" delay={100}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold text-accent-500 tracking-tight leading-[1.1]">
              Clear guidance for your solar journey
            </h2>
          </Reveal>

          {/* Context Explainer Paragraph */}
          <Reveal variant="fade-up" delay={180}>
            <p className="text-[#888888] text-sm sm:text-base font-normal leading-relaxed max-w-md">
              We&apos;ve answered the most common questions to help you
              understand rooftop solar for industrial and commercial facilities,
              installation process, costs, and ongoing support.
            </p>
          </Reveal>
        </div>

        {/* RIGHT COLUMN: ACCORDION COMPONENT LIST */}
        <div className="lg:col-span-7 divide-y divide-gray-100">
          {faqs?.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <Reveal key={faq.id} variant="fade-up" delay={(faq.id - 1) * 80}>
                <div className="py-5 first:pt-0 last:pb-0">
                  <button
                    type="button"
                    onClick={() => handleToggle(faq.id)}
                    className="w-full flex items-center cursor-pointer justify-between gap-4 text-left group focus:outline-none"
                  >
                    <h3 className="font-heading text-base sm:text-lg font-bold text-accent-500 tracking-tight transition-colors duration-200 group-hover:text-accent-700">
                      {faq.question}
                    </h3>

                    {/* Circular Up/Down Arrow Wrapper Indicator */}
                    <div
                      className={`shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isOpen
                          ? "bg-accent-500 text-white rotate-0"
                          : "bg-secondary text-accent-500 rotate-180"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 15.75l7.5-7.5 7.5 7.5"
                        />
                      </svg>
                    </div>
                  </button>

                  {/* Animated expandable panel content */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 mt-3"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-sm sm:text-base text-[#888888] font-medium leading-relaxed pl-0 pr-4 sm:pr-8">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM FOOTER SECTION: METRICS DASHBOARD                                  */}
      {/* ========================================================================= */}
      <Reveal variant="fade-up" delay={100}>
        <div className="solar-container pt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
            {stats?.map((stat, idx) => (
              <div
                key={idx}
                className={`flex items-center gap-4 pl-2 sm:pl-6 ${
                  idx > 0 ? "md:border-l md:border-gray-100" : ""
                }`}
              >
                {/* Highlight Icon Background circle element */}
                <div className="shrink-0 w-12 h-12 rounded-[18px] bg-accent-500 text-white flex items-center justify-center shadow-sm">
                  {stat.icon}
                </div>

                {/* Data labels breakdown content */}
                <div className="space-y-0.5">
                  <h4 className="font-heading text-3xl sm:text-4xl font-extrabold text-accent-500 tracking-tight">
                    <Counter
                      end={stat.end}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                    />
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-[#888888] tracking-tight">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
