"use client";

import { DEFAULT_PLANS, type Plan } from "@/data/plans";
import { useEffect, useState } from "react";

const defaultIcons = [
  <svg
    key="1"
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
      d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.854-1.106-2.24 0-3.093a3.773 3.773 0 0 1 4.242 0c.163.127.317.265.461.414M19.5 12a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
    />
  </svg>,
  <svg
    key="2"
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
  </svg>,
  <svg
    key="3"
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
      d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
    />
  </svg>,
];

export default function Plans() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPlans() {
      try {
        const res = await fetch("/api/plans");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data?.length > 0) {
          setPlans(json.data);
        } else {
          setPlans(DEFAULT_PLANS);
        }
      } catch {
        setPlans(DEFAULT_PLANS);
      } finally {
        setLoading(false);
      }
    }
    loadPlans();
  }, []);

  return (
    <section className="bg-[#FAFBFD] py-16 px-4 sm:px-6 lg:py-24 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto text-center space-y-12">
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
            <span className="w-1.5 h-1.5 bg-accent-600 rounded-full"></span>
            Our Pricing Plans
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051720] tracking-tight leading-[1.15]">
            Flexible solar pricing designed for every budget
          </h2>
        </div>

        <div className="flex items-center justify-center gap-4 pt-2">
          <span
            className={`text-sm font-bold transition-colors duration-200 ${
              !isAnnual ? "text-[#051720]" : "text-gray-400"
            }`}
          >
            Monthly
          </span>
          <button
            type="button"
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 bg-[#051720] rounded-full p-1 relative transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-600"
            aria-label="Toggle between monthly and annual billing"
          >
            <div
              className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 transform ${
                isAnnual ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`text-sm font-bold transition-colors duration-200 ${
              isAnnual ? "text-[#051720]" : "text-gray-400"
            }`}
          >
            Annually
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-6 text-left">
          {loading
            ? Array.from({ length: 3 })?.map((_, i) => (
                <div
                  key={i}
                  className="bg-[#F3F7F9] rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100/50 animate-pulse"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-gray-200" />
                      <div className="h-6 w-40 rounded bg-gray-200" />
                    </div>
                    <div className="h-4 w-full rounded bg-gray-200" />
                    <div className="h-4 w-3/4 rounded bg-gray-200" />
                    <div className="w-full h-px bg-gray-200" />
                    <div className="h-10 w-32 rounded bg-gray-200" />
                    <div className="w-full h-11 rounded-2xl bg-gray-200" />
                  </div>
                  <div className="mt-8 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-50/50">
                    <div className="h-4 w-28 rounded bg-gray-200 mb-4" />
                    <div className="w-full h-px bg-gray-100 mb-4" />
                    <div className="space-y-3">
                      {Array.from({ length: 4 })?.map((_, j) => (
                        <div
                          key={j}
                          className="h-4 w-full rounded bg-gray-200"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))
            : plans?.map((plan, idx) => (
                <div
                  key={plan.id}
                  className="bg-[#F3F7F9] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100/50"
                >
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-accent-600 text-white flex items-center justify-center shadow-sm">
                        {defaultIcons[idx % defaultIcons?.length]}
                      </div>
                      <h3 className="text-xl font-bold text-[#051720]">
                        {plan.name}
                      </h3>
                    </div>

                    <p className="text-sm text-gray-500 leading-relaxed min-h-11">
                      {plan.description}
                    </p>

                    <div className="w-full h-px bg-gray-200/60" />

                    <div className="flex items-baseline text-[#051720]">
                      <span className="text-4xl sm:text-5xl font-bold tracking-tight">
                        ৳
                        {isAnnual
                          ? plan.annualPrice.toFixed(2)
                          : plan.monthlyPrice.toFixed(2)}
                      </span>
                      <span className="text-xs sm:text-sm font-bold text-gray-500 ml-2">
                        /{isAnnual ? "year" : "month"}
                      </span>
                    </div>

                    <button className="w-full inline-flex items-center justify-center gap-2 bg-accent-600 hover:bg-[#399d3e] transition-colors text-white font-semibold text-sm py-4 rounded-2xl shadow-sm group">
                      Get {plan.name}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-8 bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-50/50">
                    <h4 className="text-sm font-black text-[#051720] mb-4 tracking-wide uppercase">
                      {"WHAT'S INCLUDED"}
                    </h4>
                    <div className="w-full h-px bg-gray-100 mb-4" />

                    <ul className="space-y-3.5">
                      {plan.features?.map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex gap-3 items-center text-xs sm:text-sm text-gray-600 font-medium"
                        >
                          <div className="shrink-0 w-4 h-4 rounded-full bg-accent-600 text-white flex items-center justify-center text-[10px] font-bold">
                            ✓
                          </div>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
        </div>

        <div className="pt-10 flex flex-col sm:flex-row flex-wrap justify-center items-center gap-6 sm:gap-10 text-gray-600 text-xs sm:text-sm font-semibold">
          <div className="flex items-center gap-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#44B549"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
              />
            </svg>
            <span>30-day free trial</span>
          </div>

          <div className="flex items-center gap-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#44B549"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.854-1.106-2.24 0-3.093a3.773 3.773 0 0 1 4.242 0c.163.127.317.265.461.414M19.5 12a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z"
              />
            </svg>
            <span>No hidden fees</span>
          </div>

          <div className="flex items-center gap-2.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="#44B549"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </section>
  );
}

