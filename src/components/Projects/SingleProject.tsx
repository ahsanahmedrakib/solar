"use client";

import { DEFAULT_PROJECTS } from "@/data/projects";
import { useQueryProjects } from "@/lib/queries";
import Link from "next/link";

export default function SingleProject({ slug }: { slug: string }) {
  const { data: projects, isLoading } = useQueryProjects();
  const allProjects =
    projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;
  const project = allProjects.find((p) => p.slug === slug) ?? null;

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
                {isLoading
                  ? Array.from({ length: 5 })?.map((_, i) => (
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
                      ]?.map((item, index) => (
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
            {isLoading ? (
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
                    ]?.map((faq) => (
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
