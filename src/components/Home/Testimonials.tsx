import Image from "next/image";

interface Testimonial {
  id: number;
  rating: number;
  quote: string;
  name: string;
  role: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      rating: 5,
      quote:
        "Switching to solar was one of the best decisions we made. The installation was seamless and our electricity bills dropped.",
      name: "Cameron Williamson",
      role: "Home Owner",
    },
    {
      id: 2,
      rating: 5,
      quote:
        "The team provided a solar solution for our residential complex. Professional approach, transparent pricing.",
      name: "Leslie Alexander",
      role: "Retail Store Owner",
    },
  ];

  return (
    <section className="bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:py-24 lg:px-8 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* ========================================================================= */}
          {/* LEFT COLUMN: INTRODUCTION & TRUST ACCENT BOX                              */}
          {/* ========================================================================= */}
          <div className="lg:col-span-5 space-y-6">
            {/* Tagline Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700 shadow-sm border border-gray-100">
              <span className="w-1.5 h-1.5 bg-[#44B549] rounded-full"></span>
              Our Testimonials
            </div>

            {/* Main Headline Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051720] tracking-tight leading-[1.15]">
              Customers sharing their journey to solar
            </h2>

            {/* View All CTAs Action Trigger */}
            <div className="pt-2">
              <button className="inline-flex items-center gap-2 bg-[#44B549] hover:bg-[#399d3e] transition-colors text-white font-semibold text-sm px-6 py-3.5 rounded-lg shadow-sm">
                View All Testimonials
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </button>
            </div>

            {/* Overall Rating & Avatars Stack Overlay Badge */}
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm max-w-sm mt-8 space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl font-extrabold text-[#051720]">
                  4.9/5
                </span>
                <div className="flex text-[#44B549]">
                  {[...Array(5)]?.map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      className="w-5 h-5"
                    >
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                  ))}
                </div>
              </div>

              {/* Stacked Face Bundle Ring Layout */}
              <div className="flex items-center gap-4 pt-1">
                <div className="flex -space-x-2 overflow-hidden">
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 relative">
                    <Image
                      fill
                      className="object-cover rounded-full"
                      src="/images/home/author-1.jpg"
                      alt="User review"
                    />
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 relative">
                    <Image
                      fill
                      className="object-cover rounded-full"
                      src="/images/home/author-2.jpg"
                      alt="User review"
                    />
                  </div>
                  <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-200 relative">
                    <Image
                      fill
                      className="object-cover rounded-full"
                      src="/images/home/author-3.jpg"
                      alt="User review"
                    />
                  </div>
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#44B549] text-white ring-2 ring-white text-[11px] font-bold">
                    +
                  </div>
                </div>
                <p className="text-xs font-bold text-gray-500 leading-tight">
                  5K+ Customer Trust <br />
                  Our Solar
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* RIGHT COLUMN: SCROLLABLE CARDS TRACK SLIDER LAYER                         */}
          {/* ========================================================================= */}
          <div className="lg:col-span-7 w-full overflow-x-auto pb-6 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 snap-x snap-mandatory flex gap-6">
            {testimonials?.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-100 shadow-sm shrink-0 w-72.5 sm:w-85 snap-start flex flex-col justify-between space-y-8 transition-all duration-300 hover:shadow-md"
              >
                <div className="space-y-4">
                  {/* Card Micro-Star Ratings Row */}
                  <div className="flex text-[#44B549]">
                    {[...Array(item.rating)]?.map((_, idx) => (
                      <svg
                        key={idx}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="w-4 h-4 mr-0.5"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    ))}
                  </div>
                  {/* Clean Quoted Text Representation */}
                  <p className="text-sm sm:text-base font-bold text-[#051720] leading-snug tracking-tight">
                    “{item.quote}”
                  </p>
                </div>

                {/* Card Author Signature Block Area */}
                <div className="pt-4 border-t border-gray-100/80">
                  <h4 className="text-base font-bold text-[#051720] tracking-tight">
                    {item.name}
                  </h4>
                  <p className="text-xs sm:text-sm font-semibold text-gray-400 mt-0.5">
                    {item.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
