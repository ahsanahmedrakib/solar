import Image from "next/image";

interface BlogCard {
  id: number;
  title: string;
  category: string;
  imageSrc: string;
  imageAlt: string;
}

export default function Blogs() {
  const blogs: BlogCard[] = [
    {
      id: 1,
      title: "A Complete Guide to Solar Energy for Homeowners",
      category: "Residential Solar",
      imageSrc: "/images/home/post-1.jpg",
      imageAlt: "Two solar technicians assembling an array layout on a rooftop",
    },
    {
      id: 2,
      title: "Top Benefits of Switching to Solar Power in 2026",
      category: "Solar Benefits",
      imageSrc: "/images/home/post-2.jpg",
      imageAlt:
        "A happy smiling middle-aged couple standing in front of their solar-powered house",
    },
    {
      id: 3,
      title: "Solar Installation Process Explained Step by Step",
      category: "Installation Guide",
      imageSrc: "/images/home/post-3.jpg",
      imageAlt:
        "A solar supervisor in a hard hat reviewing installation logistics on a tablet with a worker",
    },
  ];

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:py-24 lg:px-20 mx-auto font-sans overflow-x-hidden">
      <div className="space-y-12 lg:space-y-16">
        {/* ========================================================================= */}
        {/* TOP HEADER BLOCK: INTRO AND CALL-TO-ACTION                               */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
          {/* Left Title Grid Box */}
          <div className="lg:col-span-7 space-y-4">
            {/* Tagline Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-[#F3F4F6] px-3 py-1.5 rounded-full text-xs font-semibold text-gray-700">
              <span className="w-1.5 h-1.5 bg-[#44B549] rounded-full"></span>
              Latest Blogs
            </div>
            {/* Main Headline Heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#051720] tracking-tight leading-[1.15]">
              Insights, trend and updates from the solar industry
            </h2>
          </div>

          {/* Right Paragraph & Button Grid Box */}
          <div className="lg:col-span-5 space-y-5 lg:pl-6">
            <p className="text-gray-500 text-sm sm:text-base font-normal leading-relaxed">
              Stay up to date with in-depth insights, emerging trends, and
              important updates from the solar industry. Our articles cover
              everything from new.
            </p>
            <div>
              <button className="inline-flex items-center gap-2 bg-[#44B549] hover:bg-[#399d3e] transition-colors text-white font-semibold text-sm px-6 py-3.5 rounded-lg shadow-sm group">
                View All Blogs
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="w-4 h-4 transform transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* BOTTOM CONTENT BLOCK: 3-COLUMN IMAGE CARD MASK GRID                       */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="relative w-full aspect-[0.84/1] rounded-4xl overflow-hidden group shadow-md bg-gray-100 cursor-pointer"
            >
              {/* Main Card Background Image Asset */}
              <Image
                src={blog.imageSrc}
                alt={blog.imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Bottom Gradient Overlay Mask for Text Scannability */}
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-black/10 z-10" />

              {/* Card Foreground Content Elements */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-20">
                {/* Upper Level: Floating Category Capsule Tag */}
                <div>
                  <span className="inline-block bg-white/20 backdrop-blur-md text-white text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-md tracking-wide">
                    {blog.category}
                  </span>
                </div>

                {/* Lower Level: Title Text and Action Arrow Button */}
                <div className="space-y-4 sm:space-y-5">
                  <h3 className="text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight">
                    {blog.title}
                  </h3>

                  {/* Read More Trigger Group */}
                  <div className="flex items-center gap-2 pt-1 border-t border-white/10">
                    <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      Read More
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#44B549] text-white flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-3 h-3"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
