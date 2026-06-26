"use client";

import { useState } from "react";

// Mock Data Arrays for easier management
const services = [
  { name: "Solar Battery Storage", active: true },
  { name: "Residential Solar Solutions", active: false },
  { name: "Solar System Maintenance", active: false },
  { name: "Rooftop Solar Solutions", active: false },
  { name: "Solar Panel Maintenance", active: false },
  { name: "Hybrid Solar Systems", active: false },
];

const offers = [
  "Improve energy independence & reliability",
  "Backup power during grid outages",
  "Smart energy management & monitoring",
  "Lower electricity bills using stored energy",
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
      "Excess energy can either be stored in a solar battery system for nighttime/peak usage or fed back into the main electrical grid depending on local net metering guidelines.",
  },
  {
    id: 3,
    question: "Are there government subsidies or incentives available?",
    answer:
      "Many locations offer tax credits, solar rebates, and financial incentives to drastically drop installation costs. Consult local guidelines for current 2026 savings.",
  },
  {
    id: 4,
    question: "What maintenance does a solar system require?",
    answer:
      "Solar systems require very little upkeep. Annual cleanings to clear dust/debris and a technical diagnostics check every few years are typically all that is needed.",
  },
  {
    id: 5,
    question: "Does solar work during cloudy days or at night?",
    answer:
      "Solar panels still harvest energy on overcast days at lower efficiencies. At night, your power seamlessly transitions to battery storage or grid backups.",
  },
];

