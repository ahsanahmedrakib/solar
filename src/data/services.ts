export interface Service {
  id: number;
  title: string;
  description: string;
  image: string;
  alt: string;
  iconName: string;
  slug: string;
}

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 1,
    title: "Solar Battery Storage",
    description: "Reliable energy storage solutions that store excess solar power for use during peak hours or blackouts.",
    image: "/images/services/service-item-image-1.jpg",
    alt: "Solar Battery Storage field",
    iconName: "Battery",
    slug: "solar-battery-storage",
  },
  {
    id: 2,
    title: "Residential Solar Solutions",
    description: "Custom designed solar systems for homes that help reduce electricity bills and support clean energy goals.",
    image: "/images/services/service-item-image-2.jpg",
    alt: "Engineers working on home solar design",
    iconName: "Sun",
    slug: "residential-solar-solutions",
  },
  {
    id: 3,
    title: "Solar System Maintenance",
    description: "Regular inspection, cleaning, and performance checks to ensure your solar panels are producing at maximum efficiency.",
    image: "/images/services/service-item-image-3.jpg",
    alt: "Engineer maintaining panels",
    iconName: "Wrench",
    slug: "solar-system-maintenance",
  },
  {
    id: 4,
    title: "Rooftop Solar Solutions",
    description: "Space efficient rooftop systems designed to maximize energy generation on residential and commercial roofs.",
    image: "/images/services/service-item-image-4.jpg",
    alt: "A smiling couple standing in front of their house with rooftop solar panels",
    iconName: "Zap",
    slug: "rooftop-solar-solutions",
  },
  {
    id: 5,
    title: "Solar Panel Installation",
    description: "Professional design, permitting, and high-quality installation services for reliable green energy production.",
    image: "/images/services/service-item-image-5.jpg",
    alt: "Two technicians installing and checking solar panels on a sunny day",
    iconName: "Shield",
    slug: "solar-panel-installation",
  },
  {
    id: 6,
    title: "Hybrid Solar Systems",
    description: "A smart combination of grid-tied solar panels and battery storage to ensure continuous power supply.",
    image: "/images/services/service-item-image-6.jpg",
    alt: "Engineers inspecting a massive commercial hybrid solar system farm",
    iconName: "Globe",
    slug: "hybrid-solar-systems",
  },
];
