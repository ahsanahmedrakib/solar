export interface Plan {
  id: number;
  name: string;
  description: string;
  monthlyPrice: number;
  annualPrice: number;
  features: string[];
  isPopular?: boolean;
  badge?: string;
}

export const DEFAULT_PLANS: Plan[] = [
  {
    id: 1,
    name: "Basic Solar Plan",
    description: "Perfect entry-level solar solution to start reducing your electricity bills immediately.",
    monthlyPrice: 299.0,
    annualPrice: 249.0,
    features: [
      "High-Efficiency Solar Panels",
      "Real-Time Performance Monitoring",
      "Hybrid Inverter Support",
      "Basic Installation & Setup",
    ],
    isPopular: false,
  },
  {
    id: 2,
    name: "Standard Solar Plan",
    description: "Balanced solution with enhanced performance and better energy storage options.",
    monthlyPrice: 499.0,
    annualPrice: 419.0,
    features: [
      "High-Efficiency Solar Panels",
      "Real-Time Performance Monitoring",
      "Hybrid Inverter + Battery Support",
      "Advanced Monitoring Dashboard",
      "Priority Installation",
    ],
    isPopular: true,
    badge: "Most Popular",
  },
  {
    id: 3,
    name: "Premium Solar Plan",
    description: "Complete energy independence with top-tier equipment and full smart home integration.",
    monthlyPrice: 699.0,
    annualPrice: 589.0,
    features: [
      "Premium High-Efficiency Panels",
      "Real-Time Performance Monitoring",
      "Full Hybrid Battery System",
      "Smart Home Integration",
      "Premium Installation & Support",
      "Extended 25-Year Warranty",
    ],
    isPopular: false,
  },
];
