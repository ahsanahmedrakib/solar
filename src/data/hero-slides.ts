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
    tagline: "Solar Energy for Tomorrow",
    title: "Power Your Future with",
    titleAccent: "Clean Solar Energy",
    description: "From expert system design to seamless installation and ongoing support, we combine technical expertise with a commitment to performance, safety.",
    image: "/images/home/hero-bg-image.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    showVideoButton: true,
    isActive: true,
    order: 1,
  },
];
