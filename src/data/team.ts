export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  x?: string;
  linkedin?: string;
}

export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio?: string;
  socialLinks?: SocialLinks;
}

export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Leslie Alexander",
    role: "Lead Solar Engineer",
    image: "/images/about/team-image-1.jpg",
    socialLinks: {
      facebook: "https://facebook.com/lesliealexander",
      instagram: "https://instagram.com/lesliealexander",
      x: "https://x.com/lesliealexander",
      linkedin: "https://linkedin.com/in/lesliealexander",
    },
  },
  {
    id: 2,
    name: "Marvin McKinney",
    role: "Lead Solar Engineer",
    image: "/images/about/team-image-2.jpg",
    socialLinks: {
      facebook: "https://facebook.com/marvinmckinney",
      instagram: "https://instagram.com/marvinmckinney",
      x: "https://x.com/marvinmckinney",
      linkedin: "https://linkedin.com/in/marvinmckinney",
    },
  },
  {
    id: 3,
    name: "Kathryn Murphy",
    role: "Lead Solar Engineer",
    image: "/images/about/team-image-3.jpg",
    socialLinks: {
      facebook: "https://facebook.com/kathrynmurphy",
      instagram: "https://instagram.com/kathrynmurphy",
      x: "https://x.com/kathrynmurphy",
      linkedin: "https://linkedin.com/in/kathrynmurphy",
    },
  },
];
