"use client";

import { DEFAULT_PROJECTS, type Project } from "@/data/projects";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AllProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch("/api/projects");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setProjects(json.data);
        } else {
          setProjects(DEFAULT_PROJECTS);
        }
      } catch (error) {
        console.error("Failed to load projects", error);
        setProjects(DEFAULT_PROJECTS);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <div className="mx-auto px-4 md:px-8 lg:px-20 py-20 bg-gray-50 select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {loading
          ? Array.from({ length: 6 })?.map((_, i) => (
              <div
                key={i}
                className="h-115 rounded-2xl overflow-hidden bg-gray-200 animate-pulse"
              />
            ))
          : projects?.map((project, index) => (
              <div
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

                  <Link
                    href={"projects/" + project.slug}
                    className="inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:text-green-400 transition-colors"
                  >
                    <span>View Details</span>
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-[#4caf50] text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={3}
                        stroke="currentColor"
                        className="w-2.5 h-2.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

