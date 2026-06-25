import Image from "next/image";

export default function CleanEnergyAbout() {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:py-20 lg:px-18 mx-auto font-sans relative">
      {/* Main Grid Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* ================= LEFT COLUMN: IMAGES & STATS ================= */}
        {/* Container aspect ratio shifted to 1.08/1 to slightly reduce the overall height */}
        <div className="relative w-full max-w-135 mx-auto aspect-[0.92/1] lg:col-span-6 order-2 lg:order-1 mt-12 lg:mt-0 select-none">
          {/* 1. Top Left Image (Office / Turbine Team) */}
          <div className="absolute top-0 left-0 w-[70%] h-[64%] rounded-xl overflow-hidden shadow-sm ">
            <Image
              src="/images/home/about-us-image-1.jpg"
              alt="Team discussing clean energy"
              fill
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="object-cover"
              priority
            />
          </div>

          {/* 2. Rotating "Contact Us" Badge */}
          {/* Positioned accurately to the top right of the composition */}
          <div className="absolute top-4 right-5 z-30 w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 animate-[spin_25s_linear_infinite] origin-center">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                id="contactBadgePath"
                d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                className="fill-none"
              />
              {/* Dark Navy Inner Center Circle */}
              <circle cx="50" cy="50" r="16" className="fill-[#051720]" />
              {/* White Lightning Bolt Vector Icon */}
              <path
                d="M49 38L43 49H49L48 58L57 45H49L52 38H49Z"
                className="fill-green stroke-white"
                strokeWidth="1"
                strokeLinejoin="round"
              />
              {/* Bright Green Text Ring */}
              <text className="text-[9.5px] font-extrabold fill-[#44B549] tracking-[2.2px]">
                <textPath href="#contactBadgePath">
                  * Contact Us * Contact Us * Contact Us{" "}
                </textPath>
              </text>
            </svg>
          </div>

          {/* 3. Bottom Left Experience Card */}
          {/* Aligned natively underneath the left edge of the top image */}
          <div className="absolute bottom-0 left-0 w-[42%] aspect-[1/.85] flex flex-col justify-center items-center bg-[#03141F] text-white p-4 rounded-xl shadow-md text-center z-20">
            <h3 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-1 text-white">
              25+
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 font-semibold leading-snug">
              Years Of
              <br />
              Experience
            </p>
          </div>

          {/* 4. Right Big Image (Engineers Walking) */}
          {/* Elevated with thick white borders to emphasize the clean overlap cut layer */}
          <div className="absolute bottom-0 right-0 w-[56%] h-[74%] rounded-xl overflow-hidden shadow-2xl border-4 sm:border-8 border-white z-10">
            <Image
              src="/images/home/about-us-image-2.jpg"
              alt="Engineers walking on site"
              fill
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* ================= RIGHT COLUMN: CONTENT ================= */}
        <div className="lg:col-span-6 lg:pl-10 space-y-6 order-1 lg:order-2">
          {/* Section Subtitle Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F3F4F6] px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700">
            <span className="w-1.5 h-1.5 bg-[#31A24C] rounded-full"></span>
            About Our Company
          </div>

          {/* Main Title Heading */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051720] tracking-tight leading-[1.15]">
            Building a green tomorrow through clean energy
          </h2>

          {/* Paragraph Text */}
          <p className="text-gray-500 text-sm sm:text-base font-normal leading-relaxed max-w-xl">
            We are committed to delivering reliable, efficient, and sustainable
            solar solutions that help homes and businesses reduce energy costs.
          </p>

          <hr className="border-gray-100 my-6" />

          {/* Features Block with Mini Image Grid alignment */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
            {/* Core Features List */}
            <div className="sm:col-span-7 space-y-6">
              {/* Feature Item 1 */}
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-11 h-11 rounded-full bg-[#31A24C] text-white flex items-center justify-center shadow-sm">
                  {/* Target Crosshair Icon style matching mockup */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 3v3m0 12v3M3 12h3m12 0h3m-9-6a6 6 0 110 12 6 6 0 010-12z"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#051720] mb-1">
                    Expertise You Can Trust
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-normal">
                    Our team consists certified with professionals hands-on
                    experience.
                  </p>
                </div>
              </div>

              {/* Feature Item 2 */}
              <div className="flex gap-4 items-start">
                <div className="shrink-0 w-11 h-11 rounded-full bg-[#31A24C] text-white flex items-center justify-center shadow-sm">
                  {/* Grid/Box Outline Icon style matching mockup */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25M19.5 4.5l-15 0"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-bold text-[#051720] mb-1">
                    Customized Solar Solutions
                  </h4>
                  <p className="text-xs sm:text-sm text-gray-500 leading-normal">
                    {
                      "That's why design tailor solar system that maximize efficiency, perform."
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Inset Photo (Solar Panels Installation) */}
            <div className="sm:col-span-5 relative w-full aspect-4/3 sm:aspect-square rounded-2xl overflow-hidden shadow-sm bg-gray-100">
              <Image
                src="/images/home/about-us-body-image.jpg"
                alt="Solar fields installation"
                fill
                sizes="(max-width: 640px) 100vw, 20vw"
                className="object-cover"
              />
            </div>
          </div>

          {/* Bottom Action Footer Container */}
          <div className="pt-4 flex flex-row flex-wrap items-center gap-6">
            {/* CTA Button */}
            <button className="inline-flex items-center gap-2 bg-[#44B549] hover:bg-[#399d3e] transition-colors text-white font-semibold text-sm px-6 py-3.5 rounded-lg shadow-sm group">
              More About Us
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </button>

            {/* Video Play Trigger */}
            <button className="inline-flex items-center gap-3 group">
              <div className="w-12 h-12 rounded-full bg-[#051720] text-white flex items-center justify-center transition-transform group-hover:scale-105 shadow-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  className="w-5 h-5 ml-0.5 text-white"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-sm font-bold text-[#051720] group-hover:text-[#44B549] transition-colors">
                Watch Our Story
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
