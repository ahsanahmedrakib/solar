import { ServiceCard } from "@/types/services";
import ServicesCard from "./ServicesCard";

const services: ServiceCard[] = [
  {
    id: 1,
    title: "Solar Battery Storage",
    description:
      "Reliable energy storage solutions that store excess solar power for use.",
    image: "/images/home/service-item-image-1.jpg",
    alt: "Solar Battery Storage field",
    iconSvg: (
      <svg
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
          d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a15.997 15.997 0 01-3.42-3.42"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Residential Solar Solutions",
    description:
      "Custom designed solar systems for homes that help reduce electricity bills, etc.",
    image: "/images/home/service-item-image-2.jpg",
    alt: "Engineers working on home solar design",
    iconSvg: (
      <svg
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
          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.637 10.642z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Solar System Maintenance",
    description:
      "Regular inspection, cleaning & performance checks to ensure your solar system.",
    image: "/images/home/service-item-image-3.jpg",
    alt: "Engineer maintaining panels",
    iconSvg: (
      <svg
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
          d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z"
        />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <div className="bg-white font-sans overflow-x-hidden">
      {/* OUR SERVICES */}
      <section className="bg-[#F7F9FA] py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* HEADER ROW */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
                <span className="w-1.5 h-1.5 bg-[#31A24C] rounded-full"></span>
                Our Services
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051720] tracking-tight leading-[1.15]">
                Smart solar service designed for homes & businesses
              </h2>
            </div>

            <div>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                From system design and professional installation to energy
                storage, our smart solar solutions deliver reliable performance.
              </p>
              <button className="mt-4 inline-flex items-center gap-2 bg-[#44B549] hover:bg-[#399d3e] transition-colors text-white font-semibold text-sm px-5 py-3 rounded-lg shadow-sm whitespace-nowrap">
                View All Services
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </button>
            </div>
          </div>

          <ServicesCard services={services} />
        </div>
      </section>
    </div>
  );
}
