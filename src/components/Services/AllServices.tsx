import { ServiceCard } from "@/types/services";
import ServicesCard from "../Home/ServicesCard";

const services: ServiceCard[] = [
  {
    id: 1,
    title: "Solar Battery Storage",
    description:
      "Reliable energy storage solutions that store excess solar power for use.",
    image: "/images/services/service-item-image-1.jpg",
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
    image: "/images/services/service-item-image-2.jpg",
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
    image: "/images/services/service-item-image-3.jpg",
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
  {
    id: 4,
    title: "Rooftop Solar Solutions",
    description:
      "Space efficient rooftop systems designed to maximize energy generation.",
    image: "/images/services/service-item-image-4.jpg",
    alt: "A smiling couple standing in front of their house with rooftop solar panels",
    iconSvg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        {/* Placeholder SVG path for the rooftop/grid icon */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
  },
  {
    id: 5,
    title: "Solar Panel Maintenance",
    description:
      "Regular system checks, performance and monitoring maintenance.",
    image: "/images/services/service-item-image-5.jpg",
    alt: "Two technicians installing and checking solar panels on a sunny day",
    iconSvg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        {/* Placeholder SVG path for the maintenance/money-savings bag icon */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 6,
    title: "Hybrid Solar Systems",
    description:
      "A smart combination of solar, & battery storage to ensure reliable power.",
    image: "/images/services/service-item-image-6.jpg",
    alt: "Engineers inspecting a massive commercial hybrid solar system farm with a tablet",
    iconSvg: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5"
      >
        {/* Placeholder SVG path for the hybrid/system icon */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.656 48.656 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3M3 12a48.654 48.654 0 01.138 3.662 4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M3 12l-3 3m3-3l3 3"
        />
      </svg>
    ),
  },
];

const AllServices = () => {
  return (
    <div>
      <div className="bg-white font-sans overflow-x-hidden">
        {/* OUR SERVICES */}
        <section className="bg-[#F7F9FA] py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-12">
            <ServicesCard services={services} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default AllServices;
