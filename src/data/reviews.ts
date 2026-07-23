export interface Review {
  id: number;
  name: string;
  role: string;
  rating: number;
  quote: string;
  createdAt: string;
}

export const DEFAULT_REVIEWS: Review[] = [
  {
    id: 1,
    name: "Cameron Williamson",
    role: "Home Owner",
    rating: 5,
    quote:
      "Switching to solar was one of the best decisions we made. The installation was seamless and our electricity bills dropped significantly within the first month.",
    createdAt: "2026-06-15T10:00:00.000Z",
  },
  {
    id: 2,
    name: "Leslie Alexander",
    role: "Retail Store Owner",
    rating: 5,
    quote:
      "The team provided a solar solution for our residential complex. Professional approach, transparent pricing, and excellent after-sales support.",
    createdAt: "2026-06-10T08:30:00.000Z",
  },
  {
    id: 3,
    name: "Robert Fox",
    role: "Business Owner",
    rating: 4,
    quote:
      "Great experience from start to finish. The consultation was thorough, installation was on time, and the system has been performing perfectly. Great experience from start to finish. The consultation was thorough, installation was on time, and the system has been performing perfectly. Great experience from start to finish. The consultation was thorough, installation was on time, and the system has been performing perfectly. Great experience from start to finish. The consultation was thorough, installation was on time, and the system has been performing perfectly.",
    createdAt: "2026-05-20T14:15:00.000Z",
  },
  {
    id: 4,
    name: "Sarah Mitchell",
    role: "Home Owner",
    rating: 5,
    quote:
      "Our energy costs have been cut by over 60%. The team was professional and completed the installation ahead of schedule. Highly recommend their services.",
    createdAt: "2026-05-12T09:45:00.000Z",
  },
  {
    id: 5,
    name: "James Cooper",
    role: "Property Manager",
    rating: 5,
    quote:
      "We've installed solar panels on three of our properties. Each time the process was smooth and the results exceeded our expectations. Outstanding value.",
    createdAt: "2026-04-28T11:20:00.000Z",
  },
  {
    id: 6,
    name: "Emily Chen",
    role: "Home Owner",
    rating: 4,
    quote:
      "The consultation was very informative. They helped us choose the right system for our home and the installation was completed in just one day.",
    createdAt: "2026-04-15T16:00:00.000Z",
  },
];

