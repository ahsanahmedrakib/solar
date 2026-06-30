export interface Service {
  id: number;
  title: string;
  description: string;
  serviceDetails: string;
  image: string;
  alt: string;
  iconName: string;
  slug: string;
}

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 1,
    title: "Solar Battery Storage",
    description:
      "Reliable energy storage solutions that store excess solar power for use during peak hours or blackouts.",
    serviceDetails:
      "<p>Reliable energy storage solutions that store excess solar power for use during peak hours or blackouts. Our battery systems are designed to maximize your energy independence and ensure you always have power when you need it most.</p><p>With advanced lithium-ion technology, our storage solutions offer high efficiency, long lifespan, and seamless integration with existing solar installations.</p><ul><li>Store excess energy generated during the day for nighttime use</li><li>Protect against grid outages with automatic backup power</li><li>Reduce peak demand charges and lower your electricity bills</li><li>Monitor energy usage in real time via smart controls</li></ul>",
    image: "/images/services/service-item-image-1.jpg",
    alt: "Solar Battery Storage field",
    iconName: "Battery",
    slug: "solar-battery-storage",
  },
  {
    id: 2,
    title: "Residential Solar Solutions",
    description:
      "Custom designed solar systems for homes that help reduce electricity bills and support clean energy goals.",
    serviceDetails:
      "<p>Custom designed solar systems for homes that help reduce electricity bills and support clean energy goals. Our residential solutions are tailored to your specific energy needs, roof layout, and budget.</p><p>From initial consultation to final commissioning, we manage the entire process so you can start saving from day one.</p><ul><li>Personalized system design based on your energy consumption</li><li>High-efficiency panels that maximize power generation</li><li>Expert installation by certified professionals</li><li>Ongoing support and performance monitoring</li></ul>",
    image: "/images/services/service-item-image-2.jpg",
    alt: "Engineers working on home solar design",
    iconName: "Sun",
    slug: "residential-solar-solutions",
  },
  {
    id: 3,
    title: "Solar System Maintenance",
    description:
      "Regular inspection, cleaning, and performance checks to ensure your solar panels are producing at maximum efficiency.",
    serviceDetails:
      "<p>Regular inspection, cleaning, and performance checks to ensure your solar panels are producing at maximum efficiency. Our maintenance programs are designed to protect your investment and extend system lifespan.</p><p>We provide comprehensive maintenance packages that include everything from visual inspections to detailed performance analysis.</p><ul><li>Thorough panel cleaning to remove dust and debris</li><li>Inverter and electrical system checks</li><li>Performance data analysis and reporting</li><li>Early detection of potential issues before they become costly repairs</li></ul>",
    image: "/images/services/service-item-image-3.jpg",
    alt: "Engineer maintaining panels",
    iconName: "Wrench",
    slug: "solar-system-maintenance",
  },
  {
    id: 4,
    title: "Rooftop Solar Solutions",
    description:
      "Space efficient rooftop systems designed to maximize energy generation on residential and commercial roofs.",
    serviceDetails:
      "<p>Space efficient rooftop systems designed to maximize energy generation on residential and commercial roofs. Our rooftop solutions make use of every available square foot to deliver the highest possible energy output.</p><p>Whether you have a sloped roof, flat roof, or unique architectural features, we design a system that works harmoniously with your property.</p><ul><li>Custom mounting solutions for all roof types</li><li>Aesthetic low-profile panel designs</li><li>Optimized tilt and orientation for maximum sunlight exposure</li><li>Seamless integration with existing roofing materials</li></ul>",
    image: "/images/services/service-item-image-4.jpg",
    alt: "A smiling couple standing in front of their house with rooftop solar panels",
    iconName: "Zap",
    slug: "rooftop-solar-solutions",
  },
  {
    id: 5,
    title: "Solar Panel Installation",
    description:
      "Professional design, permitting, and high-quality installation services for reliable green energy production.",
    serviceDetails:
      "<p>Professional design, permitting, and high-quality installation services for reliable green energy production. Our experienced team handles every aspect of the installation process with precision and care.</p><p>We manage all paperwork, permits, and utility coordination so you can focus on enjoying the benefits of solar energy.</p><ul><li>Comprehensive site assessment and energy audit</li><li>Full permitting and utility approval management</li><li>Professional installation by NABCEP-certified technicians</li><li>Post-installation testing and system commissioning</li></ul>",
    image: "/images/services/service-item-image-5.jpg",
    alt: "Two technicians installing and checking solar panels on a sunny day",
    iconName: "Shield",
    slug: "solar-panel-installation",
  },
  {
    id: 6,
    title: "Hybrid Solar Systems",
    description:
      "A smart combination of grid-tied solar panels and battery storage to ensure continuous power supply.",
    serviceDetails:
      "<p>A smart combination of grid-tied solar panels and battery storage to ensure continuous power supply. Our hybrid systems give you the best of both worlds &mdash; grid connectivity when you need it and battery backup when you don&rsquo;t.</p><p>Hybrid systems are ideal for areas with unreliable grid power or for homeowners who want maximum energy independence.</p><ul><li>Automatic switchover during grid outages</li><li>Smart energy management that optimizes solar, battery, and grid usage</li><li>Scalable design that can grow with your energy needs</li><li>Reduced reliance on fossil fuels and lower carbon footprint</li></ul>",
    image: "/images/services/service-item-image-6.jpg",
    alt: "Engineers inspecting a massive commercial hybrid solar system farm",
    iconName: "Globe",
    slug: "hybrid-solar-systems",
  },
];

