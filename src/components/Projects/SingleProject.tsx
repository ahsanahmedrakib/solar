"use client";

import { DEFAULT_PROJECTS, type Project } from "@/data/projects";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function SingleProject({ slug }: { slug: string }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/projects");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          const found = json.data.find((p: Project) => p.slug === slug);
          if (found) setProject(found);
        } else {
          const fallback = DEFAULT_PROJECTS.find((p) => p.slug === slug);
          if (fallback) setProject(fallback);
        }
      } catch (error) {
        console.error("Failed to load project", error);
        const fallback = DEFAULT_PROJECTS.find((p) => p.slug === slug);
        if (fallback) setProject(fallback);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [slug]);

  return (
    <div className="bg-white min-h-screen text-[#011c2b] font-sans antialiased">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 lg:py-16">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* ================= LEFT COLUMN / SIDEBAR ================= */}
          <aside className="w-full lg:w-[30%] lg:sticky lg:top-6 flex flex-col gap-6 shrink-0">
            <div className="bg-[#f4f7f9] rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
              <div className="bg-[#4caf50] text-white px-5 py-4 font-bold text-sm tracking-wide">
                Project Information
              </div>
              <div className="flex flex-col">
                {loading
                  ? Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-12 px-5 bg-gray-100 animate-pulse border-b border-gray-200/60"
                      />
                    ))
                  : project
                    ? [
                        { label: "Project Name:", value: project.title },
                        { label: "Category:", value: project.category },
                        { label: "Client:", value: project.client },
                        { label: "Location:", value: project.location },
                        { label: "Status:", value: "Completed" },
                      ].map((item, index) => (
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
                      ))
                    : null}
              </div>
            </div>
          </aside>

          {/* ================= RIGHT COLUMN / MAIN CONTENT ================= */}
          <main className="w-full lg:w-[70%] flex flex-col gap-10">
            {loading ? (
              <div className="animate-pulse flex flex-col gap-6">
                <div className="w-full h-64 sm:h-96 rounded-2xl bg-gray-200" />
                <div className="space-y-3">
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-5/6 rounded bg-gray-200" />
                  <div className="h-4 w-4/6 rounded bg-gray-200" />
                </div>
              </div>
            ) : project ? (
              <>
                <section className="flex flex-col gap-6">
                  <div
                    className="w-full h-64 sm:h-96 rounded-2xl bg-cover bg-center shadow-sm border border-gray-100"
                    style={{
                      backgroundImage: `url('${project.imageUrl}')`,
                    }}
                  />
                  <div
                    className="text-gray-500 text-sm leading-relaxed space-y-4"
                    dangerouslySetInnerHTML={{
                      __html: project.projectDetails,
                    }}
                  />
                </section>

                {/* <section className="flex flex-col gap-6 border-t border-gray-100 pt-8">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Project challenges
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    The main challenges included limited roof space, partial
                    shading during certain hours of the day, and the need to
                    optimize panel placement for maximum sunlight exposure.
                    Additionally, the installation had to be completed without
                    disrupting the household&apos;s daily routine.
                  </p>

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
                          The available rooftop area had an irregular layout,
                          which made it challenging.
                        </p>
                      </div>
                    </div>
                  </div>

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

                <section className="flex flex-col gap-6 border-t border-gray-100 pt-8">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Our solution
                  </h2>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Our team conducted a detailed site assessment and designed a
                    customized rooftop solar system tailored to the home&apos;s
                    energy needs. We used high-efficiency panels and a reliable
                    inverter, carefully positioning the panels to avoid shaded
                    areas and maximize energy production.
                  </p>

                  <div className="bg-[#f4f7f9] rounded-2xl p-6 border border-gray-100/70 flex flex-col gap-6">
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
                          efficiently and minimizing the impact of shading,
                          ensuring reliable.
                        </p>
                      </div>
                    </div>
                  </div>
                </section> */}

                <section className="flex flex-col gap-2 border-t border-gray-100 pt-8 mb-4">
                  <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                    Frequently Asked Questions
                  </h2>
                  <p className="text-gray-400 text-xs sm:text-sm mb-6">
                    This section is designed to help you understand the process,
                    clear your doubts, and make confident decisions about
                    switching to clean, reliable solar power.
                  </p>

                  <div className="flex flex-col gap-2">
                    {[
                      {
                        id: 1,
                        question:
                          "Is solar energy suitable for my home or business?",
                        answer:
                          "Yes, solar energy is suitable for most homes and businesses. Factors such as available roof space, sunlight exposure, and your energy consumption are evaluated to design a system that delivers maximum efficiency, cost savings, and long-term reliability.",
                      },
                      {
                        id: 2,
                        question:
                          "What happens if I generate more power than I use?",
                        answer:
                          "Excess power can be stored or exported back to the grid depending on net metering options available in your region.",
                      },
                      {
                        id: 3,
                        question:
                          "Are there government subsidies or incentives available?",
                        answer:
                          "Yes, local incentives and federal tax credits significantly offset system costs.",
                      },
                      {
                        id: 4,
                        question:
                          "What maintenance does a solar system require?",
                        answer:
                          "Minimal maintenance is required. Occasional cleanings and an annual checkup ensure top operation.",
                      },
                      {
                        id: 5,
                        question:
                          "Does solar work during cloudy days or at night?",
                        answer:
                          "Panels generate power on cloudy days at lower efficiency, while batteries handle night power needs.",
                      },
                    ].map((faq) => (
                      <div
                        key={faq.id}
                        className="border-b border-gray-100 pb-4"
                      >
                        <div className="w-full flex items-center justify-between text-left py-2 font-bold text-sm sm:text-base text-[#011c2b] gap-4">
                          <span>
                            {faq.id}. {faq.question}
                          </span>
                        </div>
                        <div className="mt-2">
                          <p className="text-gray-500 text-xs sm:text-sm leading-relaxed pl-4 border-l-2 border-[#4caf50]">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <p className="text-lg font-semibold">Project not found</p>
                <Link
                  href="/projects"
                  className="mt-4 text-[#4caf50] hover:underline"
                >
                  ← Back to all projects
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

