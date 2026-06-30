export interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio?: string;
}

export const DEFAULT_TEAM: TeamMember[] = [
  {
    id: 1,
    name: "Leslie Alexander",
    role: "Lead Solar Engineer",
    image: "/images/about/team-image-1.jpg",
  },
  {
    id: 2,
    name: "Marvin McKinney",
    role: "Lead Solar Engineer",
    image: "/images/about/team-image-2.jpg",
  },
  {
    id: 3,
    name: "Kathryn Murphy",
    role: "Lead Solar Engineer",
    image: "/images/about/team-image-3.jpg",
  },
];
