import Reveal from "@/components/Common/Reveal";

interface Package {
  vehicle: string;
  vehicleLabel: string;
  voltage: string;
  batteryType: string;
  range: string;
  capacity: string;
  rent: string;
  rentLabel: string;
  features: string[];
  accent: string;
}

const packages: Package[] = [
  {
    vehicle: "Mishuk",
    vehicleLabel: "Mishuk Battery",
    voltage: "51.2 V",
    batteryType: "Lithium-Ion Battery",
    range: "100 km",
    capacity: "On a single charge",
    rent: "120৳",
    rentLabel: "Daily Rent",
    features: [
      "51.2 Volt lithium-ion battery",
      "100 km range on a single charge",
      "Daily rent only 120 Tk",
      "100% solar-charged",
    ],
    accent: "from-forest-700 to-forest-900",
  },
  {
    vehicle: "Easybike",
    vehicleLabel: "Easybike Battery",
    voltage: "64 V",
    batteryType: "Lithium-Ion Battery",
    range: "140 km",
    capacity: "Carries 8-9 passengers",
    rent: "Affordable",
    rentLabel: "Daily Rental Rate",
    features: [
      "64 Volt lithium-ion battery",
      "140 km range on a single charge",
      "Carries 8-9 passengers comfortably",
      "100% solar-charged",
    ],
    accent: "from-accent-500 to-forest-900",
  },
];

export default function BatteryPackages() {
  return (
    <section className="bg-secondary py-20 lg:py-25 px-4 sm:px-6 lg:px-8 font-sans overflow-x-hidden">
      <div className="solar-container space-y-14">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <Reveal variant="fade-up">
            <span className="section-eyebrow">Battery Packages</span>
          </Reveal>
          <Reveal variant="fade-up" delay={100}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold text-accent-500 tracking-tight leading-[1.1]">
              State-of-the-Art Lithium-Ion Batteries at an{" "}
              <span className="text-accent-500">Affordable Daily Rate</span>
            </h2>
          </Reveal>
          <Reveal variant="fade-up" delay={180}>
            <p className="text-[#888888] text-sm sm:text-base font-normal leading-relaxed">
              Palash Charging Station offers state-of-the-art lithium-ion
              batteries on a highly affordable daily rental basis - keeping
              easy-bike and Mishuk drivers on the road, every day.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {packages.map((pkg, index) => (
            <Reveal key={pkg.vehicle} variant="fade-up" delay={index * 150}>
              <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 overflow-hidden h-full flex flex-col card-shine">
                <div
                  className={`relative px-8 py-8 bg-linear-to-br ${pkg.accent} text-white`}
                >
                  <span className="section-eyebrow !text-white/80">
                    {pkg.vehicleLabel}
                  </span>
                  <div className="flex items-end justify-between mt-4 gap-4">
                    <div>
                      <h3 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight">
                        {pkg.voltage}
                      </h3>
                      <p className="text-white/80 text-sm font-medium mt-1">
                        {pkg.batteryType}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-heading text-2xl sm:text-3xl font-bold text-accent-500">
                        {pkg.rent}
                      </p>
                      <p className="text-white/70 text-xs font-semibold uppercase tracking-wider mt-0.5">
                        {pkg.rentLabel}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 flex-1 p-8">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-secondary rounded-xl px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#888888]">
                        Range
                      </p>
                      <p className="font-heading text-lg font-bold text-accent-500">
                        {pkg.range}
                      </p>
                    </div>
                    <div className="bg-secondary rounded-xl px-4 py-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-[#888888]">
                        Capacity
                      </p>
                      <p className="font-heading text-sm font-bold text-accent-500 leading-tight mt-0.5">
                        {pkg.capacity}
                      </p>
                    </div>
                  </div>

                  <ul className="flex flex-col gap-2.5">
                    {pkg.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2.5 text-sm text-[#888888] font-medium"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="currentColor"
                          className="w-4 h-4 mt-0.5 shrink-0 text-accent-500"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
