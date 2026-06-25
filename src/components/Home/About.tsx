import Image from "next/image";

export default function CleanEnergyAbout() {
  return (
    <section className="bg-white py-12 px-4 sm:px-6 lg:py-20 lg:px-18 mx-auto font-sans relative">
      {/* Main Grid Wrapper */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* ================= LEFT COLUMN: IMAGES & STATS ================= */}
        {/* Container aspect ratio shifted to 1.08/1 to slightly reduce the overall height */}
        <div className="relative w-full max-w-142.5 mx-auto aspect-[1.08/1] lg:col-span-6 order-2 lg:order-1 mt-12 lg:mt-0">
          {/* 1. Top Left Image (Office / Turbine Team) */}
          {/* Height brought down to 70% for a cleaner look */}
          <div className="absolute top-0 left-0 w-[58%] h-[70%] rounded-3xl overflow-hidden shadow-sm bg-gray-100">
            <Image
              src="/images/home/about-us-image-1.jpg"
              alt="Team discussing clean energy"
              fill
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="object-cover"
              priority
            />
          </div>

          {/* 2. Right Big Image (Engineers Walking) */}
          {/* Height set to 84% to perfectly balance the overlap without stretching too far */}
          <div className="absolute bottom-0 right-0 w-[58%] h-[84%] rounded-3xl overflow-hidden shadow-md z-10 bg-gray-100">
            <Image
              src="/images/home/about-us-image-2.jpg"
              alt="Engineers walking on site"
              fill
              sizes="(max-width: 1024px) 50vw, 30vw"
              className="object-cover"
            />
          </div>

          {/* 3. Bottom Left Experience Card */}
          <div className="absolute bottom-0 left-0 w-[38%] aspect-square flex flex-col justify-center bg-[#051720] text-white p-4 sm:p-6 rounded-3xl shadow-sm text-center z-20">
            <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-1">
              25+
            </h3>
            <p className="text-[9px] sm:text-xs text-gray-400 font-medium tracking-wider uppercase leading-tight">
              Years Of
              <br />
              Experience
            </p>
          </div>

          {/* 4. Rotating "Contact Us" Badge */}
          {/* Positioned cleanly on the new intersection point */}
          <div className="absolute top-[1%] right-[15%] z-30 w-16 h-16 sm:w-24 sm:h-24 bg-[#31A24C] rounded-full flex items-center justify-center shadow-md border-4 border-white">
            <div className="relative w-full h-full flex items-center justify-center animate-[spin_15s_linear_infinite]">
              <svg className="w-full h-full absolute" viewBox="0 0 100 100">
                <path
                  id="circlePath"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text className="text-[10px] font-bold fill-white uppercase tracking-[0.18em]">
                  <textPath href="#circlePath" startOffset="0%">
                    • Contact Us • Contact Us
                  </textPath>
                </text>
              </svg>
              {/* Center Bolt Icon */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#061A23] flex items-center justify-center z-10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-3 h-3 sm:w-4 sm:h-4 text-white"
                >
                  <path d="M12 2L3.5 14h7V22l8.5-12h-7z" />
                </svg>
              </div>
            </div>
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
