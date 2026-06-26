"use client";

import { useState } from "react";

// Mock data structures matching image_27b861.jpg
const projectDetails = [
  { label: "Project Name:", value: "Rooftop..." },
  { label: "Category:", value: "Residential" },
  { label: "Country:", value: "New Jersey" },
  { label: "Estimated Time:", value: "06 Months" },
  { label: "Project Status:", value: "Completed" },
];

const faqsData = [
  {
    id: 1,
    question: "Is solar energy suitable for my home or business?",
    answer:
      "Yes, solar energy is suitable for most homes and businesses. Factors such as available roof space, sunlight exposure, and your energy consumption are evaluated to design a system that delivers maximum efficiency, cost savings, and long-term reliability.",
  },
  {
    id: 2,
    question: "What happens if I generate more power than I use?",
    answer:
      "Excess power can be stored or exported back to the grid depending on net metering options available in your region.",
  },
  {
    id: 3,
    question: "Are there government subsidies or incentives available?",
    answer:
      "Yes, local incentives and federal tax credits significantly offset system costs.",
  },
  {
    id: 4,
    question: "What maintenance does a solar system require?",
    answer:
      "Minimal maintenance is required. Occasional cleanings and an annual checkup ensure top operation.",
  },
  {
    id: 5,
    question: "Does solar work during cloudy days or at night?",
    answer:
      "Panels generate power on cloudy days at lower efficiency, while batteries handle night power needs.",
  },
];

