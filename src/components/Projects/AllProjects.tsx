"use client";

import { DEFAULT_PROJECTS } from "@/data/projects";
import { useQueryProjects } from "@/lib/queries";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AllProjects() {
  const { data: projects, isLoading } = useQueryProjects();
  const displayProjects =
    projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;

  return (
    <div className="mx-auto px-4 md:px-8 lg:px-20 py-20 bg-gray-50 select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {isLoading
          ? Array.from({ length: 6 })?.map((_, i) => (
              <div
                key={i}
                className="h-115 rounded-2xl overflow-hidden bg-gray-200 animate-pulse"
              />
            ))
          : displayProjects?.map((project, index) => (
              <Link
                href={"projects/" + project.slug}
                key={project.id || index}
                className="relative h-115 rounded-2xl overflow-hidden shadow-sm group flex flex-col justify-end p-4 transition-transform duration-300 hover:-translate-y-1"
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{ backgroundImage: `url(${project.imageUrl})` }}
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent z-0" />

                <div
                  className={`relative z-10 w-full rounded-xl p-5 backdrop-blur-md transition-all duration-300 border ${
                    project.isFeatured
                      ? "bg-black/60 border-white/10 shadow-lg"
                      : "bg-white/10 backdrop-brightness-90 border-white/20 group-hover:bg-black/40 group-hover:border-white/10"
                  }`}
                >
                  {project.isFeatured && (
                    <span className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-green-500 rounded-full border border-white animate-pulse" />
                  )}

                  <h3
                    className={`text-lg lg:text-xl font-bold leading-snug mb-4 tracking-tight transition-colors duration-300 ${
                      project.isFeatured
                        ? "text-white"
                        : "text-white group-hover:text-white"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <div className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:text-green-400 transition-colors">
                    <span>View Details</span>
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#4caf50] text-white">
                      <ArrowUpRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
      </div>
    </div>
  );
}

