import Reveal from "@/components/Common/Reveal";
import Link from "next/link";

interface PageBannerProps {
  /** Main H1 heading. */
  title: string;
  /** Optional bold accent word rendered in lime after the title. */
  titleAccent?: string;
  /** Label shown as the active breadcrumb item. */
  crumb: string;
  /** Optional intermediate breadcrumb link (e.g. Services before a single item). */
  crumbParent?: { label: string; href: string };
  /** Background image. Defaults to the shared page-header image. */
  image?: string;
  /** Optional extra right-aligned kicker text above the heading. */
  eyebrow?: string;
}

/**
 * Omera-style sub-page hero banner: forest-tinted background image,
 * Rajdhani uppercase heading, and a breadcrumb with lime hover.
 */
export default function PageBanner({
  title,
  titleAccent,
  crumb,
  crumbParent,
  image = "/images/aheadsolar/banner.jpg",
  eyebrow,
}: PageBannerProps) {
  return (
    <section className="relative w-full h-65 sm:h-80 lg:h-100 flex items-center justify-center overflow-hidden">
      {/* 1. Background Image Layer with Ken Burns zoom */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat kenburns-active"
        style={{ backgroundImage: `url('${image}')` }}
      />

      {/* 2. Forest tint overlays for text legibility */}
      <div className="absolute inset-0 bg-linear-to-r from-forest-900/45 via-forest-900/30 to-forest-900/20" />
      <div className="absolute inset-0 bg-forest-900/20" />

      {/* 3. Central Typography Content Block */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center justify-center h-full pt-6 text-gold-500">
        {eyebrow && (
          <Reveal variant="fade-down" duration={800}>
            <span className="section-eyebrow mb-3">{eyebrow}</span>
          </Reveal>
        )}

        {/* Main Section Header Title */}
        <Reveal variant="fade-down" duration={800}>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[64px] font-bold text-white uppercase tracking-tight drop-shadow-sm mb-3 sm:mb-4">
            {title}{" "}
            {titleAccent && (
              <span className="text-accent-500">{titleAccent}</span>
            )}
          </h1>
        </Reveal>

        {/* Breadcrumb Navigation System */}
        <Reveal variant="fade-up" delay={180} duration={800}>
          <nav className="flex items-center space-x-2 text-sm sm:text-base font-semibold drop-shadow-sm">
            <Link
              href="/"
              className="text-white/70 hover:text-accent-400 transition-colors duration-200 tracking-wide"
            >
              Home
            </Link>

            <span className="text-accent-500 font-medium select-none">/</span>

            {crumbParent && (
              <>
                <Link
                  href={crumbParent.href}
                  className="text-white/70 hover:text-accent-400 transition-colors duration-200 tracking-wide"
                >
                  {crumbParent.label}
                </Link>

                <span className="text-accent-500 font-medium select-none">
                  /
                </span>
              </>
            )}

            <span className="text-white tracking-wide">{crumb}</span>
          </nav>
        </Reveal>

        {/* Decorative accent underline */}
        <Reveal variant="scale" delay={320} duration={700}>
          <div className="mt-5 h-1 w-16 rounded-full bg-accent-500" />
        </Reveal>
      </div>

      {/* Optional decorative bottom line highlight */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/10" />
    </section>
  );
}

