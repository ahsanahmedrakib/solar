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
    title: "Commercial & Industrial Energy Storage",
    description:
      "Advanced energy storage for businesses — including the 200 kWh modular S1 Storage Cabinet and the 114 kWh all-in-one L1 Storage Cabinet.",
    serviceDetails:
      "<p>We provide advanced commercial and industrial energy storage solutions designed for high-demand environments. Our flagship systems — the 200 kWh modular S1 Storage Cabinet and the 114 kWh all-in-one L1 Storage Cabinet — deliver reliable, scalable power when you need it most.</p><p>From factories to commercial facilities, our storage solutions reduce grid dependence, protect against outages, and optimize energy usage around the clock.</p><ul><li>200 kWh modular S1 Storage Cabinet for large-scale operations</li><li>114 kWh all-in-one L1 Storage Cabinet for compact, complete installations</li><li>Seamless integration with rooftop solar and existing infrastructure</li><li>Reduced peak demand charges and lower electricity costs</li></ul>",
    image: "/images/services/service-item-image-1.jpg",
    alt: "Commercial and industrial energy storage cabinets",
    iconName: "Battery",
    slug: "commercial-industrial-energy-storage",
  },
  {
    id: 2,
    title: "Rooftop Solar with BESS Fusion",
    description:
      "Integrated rooftop solar panels paired with Battery Energy Storage Systems (BESS) for industries across Bangladesh.",
    serviceDetails:
      "<p>We implement integrated rooftop solar panels paired with Battery Energy Storage Systems (BESS) to deliver reliable, round-the-clock clean power for various industries.</p><p>Our fusion approach combines solar generation with intelligent storage, ensuring consistent energy supply even when the sun isn't shining.</p><ul><li>Optimized rooftop solar design for maximum generation</li><li>Fully integrated BESS for energy reliability and independence</li><li>Smart energy management and real-time monitoring</li><li>Lower operating costs and reduced diesel dependence</li></ul>",
    image: "/images/services/service-item-image-4.jpg",
    alt: "Rooftop solar panels paired with battery storage",
    iconName: "Zap",
    slug: "rooftop-solar-bess-fusion",
  },
  {
    id: 3,
    title: "BIPV (Building-Integrated Photovoltaics)",
    description:
      "Solar power systems seamlessly integrated into building structures — combining form and function in one solution.",
    serviceDetails:
      "<p>Our BIPV (Building-Integrated Photovoltaics) projects design and install solar power systems that are seamlessly integrated into building structures — turning facades, roofs, and surfaces into clean energy generators.</p><p>Rather than adding panels on top of a building, BIPV makes the building itself part of the energy solution, blending aesthetics with performance.</p><ul><li>Solar elements integrated directly into building envelopes</li><li>Architecturally elegant designs that preserve building aesthetics</li><li>Dual purpose: structural function and energy generation</li><li>Long-term savings on construction and energy costs</li></ul>",
    image: "/images/services/service-item-image-2.jpg",
    alt: "Building-integrated photovoltaic design",
    iconName: "Sun",
    slug: "bipv-projects",
  },
  {
    id: 4,
    title: "Integrated Solar + Storage Projects",
    description:
      "Advanced power systems with seamless switching between solar generation and battery storage.",
    serviceDetails:
      "<p>We deliver advanced power systems that feature seamless switching between solar generation and battery storage — giving facilities uninterrupted, optimized power delivery.</p><p>Our integrated projects are engineered for maximum efficiency, automatically balancing solar, storage, and load in real time.</p><ul><li>Seamless switching between solar and battery power</li><li>Continuous power even during grid outages</li><li>Optimized energy dispatch for maximum savings</li><li>Complete design, installation, and long-term support</li></ul>",
    image: "/images/services/service-item-image-6.jpg",
    alt: "Integrated solar and battery storage system",
    iconName: "Shield",
    slug: "integrated-solar-storage-projects",
  },
  {
    id: 5,
    title: "OPEX Model Solar Projects",
    description:
      "Operational Expenditure (OPEX) model for large-scale rooftop solar installations — such as our 650KWp project.",
    serviceDetails:
      "<p>We offer an Operational Expenditure (OPEX) model for large-scale rooftop solar installations — such as our 650KWp project — letting businesses adopt solar with no upfront capital investment.</p><p>Under the OPEX model, we own, install, and maintain the system while you pay only for the clean energy you use, unlocking immediate savings.</p><ul><li>Zero upfront capital — pay only for energy consumed</li><li>Ideal for large-scale installations like our 650KWp project</li><li>Professional operation and maintenance included</li><li>Predictable, lower energy costs from day one</li></ul>",
    image: "/images/services/service-item-image-5.jpg",
    alt: "Large-scale rooftop solar installation under OPEX model",
    iconName: "Globe",
    slug: "opex-model-solar-projects",
  },
];

