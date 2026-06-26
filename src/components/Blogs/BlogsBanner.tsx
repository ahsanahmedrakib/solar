import Link from "next/link";

export default function BlogsBanner() {
  return (
    <section className="relative w-full h-65 sm:h-80 lg:h-100 flex items-center justify-center overflow-hidden bg-[#04111c]">
      {/* 1. Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
        style={{
          // Replace with your local asset path containing the solar panels + cityscape skyline
          backgroundImage: `url('/images/common/page-header-bg.jpg')`,
        }}
      />

      {/* 2. Linear Contrast Gradient Overlays matching the image profile */}
      {/* Dark tint on the left half for text legibility, clearing into solar rays on the right */}
      <div className="absolute inset-0 bg-linear-to-r from-[#030e17]/90 via-[#051624]/60 to-transparent" />
      <div className="absolute inset-0 bg-black/20" />

      {/* 3. Central Typography Content Block */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center h-full pt-6">
        {/* Main Section Header Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-sm mb-3 sm:mb-4 animate-fade-in">
          Latest Articles
        </h1>

        {/* Breadcrumb Navigation System */}
        <nav className="flex items-center space-x-2 text-sm sm:text-base font-semibold drop-shadow-sm">
          <Link
            href="/"
            className="text-gray-200 hover:text-[#44B549] transition-colors duration-200 tracking-wide"
          >
            Home
          </Link>

          <span className="text-gray-400 font-medium select-none">/</span>

          <span className="text-white tracking-wide">Blogs</span>
        </nav>
      </div>

      {/* Optional decorative bottom line highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
}
