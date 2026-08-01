import Reveal from "@/components/Common/Reveal";
import Image from "next/image";

interface StepItem {
  numberPosition: "left" | "center" | "right";
  title: string;
  description: string;
  bulletPoint: string;
  imageSrc: string;
  imageAlt: string;
}

export default function HowItWorks() {
  const steps: StepItem[] = [
    {
      numberPosition: "left",
      title: "Site Assessment & Financial Modeling",
      description:
        "We evaluate your roof structure, energy consumption patterns, and design a system optimized for maximum savings.",
      bulletPoint: "Free technical and financial assessment",
      imageSrc: "/images/home/how-it-work-image-1.jpg",
      imageAlt: "Solar engineers assessing a site installation",
    },
    {
      numberPosition: "center",
      title: "Engineering & Installation",
      description:
        "Our certified team handles system design, permitting, and professional installation with minimal disruption to your operations.",
      bulletPoint: "Certified engineers and technicians",
      imageSrc: "/images/home/how-it-work-image-2.jpg",
      imageAlt: "Engineers holding a clipboard near solar arrays",
    },
    {
      numberPosition: "right",
      title: "Commissioning & 24/7 Monitoring",
      description:
        "Once operational, your system starts generating clean energy immediately with real-time performance monitoring.",
      bulletPoint: "24/7 remote plant monitoring",
      imageSrc: "/images/home/how-it-work-image-3.jpg",
      imageAlt: "Technicians analyzing performance data metrics on a tablet",
    },
  ];

  return (
    <section
      className="bg-forest-700 text-white py-20 lg:py-25 px-4 sm:px-6 lg:px-8 font-sans relative overflow-hidden"
      style={{
        backgroundImage:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
        backgroundSize: "40px 40px",
      }}
    >
      {/* Decorative subtle ambient backdrop glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="solar-container space-y-16 lg:space-y-24">
        {/* ========================================================================= */}
        {/* TOP HEADER GRID LAYOUT                                                    */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7 space-y-4">
            {/* Tagline Pill Badge */}
            <Reveal variant="fade-up">
              <span className="section-eyebrow">How It Works</span>
            </Reveal>
            {/* Header Main Text */}
            <Reveal variant="fade-up" delay={100}>
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold tracking-tight leading-[1.1] text-white">
                From assessment to energy savings in three steps
              </h2>
            </Reveal>
          </div>

          {/* Header Right Paragraph and CTA Button */}
          <Reveal variant="fade-up" delay={180} className="lg:col-span-5">
            <div className="space-y-5 lg:pl-4">
              <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                From initial site assessment and system design to professional
                installation and ongoing monitoring — our streamlined process
                ensures your rooftop solar project delivers maximum returns.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ========================================================================= */}
        {/* INTERACTIVE THREE-COLUMN STEPS VIEWPORTS                                   */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 pt-8">
          {steps?.map((step, idx) => (
            <Reveal
              key={idx}
              variant="fade-up"
              delay={idx * 160}
              className={`${
                step.numberPosition === "center" ? "lg:translate-y-12" : ""
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-6 max-w-sm mx-auto h-full">
                {/* IMAGE ELEMENT BLOCK WITH FLOATING ICON INTERACTION */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-lg overflow-hidden shadow-xl group">
                  <div className="relative w-full h-full overflow-hidden bg-forest-800">
                    <Image
                      src={step.imageSrc}
                      alt={step.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 30vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-forest-700/20 mix-blend-multiply" />
                  </div>
                </div>

                {/* TEXT CONTENT DESCRIPTION MODULE */}
                <div className="space-y-3 px-2">
                  <h3 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-accent-500 leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-white/60 font-medium leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>

                {/* MICRO GREEN ACCENT LIST FOOTER DOT */}
                <div className="pt-2 border-t border-white/10 w-full max-w-60 flex justify-center mt-auto">
                  <div className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/80 font-medium tracking-wide">
                    <span className="w-2 h-2 bg-gold-500 rounded-full shrink-0"></span>
                    <span>{step.bulletPoint}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

