"use client";

import Reveal from "@/components/Common/Reveal";
import { DEFAULT_PROJECTS } from "@/data/projects";
import { useQueryProjects } from "@/lib/queries";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function AllProjects() {
  const { data: projects, isLoading } = useQueryProjects();
  const displayProjects =
    projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;

  return (
    <div className="solar-container py-20 lg:py-25 bg-white select-none">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {isLoading
          ? Array.from({ length: 6 })?.map((_, i) => (
              <div
                key={i}
                className="h-115 rounded-lg overflow-hidden bg-gray-200 animate-pulse"
              />
            ))
          : displayProjects?.map((project, index) => (
              <Reveal
                key={project.id || index}
                variant="fade-up"
                delay={(index % 3) * 120}
                className="h-115"
              >
                <Link
                  href={"projects/" + project.slug}
                  className="relative h-full rounded-lg overflow-hidden shadow-sm group flex flex-col justify-end p-4 transition-transform duration-300 hover:-translate-y-1"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${project.imageUrl})` }}
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-accent-400/80 via-transparent to-transparent z-0" />

                  <div
                    className={`relative z-10 w-full rounded-xl p-5 backdrop-blur-md transition-all duration-300 border ${
                      project.isFeatured
                        ? "bg-gold-900/80 border-gold-500/30 shadow-lg"
                        : "bg-gold-900/40 backdrop-brightness-90 border-white/20 group-hover:bg-gold-900/70 group-hover:border-accent-500/30"
                    }`}
                  >
                    <h3 className="font-heading text-lg lg:text-xl font-bold leading-snug tracking-tight text-white">
                      {project.title}
                    </h3>

                    {/* Description – hidden by default, shows on hover */}
                    {project.description && (
                      <p className="mt-2 text-sm text-white/80 line-clamp-2 max-h-0 opacity-0 overflow-hidden transition-all duration-300 group-hover:max-h-20 group-hover:opacity-100 group-hover:mt-2">
                        {project.description}
                      </p>
                    )}

                    <div className="mt-4 inline-flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-white hover:text-accent-400 transition-colors">
                      <span>View Details</span>
                      <span className="flex items-center justify-center w-5 h-5 rounded-full bg-accent-500 text-gold-700">
                        <ArrowUpRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
      </div>
    </div>
  );
}

