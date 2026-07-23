export interface HeroSlide {
  id: number;
  tagline: string;
  title: string;
  titleAccent: string;
  description: string;
  image: string;
  videoUrl: string;
  showVideoButton: boolean;
  isActive: boolean;
  order: number;
}

export const DEFAULT_HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    tagline: "R&D Driven Solar Company",
    title: "Pioneering Rooftop Solar",
    titleAccent: "for Industrial & Commercial Scale",
    description:
      "We are a vertically integrated solar energy company offering end-to-end solutions — from system design and engineering to installation and long-term maintenance — customized to factory and business needs.",
    image: "/images/home/hero-bg-image.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    showVideoButton: true,
    isActive: true,
    order: 1,
  },
  {
    id: 2,
    tagline: "Proven Track Record",
    title: "Delivering Large-Scale",
    titleAccent: "Rooftop Solar Projects Since 2005",
    description:
      "With over 16 years of experience, we have designed and installed projects across RMG, Textile, FMCG, Agro, and Paper Mill sectors — earning the trust of Bangladesh's top-ranking companies.",
    image: "/images/home/hero-bg-image.jpg",
    videoUrl: "",
    showVideoButton: false,
    isActive: true,
    order: 2,
  },
  {
    id: 3,
    tagline: "CapEx & OpEx Models",
    title: "Flexible Solar Solutions",
    titleAccent: "Tailored to Your Business",
    description:
      "Whether you prefer to own your system with our CapEx model or start saving from day one with our OpEx model — we offer the right financial and technical solution for every business.",
    image: "/images/home/hero-bg-image.jpg",
    videoUrl: "",
    showVideoButton: false,
    isActive: true,
    order: 3,
  },
];
