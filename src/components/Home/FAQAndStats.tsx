"use client";

import React, { useState } from "react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

interface StatItem {
  metric: string;
  label: string;
  icon: React.ReactNode;
}

export default function FAQAndStats() {
  // State to manage the open accordion item (Item 1 is open by default as in image_816b81.png)
  const [openId, setOpenId] = useState<number | null>(1);

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "1. Is solar energy suitable for my home or business?",
      answer:
        "Yes, solar energy is suitable for most homes and businesses. Factors such as available roof space, sunlight exposure, and your energy consumption are evaluated to design a system that delivers maximum efficiency, cost savings, and long-term reliability.",
    },
    {
      id: 2,
      question: "2. What happens if I generate more power than I use?",
      answer:
        "Excess energy can typically be sent back to the grid through net metering options or stored directly in a dedicated hybrid home battery backup system for overnight usage.",
    },
    {
      id: 3,
      question: "3. Are there government subsidies or incentives available?",
      answer:
        "Depending on your local region, many municipal and federal programs offer investment tax credits, solar rebates, and clean energy incentives that lower total upfront installation overhead.",
    },
    {
      id: 4,
      question: "4. What maintenance does a solar system require?",
      answer:
        "Solar panel setups require very minimal upkeep. Routine washing to clean off dirt, leaves, or bird droppings combined with annual professional structural reviews is usually all that is needed.",
    },
    {
      id: 5,
      question: "5. Does solar work during cloudy days or at night?",
      answer:
        "Solar arrays still capture daylight power during hazy or overcast conditions, but they do not produce energy at night. Battery cells can pull backup storage power to maintain connectivity.",
    },
  ];

  const stats: StatItem[] = [
    {
      metric: "25MW+",
      label: "Installed Capacity",
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
            d="M11.48 3.499c.151-.312.56-.312.712 0l2.164 4.494 4.887.69c.346.049.484.484.223.73l-3.57 3.424.871 4.908c.06.342-.294.614-.593.444L12 15.918l-4.194 2.247a.75.75 0 01-1.096-.813l.872-4.908-3.57-3.424a.75.75 0 01.222-.73l4.888-.69 2.163-4.494z"
          />
        </svg>
      ),
    },
    {
      metric: "15000+",
      label: "Solar Panels Deployed",
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
            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5A3.375 3.375 0 0 0 10.125 2.25H4.375A1.875 1.875 0 0 0 2.5 4.125v15.75c0 1.035.84 1.875 1.875 1.875h15.25a1.875 1.875 0 0 0 1.875-1.875V14.25Z"
          />
        </svg>
      ),
    },
    {
      metric: "7500+",
      label: "Happy Satisfied Customers",
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
            d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25"
          />
        </svg>
      ),
    },
  ];

  const handleToggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:py-24 lg:px-20 mx-auto font-sans">
      {/* FAQ ROW UPPER CONTAINER */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pb-16 border-b border-gray-100">
        {/* LEFT COLUMN: CALLOUT STICKY BLOCK */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-8">
          {/* Tagline Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F3F4F6] px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700">
            <span className="w-1.5 h-1.5 bg-accent-600 rounded-full"></span>
            Frequently Asked Questions
          </div>

          {/* Main Headline Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051720] tracking-tight leading-[1.15]">
            Clear guidance for your solar journey
          </h2>

          {/* Context Explainer Paragraph */}
          <p className="text-gray-500 text-sm sm:text-base font-normal leading-relaxed max-w-md">
            {
              " We've answered the most common questions to help you understand solar energy, installation, costs, and maintenance."
            }
          </p>
        </div>

        {/* RIGHT COLUMN: ACCORDION COMPONENT LIST */}
        <div className="lg:col-span-7 divide-y divide-gray-100">
          {faqs?.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div key={faq.id} className="py-5 first:pt-0 last:pb-0">
                <button
                  type="button"
                  onClick={() => handleToggle(faq.id)}
                  className="w-full flex items-center justify-between gap-4 text-left group focus:outline-none"
                >
                  <h3 className="text-base sm:text-lg font-bold text-[#051720] tracking-tight transition-colors duration-200 group-hover:text-accent-600">
                    {faq.question}
                  </h3>

                  {/* Circular Up/Down Arrow Wrapper Indicator */}
                  <div
                    className={`shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? "bg-accent-600 text-white rotate-0"
                        : "bg-accent-600/10 text-accent-600 rotate-180"
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
                    <p className="text-sm sm:text-base text-gray-400 font-medium leading-relaxed pl-0 pr-4 sm:pr-8">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM FOOTER SECTION: METRICS DASHBOARD                                  */}
      {/* ========================================================================= */}
      <div className="pt-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-center">
          {stats?.map((stat, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-4 pl-2 sm:pl-6 ${
                idx > 0 ? "md:border-l md:border-gray-100" : ""
              }`}
            >
              {/* Highlight Icon Background circle element */}
              <div className="shrink-0 w-12 h-12 rounded-full bg-accent-600 text-white flex items-center justify-center shadow-sm">
                {stat.icon}
              </div>

              {/* Data labels breakdown content */}
              <div className="space-y-0.5">
                <h4 className="text-3xl sm:text-4xl font-extrabold text-[#051720] tracking-tight">
                  {stat.metric}
                </h4>
                <p className="text-xs sm:text-sm font-semibold text-gray-500 tracking-tight">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
