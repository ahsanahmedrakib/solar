import Image from "next/image";

export default function Advantages() {
  return (
    <section className="relative w-full bg-[#fafbfc] px-4 py-12 md:px-8 lg:px-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER SECTION ================= */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          {/* Badge */}
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
            Our Advantages
          </span>

          {/* Heading with inline graphic capsule */}
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B2545] sm:text-4xl lg:text-5xl lg:leading-tight">
            Smart solar benefits designed to deliver performance,{" "}
            <span className="inline-flex items-center align-middle mx-1 h-7 w-14 sm:h-9 sm:w-20 relative rounded-full overflow-hidden border border-emerald-200 shadow-sm bg-linear-to-r from-cyan-100 to-emerald-100">
              <Image
                src="/images/about/advantages-title-image.jpg"
                alt="Solar graphic illustration"
                fill
                className="object-cover"
              />
            </span>{" "}
            saving, &amp; long term reliability
          </h2>
        </div>

        {/* ================= CARD GRID SECTION ================= */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-3 items-stretch">
          {/* Left Card: 24*7 Support */}
          <div className="flex flex-col justify-between rounded-xl bg-[#f4f7fa] p-8 md:p-10 transition-all duration-300 hover:shadow-sm">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#34A853] text-white shadow-sm">
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
                <span className="block text-4xl md:text-5xl font-black text-[#0B2545] tracking-tight">
                  24*7
                </span>
                <span className="block mt-1 text-sm font-bold text-gray-700 tracking-wide">
                  Support Availability
                </span>
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-gray-500 border-t border-gray-200/60 pt-6">
              Dedicated service team to ensure smooth operation and quick
              assistance whenever needed.
            </p>
          </div>

          {/* Middle Card: Team Media Asset */}
          <div className="relative min-h-80 sm:min-h-100 lg:min-h-full overflow-hidden rounded-xl shadow-sm">
            <Image
              src="/images/about/our-advantages-image.jpg"
              alt="Solar energy specialists consulting on top of panels"
              fill
              className="object-cover transition-transform duration-500 hover:scale-102"
              sizes="(max-w-7xl) 100vw, 33vw"
            />
          </div>

          {/* Right Card: Projects Completed */}
          <div className="flex flex-col justify-between rounded-xl bg-[#f4f7fa] p-8 md:p-10 transition-all duration-300 hover:shadow-sm">
            <div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#34A853] text-white shadow-sm">
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
                <span className="block text-4xl md:text-5xl font-black text-[#0B2545] tracking-tight">
                  2000+
                </span>
                <span className="block mt-1 text-sm font-bold text-gray-700 tracking-wide">
                  Projects Completed
                </span>
              </div>
            </div>

            <p className="mt-8 text-sm leading-relaxed text-gray-500 border-t border-gray-200/60 pt-6">
              Successfully installed solar systems across residential,
              commercial, and industrial areas.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
