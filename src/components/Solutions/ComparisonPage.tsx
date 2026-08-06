import Reveal from "@/components/Common/Reveal";
import React from "react";
import HaveQuestions from "./HaveQuestions";
import SolutionBanner from "./SolutionBanner";

interface ComparisonColumn {
  label: string;
  title: string;
  items: string[];
  icon: React.ReactNode;
}

const COLUMNS: ComparisonColumn[] = [
  {
    label: "OpEx",
    title: "OpEx Model",
    items: [
      "Significantly low Cost of Energy - BDT 3/ KWh (for 20 years)",
      "Low cost loan from IDCOL/Other Financial Institutions",
      "Payback within 4/5 years and free electricity after 10 years",
      "Sell excess electricity at grid rate through net metering",
    ],
    icon: (
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
          d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
        />
      </svg>
    ),
  },
  {
    label: "CapEx",
    title: "CapEx Model",
    items: [
      "No Liability - Roof owner assumes no liability (technical or financial)",
      "Hassle free Operation for 20 years",
      "Guaranteed output from Day 1",
      "Service provider ensures smooth maintenance and operation",
    ],
    icon: (
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
          d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"
        />
      </svg>
    ),
  },
  {
    label: "BOT",
    title: "BOT Model",
    items: [
      "Service provider handles complete financing, installation, and operation",
      "Roof owner pays only for generated electricity at a pre-agreed tariff",
      "Zero upfront investment from the roof owner",
      "Ownership of the fully operational plant transfers at zero additional cost",
    ],
    icon: (
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
          d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
        />
      </svg>
    ),
  },
];

const ComparisonPage = () => {
  return (
    <div>
      <SolutionBanner
        title="Model"
        titleAccent="Comparison"
        crumb="Model Comparison"
      />

      <section className="bg-white py-20 lg:py-25 px-4 sm:px-6 lg:px-8 font-sans overflow-x-hidden">
        <div className="solar-container">
          {/* Heading */}
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
            <Reveal variant="fade-up">
              <span className="section-eyebrow">Choosing The Right Model</span>
            </Reveal>

            <Reveal variant="fade-up" delay={100}>
              <h2 className="mt-4 font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold text-accent-500 tracking-tight leading-[1.1]">
                Selecting Appropriate{" "}
                <span className="text-accent-500">Financial Model</span>
              </h2>
            </Reveal>

            <Reveal variant="fade-up" delay={180}>
              <p className="mt-4 text-[#888888] text-sm sm:text-base font-normal leading-relaxed">
                Compare the CapEx, OpEx, and BOT solar models side by side to
                choose the financial structure that best fits your business
                goals.
              </p>
            </Reveal>
          </div>

          {/* Comparison cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {COLUMNS?.map((col, index) => (
              <Reveal
                key={col.label}
                variant="fade-up"
                delay={index * 120}
                className="h-full"
              >
                <div className="group bg-secondary rounded-lg p-8 sm:p-10 h-full shadow-sm border border-white/60 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 relative overflow-hidden card-shine flex flex-col">
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-14 h-14 rounded-[18px] text-white bg-accent-500 flex items-center justify-center shadow-sm transition-all duration-500 group-hover:scale-110 group-hover:rotate-6">
                      {col.icon}
                    </div>
                    <span className="font-heading text-2xl sm:text-3xl font-extrabold text-accent-500 tracking-wider">
                      {col.label}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-accent-500 tracking-tight mb-6">
                    {col.title}
                  </h3>

                  <ul className="space-y-4">
                    {col.items?.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="shrink-0 w-5 h-5 rounded-full bg-accent-500 text-white flex items-center justify-center mt-0.5">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                            stroke="currentColor"
                            className="w-3 h-3"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m4.5 12.75 6 6 9-13.5"
                            />
                          </svg>
                        </span>
                        <span className="text-sm sm:text-base text-[#888888] font-medium leading-relaxed">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HaveQuestions />
    </div>
  );
};

export default ComparisonPage;
