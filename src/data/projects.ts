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
    projectDetails: "<p>This project focused on designing and installing a high-efficiency rooftop solar system for a residential home to reduce electricity costs and promote the use of clean, renewable energy. The goal was to create a reliable, low-maintenance system that would provide long-term savings while supporting a sustainable lifestyle.</p><p>The homeowner wanted to lower monthly electricity bills and reduce dependence on the grid. They also requested a solution that would fit seamlessly with the existing roof structure and require minimal maintenance, while offering consistent performance throughout the year.</p>",
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
    projectDetails: "<p>A large-scale industrial solar installation designed to power a manufacturing facility, significantly reducing operational energy costs and carbon emissions. This project involved installing high-capacity panels across multiple warehouse rooftops and ground-mounted arrays.</p><p>The system was engineered to meet the facility's substantial energy demands while providing long-term cost predictability and environmental benefits.</p>",
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
    projectDetails: "<p>A community-focused solar initiative that brings affordable clean energy to multiple households. This collaborative project allowed residents to benefit from solar power without individual rooftop installations.</p><p>The community solar model enables participants to receive credits on their electricity bills while supporting local renewable energy generation.</p>",
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
    projectDetails: "<p>A commercial solar plant installed on a large office building, designed to offset a significant portion of the facility's energy consumption. The system features high-efficiency panels and smart energy management.</p><p>This project demonstrates how commercial properties can achieve substantial energy savings while enhancing their sustainability credentials.</p>",
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
    projectDetails: "<p>A solar installation for an educational institute, providing hands-on learning opportunities for students while reducing operational costs. The system serves as both a power generation asset and an educational tool.</p><p>Students can monitor real-time energy production data and learn about renewable energy technology as part of their curriculum.</p>",
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
    projectDetails: "<p>A hybrid solar system installed at a hospital facility, ensuring uninterrupted power supply for critical medical operations. The system combines solar panels with battery storage for reliable backup power.</p><p>This installation guarantees that essential equipment remains operational during grid outages, providing peace of mind for patients and staff.</p>",
  },
];

