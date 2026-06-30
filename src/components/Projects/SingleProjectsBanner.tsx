import Link from "next/link";

export default function SingleProjectsBanner({ title }: { title: string }) {
  return (
    <section className="relative w-full h-65 sm:h-80 lg:h-100 flex items-center justify-center overflow-hidden bg-[#04111c]">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 hover:scale-105"
        style={{
          backgroundImage: `url('/images/common/page-header-bg.jpg')`,
        }}
      />

      <div className="absolute inset-0 bg-linear-to-r from-[#030e17]/90 via-[#051624]/60 to-transparent" />
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center h-full pt-6">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight drop-shadow-sm mb-3 sm:mb-4 animate-fade-in">
          {title}
        </h1>

        <nav className="flex items-center space-x-2 text-sm sm:text-base font-semibold drop-shadow-sm">
          <Link
            href="/"
            className="text-gray-200 hover:text-[#44B549] transition-colors duration-200 tracking-wide"
          >
            Home
          </Link>

          <span className="text-gray-400 font-medium select-none">/</span>

          <Link
            href="/projects"
            className="text-gray-200 hover:text-[#44B549] transition-colors duration-200 tracking-wide"
          >
            Projects
          </Link>

          <span className="text-gray-400 font-medium select-none">/</span>

          <span className="text-white tracking-wide">{title}</span>
        </nav>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
}
