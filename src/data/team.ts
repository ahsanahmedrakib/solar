export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  x?: string;
  linkedin?: string;
  youtube?: string;
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
    image: "/images/aheadsolar/team-1.jpg",
    socialLinks: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
      x: "https://www.x.com/",
      linkedin: "https://linkedin.com/company/ahead-solar-ltd/",
    },
  },
  {
    id: 2,
    name: "Marvin McKinney",
    role: "Lead Solar Engineer",
    image: "/images/aheadsolar/team-2.jpg",
    socialLinks: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
      x: "https://www.x.com/",
      linkedin: "https://linkedin.com/company/ahead-solar-ltd/",
    },
  },
  {
    id: 3,
    name: "Kathryn Murphy",
    role: "Lead Solar Engineer",
    image: "/images/aheadsolar/team-3.jpg",
    socialLinks: {
      facebook: "https://www.facebook.com/",
      instagram: "https://www.instagram.com/",
      x: "https://www.x.com/",
      linkedin: "https://linkedin.com/company/ahead-solar-ltd/",
    },
  },
];

