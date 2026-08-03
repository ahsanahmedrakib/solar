import Reveal from "@/components/Common/Reveal";
import Image from "next/image";

const highlights = [
  {
    title: "100% Solar-Charged",
    description:
      "Every battery is charged using clean solar energy through our dedicated charging network.",
  },
  {
    title: "Daily Rental Model",
    description:
      "Affordable daily rental plans keep easy-bike and Mishuk drivers on the road with zero upfront cost.",
  },
  {
    title: "BESS Expertise",
    description:
      "We specialize in advanced Battery Energy Storage Systems (BESS) for sustainable, efficient energy.",
  },
  {
    title: "Driver's Home",
    description:
      "PALASH is built as a three-wheeler driver's home - a trusted network of charging and service stations.",
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
              Our{" "}
              <span className="text-accent-500">
                Sustainable Battery Rental
              </span>{" "}
              Network
            </h2>
          </Reveal>

          <Reveal variant="fade-up" delay={180}>
            <p className="text-[#888888] text-sm sm:text-base font-normal leading-relaxed text-justify">
              Through our groundbreaking initiative Palash Charging Station, we
              provide 100% solar-charged lithium-ion batteries to Easybike and
              Mishuk drivers on a daily rental basis. Furthermore, we specialize
              in advanced Battery Energy Storage Systems (BESS) to drive
              sustainable and efficient energy solutions.
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
            <div className="relative bg-forest-900 rounded-2xl overflow-hidden shadow-xl p-8 sm:p-12">
              <div className="absolute inset-0 bg-linear-to-br from-accent-500/10 via-transparent to-transparent pointer-events-none" />

              <div className="relative flex flex-col items-center text-center gap-8">
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <Image
                    src="/images/palash/palash.jpg"
                    alt="Palash Charging Station - Ahead Solar Ltd."
                    width={480}
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

