"use client";

import { DEFAULT_SERVICES, type Service } from "@/data/services";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SingleService({ slug }: { slug: string }) {
  const [service, setService] = useState<Service | null>(null);
  const [allServices, setAllServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/services");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setAllServices(json.data);
          const found = json.data.find((s: Service) => s.slug === slug);
          if (found) setService(found);
        } else {
          setAllServices(DEFAULT_SERVICES);
          const fallback = DEFAULT_SERVICES.find((s) => s.slug === slug);
          if (fallback) setService(fallback);
        }
      } catch (error) {
        console.error("Failed to load service", error);
        setAllServices(DEFAULT_SERVICES);
        const fallback = DEFAULT_SERVICES.find((s) => s.slug === slug);
        if (fallback) setService(fallback);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  return (
    <div className="bg-white min-h-screen text-[#011c2b] font-sans antialiased selection:bg-green-100">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:items-start">
          {/* ================= LEFT SIDEBAR ================= */}
          <aside className="w-full lg:w-[30%] lg:sticky lg:top-6 flex flex-col gap-6 shrink-0">
            <div className="bg-[#f4f7f9] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="bg-[#4caf50] text-white px-5 py-4 font-bold text-sm tracking-wide uppercase">
                Explore Our Services
              </div>
              <nav className="flex flex-col">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-11 px-5 bg-gray-100 animate-pulse border-b border-gray-200/60"
                      />
                    ))
                  : allServices.map((s) => (
                      <Link
                        key={s.id}
                        href={"/services/" + s.slug}
                        className={`flex items-center justify-between px-5 py-3.5 text-xs font-bold border-b border-gray-200/60 last:border-0 text-left transition-colors ${
                          s.slug === slug
                            ? "bg-white text-[#4caf50]"
                            : "text-[#011c2b] hover:bg-gray-100/70"
                        }`}
                      >
                        <span>{s.title}</span>
                        <span className="text-base font-normal">→</span>
                      </Link>
                    ))}
              </nav>
            </div>
          </aside>

          {/* ================= RIGHT MAIN CONTENT ================= */}
          <main className="w-full lg:w-[70%] flex flex-col gap-12 lg:pl-4">
            {loading ? (
              <div className="animate-pulse flex flex-col gap-6">
                <div className="w-full h-64 sm:h-96 rounded-2xl bg-gray-200" />
                <div className="space-y-3">
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-5/6 rounded bg-gray-200" />
                  <div className="h-4 w-4/6 rounded bg-gray-200" />
                </div>
                <div className="space-y-3">
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                </div>
              </div>
            ) : service ? (
              <>
                <section className="flex flex-col gap-6">
                  <div
                    className="w-full h-64 sm:h-96 rounded-2xl bg-cover bg-center shadow-md border border-gray-100"
                    style={{
                      backgroundImage: `url(${service.image})`,
                    }}
                  />
                  <div
                    className="text-gray-500 text-sm leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{
                      __html: service.serviceDetails,
                    }}
                  />
                </section>

                {/* <section className="border-t border-gray-100 pt-10">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-4">
                    What we offer
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-6">
                    We provide high-performance {service.title.toLowerCase()}{" "}
                    designed for both residential and commercial use. Our team
                    handles everything from system sizing to installation,
                    integration, and long-term support.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3.5 gap-x-6">
                    {[
                      "Improve energy independence & reliability",
                      "Backup power during grid outages",
                      "Smart energy management & monitoring",
                      "Lower electricity bills using stored energy",
                    ].map((offer, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2.5 text-sm font-semibold text-gray-700"
                      >
                        <span className="text-green-500 shrink-0 text-base">
                          ✓
                        </span>
                        <span>{offer}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="w-full h-56 sm:h-80 rounded-2xl bg-cover bg-center mt-10 shadow-inner border border-gray-100 relative group flex items-center justify-center"
                    style={{
                      backgroundImage:
                        "url('/images/services/single-service-offer-box-image.jpg')",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/10 rounded-2xl transition-opacity group-hover:bg-black/20" />
                    <div className="relative z-10 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow">
                      🔍
                    </div>
                  </div>
                </section>

                <section className="border-t border-gray-100 pt-10">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                    Our key benefits
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed mb-8">
                    Our {service.title.toLowerCase()} are designed to give you
                    greater control over your energy. By choosing our solutions,
                    you can reduce your dependence on the grid, protect yourself
                    from outages, and make better use of clean energy.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                    <div
                      className="w-full h-64 md:h-auto rounded-2xl bg-cover bg-center shadow-sm"
                      style={{
                        backgroundImage:
                          "url('/images/services/single-service-benefit-image.jpg')",
                      }}
                    />

                    <div className="flex flex-col gap-4 justify-between">
                      <div className="bg-[#f4f7f9] rounded-2xl p-5 border border-gray-100 flex flex-col gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#4caf50] text-white flex items-center justify-center text-sm shadow-sm">
                          🔋
                        </div>
                        <h4 className="font-bold text-base">
                          Energy Independence & Reliability
                        </h4>
                        <p className="text-gray-500 text-xs leading-relaxed">
                          Store and use your own solar power to reduce
                          dependence on the grid.
                        </p>
                      </div>

                      <div className="bg-[#f4f7f9] rounded-2xl p-5 border border-gray-100 flex flex-col gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#4caf50] text-white flex items-center justify-center text-sm shadow-sm">
                          📉
                        </div>
                        <h4 className="font-bold text-base">
                          Lower Costs & Smarter Savings
                        </h4>
                        <p className="text-gray-500 text-xs leading-relaxed">
                          By using stored solar energy during peak hours, you
                          can significantly reduce utility outlays.
                        </p>
                      </div>
                    </div>
                  </div>
                </section> */}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <p className="text-lg font-semibold">Service not found</p>
                <Link
                  href="/services"
                  className="mt-4 text-[#4caf50] hover:underline"
                >
                  ← Back to all services
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
