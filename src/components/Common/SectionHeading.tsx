import Reveal from "@/components/Common/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  badge: string;
  title: string;
  /** Optional emphasised part rendered in the accent color. */
  titleAccent?: string;
  subtitle?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}

/**
 * Consistent Omera-style animated section header:
 * eyebrow label + big Rajdhani heading + optional subtitle.
 */
export default function SectionHeading({
  badge,
  title,
  titleAccent,
  subtitle,
  align = "left",
  dark = false,
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "space-y-4",
        centered && "flex flex-col items-center text-center",
        className,
      )}
    >
      <Reveal variant="fade-up" delay={0}>
        <span className="section-eyebrow">{badge}</span>
      </Reveal>

      <Reveal variant="fade-up" delay={100}>
        <h2
          className={cn(
            "text-3xl sm:text-4xl lg:text-[52px] font-bold tracking-tight leading-[1.1] font-heading",
            dark ? "text-white" : "text-accent-500",
            centered && "max-w-3xl mx-auto",
          )}
        >
          {title}
          {titleAccent && (
            <>
              {" "}
              <span className="text-accent-500">{titleAccent}</span>
            </>
          )}
        </h2>
      </Reveal>

      {subtitle && (
        <Reveal variant="fade-up" delay={200}>
          <p
            className={cn(
              "text-sm sm:text-base leading-relaxed max-w-2xl",
              dark ? "text-white/60" : "text-[#888888]",
              centered && "mx-auto",
            )}
          >
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}

