import Reveal from "@/components/Common/Reveal";
import Image from "next/image";

const highlights = [
  {
    title: "Premium Easy-Bike Power",
    description:
      "Advanced easy-bike power solutions dedicated to maximizing your daily income and performance.",
  },
  {
    title: "Top-Tier Battery Rentals",
    description:
      "Specialized lithium-ion battery rentals engineered for reliable, long-lasting performance.",
  },
  {
    title: "Reliable Charging Network",
    description:
      "A dependable charging station network that keeps you on the road — not waiting in line.",
  },
  {
    title: "Maximum Mileage, Zero Hassle",
    description:
      "Long-lasting power so you spend less time waiting and more time earning.",
  },
];

const stats = [
  { value: "100%", label: "Solar Charged" },
  { value: "120৳", label: "Daily Rent From" },
  { value: "140km", label: "Max Range" },
];

export default function PalashAbout() {
  return (
    <section className="bg-white py-20 lg:py-25 px-4 sm:px-6 lg:px-8 font-sans overflow-x-hidden">
      <div className="solar-container grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        <div className="lg:col-span-6 space-y-6">
          <Reveal variant="fade-up">
            <span className="section-eyebrow">
              About Palash Charging Station
            </span>
          </Reveal>

          <Reveal variant="fade-up" delay={100}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold text-accent-500 tracking-tight leading-[1.1]">
              Maximum Mileage,{" "}
              <span className="text-accent-500">Zero Hassle</span>
            </h2>
          </Reveal>

          <Reveal variant="fade-up" delay={180}>
            <p className="text-[#888888] text-sm sm:text-base font-normal leading-relaxed text-justify">
              Welcome to Palash Charging Station! ⚡ As your premium destination
              for advanced easy-bike power solutions, we are dedicated to
              maximizing your daily income and performance. We specialize in
              top-tier lithium-ion battery rentals and offer a reliable,
              charging station network. Our goal is to equip you with
              long-lasting power so you spend less time waiting and more time on
              the road.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            {highlights.map((item, index) => (
              <Reveal
                key={item.title}
                variant="fade-up"
                delay={220 + index * 80}
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-[18px] bg-accent-500/10 text-accent-500 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-accent-500 tracking-tight">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#888888] font-medium leading-relaxed mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6">
          <Reveal variant="slide-right" delay={150}>
            <div className="relative bg-forest-900 rounded-lg overflow-hidden shadow-xl p-6">
              <div className="absolute inset-0 bg-linear-to-br from-accent-500/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative flex flex-col items-center text-center gap-8">
                <div className="bg-white rounded-lg p-2 shadow-lg">
                  <Image
                    src="/images/palash/palash.jpg"
                    alt="Palash Charging Station - Ahead Solar Ltd."
                    width={600}
                    height={376}
                    className="w-48 sm:w-60 h-auto object-contain"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4 w-full">
                  {stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/5 border border-white/10 rounded-xl px-3 py-5"
                    >
                      <p className="font-heading text-xl sm:text-2xl font-bold text-accent-500">
                        {stat.value}
                      </p>
                      <p className="text-white/60 text-[10px] sm:text-xs font-semibold uppercase tracking-wider mt-1">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

