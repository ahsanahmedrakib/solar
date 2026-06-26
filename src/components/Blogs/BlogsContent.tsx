import Link from "next/link";

// Define the structure for our card data
interface BlogsContentsType {
  category: string;
  title: string;
  imageUrl: string;
  linkUrl: string;
}

const cardData: BlogsContentsType[] = [
  {
    category: "Residential Solar",
    title: "A Complete Guide to Solar Energy for Homeowners",
    imageUrl: "/images/blogs/post-1.jpg",
    linkUrl: "#",
  },
  {
    category: "Solar Benefits",
    title: "Top Benefits of Switching to Solar Power in 2026",
    imageUrl: "/images/blogs/post-2.jpg",
    linkUrl: "#",
  },
  {
    category: "Installation Guide",
    title: "How Solar Panels Work: A Simple Guide for Homeowners",
    imageUrl: "/images/blogs/post-3.jpg",
    linkUrl: "#",
  },
  {
    category: "Solar Panels",
    title: "Solar Installation Process Explained Step by Step",
    imageUrl: "/images/blogs/post-4.jpg",
    linkUrl: "#",
  },
  {
    category: "Energy Solutions",
    title: "Residential vs Commercial Solar: Which Is Right for You?",
    imageUrl: "/images/blogs/post-5.jpg",
    linkUrl: "#",
  },
  {
    category: "Solar Maintenance",
    title: "How to Maintain Your Solar System for Peak Performance",
    imageUrl: "/images/blogs/post-6.jpg",
    linkUrl: "#",
  },
];

export default function BlogsContents() {
  return (
    <div className="mx-auto px-4 md:px-8 lg:px-20 py-20 bg-gray-50">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="relative h-105 rounded-2xl overflow-hidden shadow-md group flex flex-col justify-between p-6 text-white"
            style={{
              backgroundImage: `url(${card.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark gradient overlay for text readability */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10 z-0" />

            {/* Top Category Badge */}
            <div className="relative z-10 self-start">
              <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs font-medium px-3 py-1.5 rounded-md border border-white/10 tracking-wide">
                {card.category}
              </span>
            </div>

            {/* Bottom Content Area */}
            <div className="relative z-10 flex flex-col gap-4 mt-auto">
              <h3 className="text-xl lg:text-2xl font-semibold leading-snug tracking-tight">
                {card.title}
              </h3>

              {/* Read More Interactive Call to Action */}
              <Link
                href={card.linkUrl}
                className="flex items-center gap-2 text-sm font-medium w-fit group-hover:text-green-400 transition-colors duration-200"
              >
                <span>Read More</span>
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500 text-white group-hover:bg-green-600 transition-colors duration-200">
                  {/* Custom SVG icon representing the original visual design */}
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
                      d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
