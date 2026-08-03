import Reveal from "@/components/Common/Reveal";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function HaveQuestions() {
  return (
    <section className="relative w-full overflow-hidden bg-forest-900 py-16 lg:py-24 font-sans">
      {/* Background image with forest tint */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat kenburns-active"
        style={{ backgroundImage: "url('/images/common/page-header-bg.jpg')" }}
      />
      <div className="absolute inset-0 bg-forest-900/85" />

      {/* Content */}
      <div className="relative z-10 solar-container flex flex-col items-center text-center">
        <Reveal variant="fade-up">
          <span className="section-eyebrow mb-4">24/7 Support</span>
        </Reveal>

        <Reveal variant="fade-up" delay={100}>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.1] max-w-3xl">
            Have Questions? We are Here to{" "}
            <span className="text-accent-500">Help You!</span>
          </h2>
        </Reveal>

        <Reveal variant="fade-up" delay={200}>
          <Link href="/contact" className="btn-brand group mt-8">
            Learn More
            <ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
