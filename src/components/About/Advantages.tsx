import Counter from "@/components/Common/Counter";
import Reveal from "@/components/Common/Reveal";
import RevealImage from "@/components/Common/RevealImage";
import Image from "next/image";

export default function Advantages() {
  return (
    <section className="relative w-full bg-white px-4 py-12 md:px-8 lg:px-16 lg:py-25">
      <div className="solar-container">
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          {/* Badge */}
          <Reveal variant="fade-up">
            <span className="section-eyebrow">Our Advantages</span>
          </Reveal>

          {/* Heading with inline graphic capsule */}
          <Reveal variant="fade-up" delay={120}>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-accent-500 sm:text-4xl lg:text-[52px] lg:leading-tight">
              Smart solar benefits designed to deliver performance,{" "}
              <span className="inline-flex items-center align-middle mx-1 h-7 w-14 sm:h-9 sm:w-20 relative rounded-full overflow-hidden border border-accent-500 shadow-sm">
                <Image
                  src="/images/about/advantages-title-image.jpg"
                  alt="Solar graphic illustration"
                  fill
                  className="object-cover"
                />
              </span>{" "}
              saving, &amp; long term reliability
            </h2>
          </Reveal>
        </div>

        {/* ================= CARD GRID SECTION ================= */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3 items-stretch">
          {/* Left Card: 24*7 Support */}
          <Reveal
            variant="fade-up"
            delay={0}
            className="flex flex-col justify-between rounded-lg bg-secondary p-8 md:p-10 transition-all duration-300 hover:shadow-sm"
          >
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent-500 text-white shadow-sm">
                {/* 24/7 Grid Icon alternative */}
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
              </div>

              <div className="mt-12">
                <span className="font-heading block text-4xl md:text-5xl font-black text-accent-500 tracking-tight">
                  <Counter end={24} suffix="*7" />
                </span>
                <span className="block mt-1 text-sm font-bold text-accent-500 tracking-wide">
                  Support Availability
                </span>
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-[#888888] border-t border-forest-700/10 pt-6">
              Dedicated service team to ensure smooth operation and quick
              assistance whenever needed.
            </p>
          </Reveal>

          {/* Middle Card: Team Media Asset */}
          <RevealImage
            delay={140}
            className="relative min-h-80 sm:min-h-100 lg:min-h-full overflow-hidden rounded-lg shadow-sm"
          >
            <Image
              src="/images/about/our-advantages-image.jpg"
              alt="Solar energy specialists consulting on top of panels"
              fill
              className="object-cover transition-transform duration-500 hover:scale-102"
              sizes="(max-w-7xl) 100vw, 33vw"
            />
          </RevealImage>

          {/* Right Card: Projects Completed */}
          <Reveal
            variant="fade-up"
            delay={280}
            className="flex flex-col justify-between rounded-lg bg-secondary p-8 md:p-10 transition-all duration-300 hover:shadow-sm"
          >
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent-500 text-white shadow-sm">
                {/* Globe/Network Icon */}
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z"
                  />
                </svg>
              </div>

              <div className="mt-12">
                <span className="font-heading block text-4xl md:text-5xl font-black text-accent-500 tracking-tight">
                  <Counter end={2000} suffix="+" />
                </span>
                <span className="block mt-1 text-sm font-bold text-accent-500 tracking-wide">
                  Projects Completed
                </span>
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-[#888888] border-t border-forest-700/10 pt-6">
              Successfully installed solar systems across residential,
              commercial, and industrial areas.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