export default function SingleService() {
  const [openFaq, setOpenFaq] = useState<number | null>(1);

  return (
    <div className="bg-white min-h-screen text-[#011c2b] font-sans antialiased selection:bg-green-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        {/* Main Split Layout: Left Navigation Sticky Column & Right Content Area */}
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
          {/* ================= LEFT SIDEBAR ================= */}
          <aside className="w-full lg:w-[30%] lg:sticky lg:top-6 flex flex-col gap-6 shrink-0">
            {/* Explore Services Menu */}
            <div className="bg-[#f4f7f9] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="bg-[#4caf50] text-white px-5 py-4 font-bold text-sm tracking-wide uppercase">
                Explore Our Services
              </div>
              <nav className="flex flex-col">
                {services.map((service, index) => (
                  <button
                    key={index}
                    className={`flex items-center justify-between px-5 py-3.5 text-xs font-bold border-b border-gray-200/60 last:border-0 text-left transition-colors ${
                      service.active
                        ? "bg-white text-[#4caf50]"
                        : "text-[#011c2b] hover:bg-gray-100/70"
                    }`}
                  >
                    <span>{service.name}</span>
                    <span className="text-base font-normal">→</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Contact Promo Widget */}
            <div className="bg-[#021622] rounded-2xl p-6 text-white relative overflow-hidden shadow-lg border border-white/5">
              <div className="absolute top-4 right-4 w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-xl">
                ☀️
              </div>
              <div className="w-10 h-10 rounded-full bg-[#39a838] flex items-center justify-center mb-5 shadow-inner">
                📞
              </div>
              <h4 className="text-lg font-bold mb-2">Contact Us For a Quote</h4>
              <p className="text-gray-400 text-xs leading-relaxed mb-6">
                Installed by certified professionals who follow strict safety
                standards.
              </p>
              <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">
                Call Us:
              </div>
              <a
                href="tel:+1123456789"
                className="text-lg font-bold text-white hover:text-green-400 transition-colors mt-0.5 block"
              >
                +1 (123) 456 - 789
              </a>
            </div>
          </aside>

          {/* ================= RIGHT MAIN CONTENT ================= */}
          <main className="w-full lg:w-[70%] flex flex-col gap-12 lg:pl-4">
            {/* Top Showcase Hero Section */}
            <section className="flex flex-col gap-6">
              <div
                className="w-full h-64 sm:h-96 rounded-2xl bg-cover bg-center shadow-md border border-gray-100"
                style={{
                  backgroundImage:
                    "url('/images/services/single-service-item-image-2.jpg')",
                }} // Replace placeholder
              />
              <p className="text-gray-500 text-sm leading-relaxed">
                Solar Battery Storage solutions allow you to store excess solar
                energy generated during the day & use wherever you need it at
                night, during peak hours, or in case of power outages. Our
                systems help you maximize energy independence, reduce reliance
                on the grid, and get the most value from your solar investment.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                Take control of your energy and never waste your solar power
                again. Contact us today to learn how Solar Battery Storage can
                make your energy system smarter, more reliable, and more
                cost-effective.
              </p>
            </section>

            {/* What We Offer Section */}
            <section className="border-t border-gray-100 pt-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                What we offer
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                We provide high-performance battery storage systems designed for
                both residential and commercial use. Our team handles everything
                from system sizing and battery selection to installation,
                integration, and long-term support. We work with reliable,
                proven battery technologies to ensure safety, efficiency.
              </p>

              {/* Bullet Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">
                {offers.map((offer, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 text-sm font-semibold text-gray-700"
                  >
                    <span className="text-green-500 shrink-0 text-base">✓</span>
                    <span>{offer}</span>
                  </div>
                ))}
              </div>

              {/* Middle Overview Image Banner */}
              <div
                className="w-full h-56 sm:h-80 rounded-2xl bg-cover bg-center mt-10 shadow-inner border border-gray-100 relative group flex items-center justify-center"
                style={{
                  backgroundImage:
                    "url('/images/services/single-service-offer-box-image.jpg')",
                }}
              >
                {/* Visual Play / Info Filter Layer Overlay */}
                <div className="absolute inset-0 bg-black/10 rounded-2xl transition-opacity group-hover:bg-black/20" />
                <div className="relative z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow">
                  🔍
                </div>
              </div>
            </section>

            {/* Our Key Benefits Split Section */}
            <section className="border-t border-gray-100 pt-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                Our key benefits
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-8">
                Our Solar Battery Storage solutions are designed to give you
                greater control over your energy. By storing excess solar power,
                you can reduce your dependence on the grid, protect yourself
                from power outages, and make better use of your clean energy.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                {/* Left Benefit Picture */}
                <div
                  className="w-full h-64 md:h-auto rounded-2xl bg-cover bg-center shadow-sm"
                  style={{
                    backgroundImage:
                      "url('/images/services/single-service-benefit-image.jpg')",
                  }}
                />

                {/* Right Info Stack Cards */}
                <div className="flex flex-col gap-4 justify-between">
                  {/* Card 1 */}
                  <div className="bg-[#f4f7f9] rounded-2xl p-5 border border-gray-100 flex flex-col gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#4caf50] text-white flex items-center justify-center text-sm shadow-sm">
                      🔋
                    </div>
                    <h4 className="font-bold text-base">
                      Energy Independence & Reliability
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      Store and use your own solar power to reduce dependence on
                      the grid.
                    </p>
                  </div>

                  {/* Card 2 */}
                  <div className="bg-[#f4f7f9] rounded-2xl p-5 border border-gray-100 flex flex-col gap-3">
                    <div className="w-9 h-9 rounded-full bg-[#4caf50] text-white flex items-center justify-center text-sm shadow-sm">
                      📉
                    </div>
                    <h4 className="font-bold text-base">
                      Lower Costs & Smarter Savings
                    </h4>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      By using stored solar energy during peak hours, you can
                      significantly reduce utility outlays.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Frequently Asked Questions Accordion Section */}
            <section className="border-t border-gray-100 pt-10 mb-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-400 text-xs sm:text-sm mb-8">
                This section is designed to help you understand the process,
                clear your doubts, and make confident decisions about switching
                to clean, reliable solar power.
              </p>

              {/* Accordion Wrapper */}
              <div className="flex flex-col gap-3">
                {faqsData.map((faq) => {
                  const isOpen = openFaq === faq.id;
                  return (
                    <div
                      key={faq.id}
                      className="border-b border-gray-200/80 pb-4 transition-all duration-200"
                    >
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

                      {/* Accordion Content Body Panel */}
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          isOpen
                            ? "max-h-62.5 opacity-100 mt-2"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-gray-500 text-xs sm:text-sm leading-relaxed pl-5 pr-4 py-1 bg-gray-50/50 rounded-xl border-l-2 border-[#4caf50]">
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
