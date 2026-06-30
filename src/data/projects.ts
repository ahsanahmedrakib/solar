export interface Project {
  id: number;
  title: string;
  imageUrl: string;
  slug: string;
  category: string;
  isFeatured: boolean;
  client: string;
  location: string;
  projectDetails: string;
}

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 1,
    title: "Rooftop Solar Installation for Residential Homes",
    imageUrl: "/images/projects/project-1.jpg",
    slug: "rooftop-solar-installation-for-residential-homes",
    category: "Residential Solar",
    isFeatured: true,
    client: "Johnson Family",
    location: "Austin, TX",
    projectDetails: "Details",
  },
  {
    id: 2,
    title: "Industrial Solar Power Installation Manufacturing Unit",
    imageUrl: "/images/projects/project-2.jpg",
    slug: "industrial-solar-power-installation-manufacturing-unit",
    category: "Industrial Solar",
    isFeatured: false,
    client: "Apex Manufacturing",
    location: "Detroit, MI",
    projectDetails: "Details",
  },
  {
    id: 3,
    title: "Sustainable Solar Energy Project for Communities",
    imageUrl: "/images/projects/project-3.jpg",
    slug: "sustainable-solar-energy-project-for-communities",
    category: "Community Solar",
    isFeatured: false,
    client: "Oakwood Community Council",
    location: "Portland, OR",
    projectDetails: "Details",
  },
  {
    id: 4,
    title: "Commercial Solar Plant for Office Building",
    imageUrl: "/images/projects/project-4.jpg",
    slug: "commercial-solar-plant-for-office-building",
    category: "Commercial Solar",
    isFeatured: true,
    client: "Vanguard Corporate Center",
    location: "Phoenix, AZ",
    projectDetails: "Details",
  },
  {
    id: 5,
    title: "Solar Installation for Educational Institute",
    imageUrl: "/images/projects/project-5.jpg",
    slug: "solar-installation-for-educational-institute",
    category: "Community Solar",
    isFeatured: false,
    client: "Pinecrest High School",
    location: "Denver, CO",
    projectDetails: "Details",
  },
  {
    id: 6,
    title: "Hybrid Solar System for Hospital Facility",
    imageUrl: "/images/projects/project-6.jpg",
    slug: "hybrid-solar-system-for-hospital-facility",
    category: "Commercial Solar",
    isFeatured: false,
    client: "St. Jude Medical Center",
    location: "Miami, FL",
    projectDetails: "Details",
  },
];

