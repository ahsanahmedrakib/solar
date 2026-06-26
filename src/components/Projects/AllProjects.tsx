import Link from "next/link";

interface ProjectCard {
  title: string;
  imageUrl: string;
  linkUrl: string;
  isFeatured?: boolean;
}

const projects: ProjectCard[] = [
  {
    title: "Rooftop Solar Installation for Residential Homes",
    imageUrl: "/images/projects/project-1.jpg",
    linkUrl: "#",
  },
  {
    title: "Industrial Solar Power Installation Manufacturing Unit",
    imageUrl: "/images/projects/project-2.jpg",
    linkUrl: "#",
  },
  {
    title: "Sustainable Solar Energy Project for Communities",
    imageUrl: "/images/projects/project-3.jpg",
    linkUrl: "#",
  },
  {
    title: "Commercial Solar Plant for Office Building",
    imageUrl: "/images/projects/project-4.jpg",
    linkUrl: "#",
  },
  {
    title: "Solar Installation for Educational Institute",
    imageUrl: "/images/projects/project-5.jpg",
    linkUrl: "#",
  },
  {
    title: "Hybrid Solar System for Hospital Facility",
    imageUrl: "/images/projects/project-6.jpg",
    linkUrl: "#",
  },
];

export default function AllProjects() {
  return (
    <div className="mx-auto px-4 md:px-8 lg:px-20 py-20 bg-gray-50 select-none">
      {/* Responsive Grid Setup */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
        {projects.map((project, index) => (
          <div
            key={index}
            className="relative h-115 rounded-2xl overflow-hidden shadow-sm group flex flex-col justify-end p-4 transition-transform duration-300 hover:-translate-y-1"
          >
            {/* Background Image Container */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
              style={{ backgroundImage: `url(${project.imageUrl})` }}
            />

            {/* Subtle base gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent z-0" />

            {/* Floating Content Glassmorphic Panel */}
            <div
              className={`relative z-10 w-full rounded-xl p-5 backdrop-blur-md transition-all duration-300 border ${
                project.isFeatured
                  ? "bg-black/60 border-white/10 shadow-lg"
                  : "bg-white/10 backdrop-brightness-90 border-white/20 group-hover:bg-black/40 group-hover:border-white/10"
              }`}
            >
              {/* Dynamic Green Dot Indicator for Featured/Active Item */}
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

              {/* View Details Call to Action */}
              <Link
                href={project.linkUrl}
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
