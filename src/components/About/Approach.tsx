import Image from "next/image";

export default function Approach() {
  return (
    <section className="relative w-full overflow-hidden bg-[#fafbfc] px-4 py-12 md:px-8 lg:px-16 lg:py-24">
      {/* Floating utility sidebar mockup on the far right (optional, match image design) */}
      <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 flex-col gap-2 rounded-l-md border border-r-0 border-gray-200 bg-white p-2 shadow-sm md:flex">
        <button className="p-2 text-gray-600 hover:text-green-600">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </button>
        <button className="p-2 text-gray-600 hover:text-green-600">
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </button>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Content Column */}
          <div className="space-y-6 lg:col-span-7">
            <div>
              {/* Badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                Our Approach
              </span>

              {/* Main Heading */}
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0B2545] sm:text-4xl lg:text-5xl lg:leading-[1.15]">
                Turning your clean energy vision{" "}
                <br className="hidden sm:inline" /> into reality
              </h2>
            </div>

            {/* Paragraph Description */}
            <p className="max-w-2xl text-sm leading-relaxed text-gray-500 sm:text-base">
              We guide you through every step of your solar journey &ndash; from
              understanding your energy needs and designing the right system to
              expert installation and ongoing support. Our approach focuses on
              smart planning, quality components, and reliable execution.
            </p>

            {/* Cards Grid Container */}
            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
              {/* Card 1: Our Mission */}
              <div className="rounded-2xl border border-gray-50/50 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#34A853]">
                  {/* Server/Solar Matrix Icon */}
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-bold text-[#0B2545]">
                  Our Mission
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-gray-500 sm:text-sm">
                  Our mission is to make clean, reliable affordable solar energy
                  accessible to homes.
                </p>
              </div>

              {/* Card 2: Our Vision */}
              <div className="rounded-2xl border border-gray-50/50 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#34A853]">
                  {/* Globe Icon */}
                  <svg
                    className="h-6 w-6 text-white"
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
                <h3 className="mt-6 text-lg font-bold text-[#0B2545]">
                  Our Vision
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-gray-500 sm:text-sm">
                  Our vision is to lead the transition to a cleaner &amp; more
                  sustainable energy future.
                </p>
              </div>

              {/* Card 3: Our Values */}
              <div className="rounded-2xl border border-gray-50/50 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-md">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#34A853]">
                  {/* Target Icon */}
                  <svg
                    className="h-6 w-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </div>
                <h3 className="mt-6 text-lg font-bold text-[#0B2545]">
                  Our Values
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-gray-500 sm:text-sm">
                  We believe putting customer first, delivering reliable and
                  efficient solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="relative w-full h-87.5 sm:h-112.5 lg:h-137.5 lg:col-span-5">
            <div className="relative h-full w-full overflow-hidden rounded-xl shadow-lg">
              <Image
                src="/images/about/approach-image.jpg" // Place your image asset path here
                alt="Engineers reviewing solar planning on a tablet"
                fill
                priority
                sizes="(max-w-7xl) 100vw, 40vw"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