export default function SingleProject() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  return (
    <div className="bg-white min-h-screen text-[#011c2b] font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        {/* Two Column Desktop Layout */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ================= LEFT COLUMN / SIDEBAR ================= */}
          <aside className="w-full lg:w-[30%] lg:sticky lg:top-6 flex flex-col gap-6 shrink-0">
            {/* Project Information Table Widget */}
            <div className="bg-[#f4f7f9] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="bg-[#4caf50] text-white px-5 py-4 font-bold text-sm tracking-wide">
                Project Information
              </div>
              <div className="flex flex-col">
                {projectDetails.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between px-5 py-4 border-b border-gray-200/60 last:border-0 text-xs sm:text-sm"
                  >
                    <span className="font-bold text-[#011c2b]">
                      {item.label}
                    </span>
                    <span className="text-gray-500 font-medium">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sticky Promo CTA Widget */}
            <div className="bg-[#021622] rounded-2xl p-6 text-white relative overflow-hidden shadow-md">
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-xl">
                ☀️
              </div>
              <div className="w-10 h-10 rounded-full bg-[#39a838] flex items-center justify-center mb-5 shadow-sm text-white">
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
                    d="M2.25 6.622k"
                  />{" "}
                  {/* Fallback Phone SVG path */}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18.75h9"
                  />
                </svg>
              </div>
              <h4 className="text-base font-bold mb-2">
                Contact Us For a Quote
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed mb-6">
                Installed by certified professionals who follow strict safety
                standards.
              </p>
              <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                Call Us:
              </div>
              <a
                href="tel:+1123456789"
                className="text-base font-bold text-white hover:text-green-400 transition-colors mt-0.5 block"
              >
                +1 (123) 456 - 789
              </a>
            </div>
          </aside>

          {/* ================= RIGHT COLUMN / MAIN CONTENT ================= */}
          <main className="w-full lg:w-[70%] flex flex-col gap-10">
            {/* Top Engineering Workers Banner View */}
            <div className="flex flex-col gap-6">
              <div
                className="w-full h-64 sm:h-96 rounded-2xl bg-cover bg-center shadow-sm border border-gray-100"
                style={{
                  backgroundImage: "url('/images/projects/project-1.jpg')",
                }} // Map configuration placeholder
              />
              <p className="text-gray-500 text-sm leading-relaxed">
                This project focused on designing and installing a
                high-efficiency rooftop solar system for a residential home to
                reduce electricity costs and promote the use of clean, renewable
                energy. The goal was to create a reliable, low-maintenance
                system that would provide long-term savings while supporting a
                sustainable lifestyle.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                The homeowner wanted to lower monthly electricity bills & reduce
                dependence on the grid. They also requested a solution that
                would fit seamlessly with the existing roof structure and
                require minimal maintenance, while offering consistent
                performance throughout the year.
              </p>
            </div>

            {/* Project Challenges Grid Section */}
            <section className="flex flex-col gap-6 border-t border-gray-100 pt-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Project challenges
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                {
                  " The main challenges included limited roof space, partial shading during certain hours of the day, and the need to optimize panel placement for maximum sunlight exposure. Additionally, the installation had to be completed without disrupting the household's daily routine."
                }
              </p>

              {/* Mini Two-Column Grid For Bullet Problems */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2">
                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4caf50] text-white shrink-0 flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#011c2b]">
                      Partial Shading During Peak Hours
                    </h4>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                      Certain parts of the roof were affected by shade from
                      nearby structures and trees.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4caf50] text-white shrink-0 flex items-center justify-center text-sm font-bold">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm sm:text-base text-[#011c2b]">
                      Limited Roof Space & Layout
                    </h4>
                    <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                      The available rooftop area had an irregular layout, which
                      made it challenging.
                    </p>
                  </div>
                </div>
              </div>

              {/* Double Horizontal Supporting Visual Images */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <div
                  className="h-48 sm:h-56 rounded-2xl bg-cover bg-center border border-gray-100 shadow-sm"
                  style={{
                    backgroundImage:
                      "url('/images/projects/project-challenge-image-1.jpg')",
                  }}
                />
                <div
                  className="h-48 sm:h-56 rounded-2xl bg-cover bg-center border border-gray-100 shadow-sm"
                  style={{
                    backgroundImage:
                      "url('/images/projects/project-challenge-image-2.jpg')",
                  }}
                />
              </div>
            </section>

            {/* Our Solution & Progress Bars Section */}
            <section className="flex flex-col gap-6 border-t border-gray-100 pt-8">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Our solution
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Our team conducted a detailed site assessment and designed a
                customized rooftop solar system tailored to the home&apos;s
                energy needs. We used high-efficiency panels and a reliable
                inverter, carefully positioning the panels to avoid shaded areas
                and maximize energy production.
              </p>

              {/* Technical Performance Metric Box */}
              <div className="bg-[#f4f7f9] rounded-2xl p-6 border border-gray-100/70 flex flex-col gap-6">
                {/* Metric 1 */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                    <span>Roof Installation</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#4caf50] h-full rounded-full transition-all duration-500"
                      style={{ width: "85%" }}
                    />
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs sm:text-sm font-bold">
                    <span>Roof Repair & Maintenance</span>
                    <span>95%</span>
                  </div>
                  <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-[#4caf50] h-full rounded-full transition-all duration-500"
                      style={{ width: "95%" }}
                    />
                  </div>
                </div>

                {/* Highlight Info Bullet */}
                <div className="flex gap-4 mt-2 border-t border-gray-200/50 pt-4">
                  <div className="w-9 h-9 rounded-full bg-[#4caf50] text-white shrink-0 flex items-center justify-center text-base">
                    🛡️
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#011c2b]">
                      Optimized System Design
                    </h4>
                    <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">
                      We designed a customized rooftop solar system that
                      maximizes energy output by using the available space
                      efficiently and minimizing the impact of shading, ensuring
                      reliable.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Frequently Asked Questions Accordion Section */}
            <section className="flex flex-col gap-2 border-t border-gray-100 pt-8 mb-4">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mb-6">
                This section is designed to help you understand the process,
                clear your doubts, and make confident decisions about switching
                to clean, reliable solar power.
              </p>

              {/* Dynamic Accordion System */}
              <div className="flex flex-col gap-2">
                {faqsData.map((faq) => {
                  const isOpen = openFaq === faq.id;
                  return (
                    <div key={faq.id} className="border-b border-gray-100 pb-4">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                        className="w-full flex items-center justify-between text-left py-2 font-bold text-sm sm:text-base text-[#011c2b] hover:text-[#4caf50] transition-colors gap-4"
                      >
                        <span>
                          {faq.id}. {faq.question}
                        </span>
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs shrink-0 transition-all ${
                            isOpen ? "bg-[#4caf50] rotate-180" : "bg-gray-300"
                          }`}
                        >
                          {isOpen ? "−" : "＋"}
                        </span>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen
                            ? "max-h-50 opacity-100 mt-2"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed pl-4 border-l-2 border-[#4caf50]">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
