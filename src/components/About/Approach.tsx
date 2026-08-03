import Reveal from "@/components/Common/Reveal";
import RevealImage from "@/components/Common/RevealImage";
import Image from "next/image";

export default function Approach() {
  return (
    <section className="relative w-full overflow-hidden bg-secondary px-4 py-12 md:px-8 lg:px-16 lg:py-25">
      <div className="solar-container">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left Content Column */}
          <div className="space-y-6 lg:col-span-7">
            <div>
              {/* Badge */}
              <Reveal variant="fade-up">
                <span className="section-eyebrow">Our Approach</span>
              </Reveal>

              {/* Main Heading */}
              <Reveal variant="fade-up" delay={100}>
                <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-accent-500 sm:text-4xl lg:text-[52px] lg:leading-[1.1]">
                  Turning your clean energy vision{" "}
                  <br className="hidden sm:inline" /> into reality
                </h2>
              </Reveal>
            </div>

            {/* Paragraph Description */}
            <Reveal variant="fade-up" delay={180}>
              <p className="max-w-2xl text-sm leading-relaxed text-[#888888] sm:text-base">
                We guide you through every step of your solar journey &ndash;
                from understanding your energy needs and designing the right
                system to expert installation and ongoing support. Our approach
                focuses on smart planning, quality components, and reliable
                execution.
              </p>
            </Reveal>

            {/* Cards Grid Container */}
            <div className="grid grid-cols-1 gap-4 pt-4 sm:grid-cols-3">
              {/* Card 1: Our Mission */}
              <Reveal
                variant="fade-up"
                delay={0}
                className="rounded-lg border border-white/60 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-500 text-white">
                  {/* Server/Solar Matrix Icon */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                    />
                  </svg>
                </div>
                <h3 className="font-heading mt-6 text-lg font-bold text-accent-500">
                  Our Mission
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#888888] sm:text-sm">
                  Replace All The Diesel Generators with Rooftop Solar and BESS
                  Fusion System.
                </p>
              </Reveal>

              {/* Card 2: Our Vision */}
              <Reveal
                variant="fade-up"
                delay={120}
                className="rounded-lg border border-white/60 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-500 text-white">
                  {/* Globe Icon */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3.6 9h16.8M3.6 15h16.8M12 3a15.3 15.3 0 014 9 15.3 15.3 0 01-4 9 15.3 15.3 0 01-4-9 15.3 15.3 0 014-9z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading mt-6 text-lg font-bold text-accent-500">
                  Our Vision
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#888888] sm:text-sm">
                  Let Sunshine Become The New Electricity in Bangladesh.
                </p>
              </Reveal>

              {/* Card 3: Our Values */}
              <Reveal
                variant="fade-up"
                delay={240}
                className="rounded-lg border border-white/60 bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-shadow duration-300 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-500 text-white">
                  {/* Target Icon */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                    />
                  </svg>
                </div>
                <h3 className="font-heading mt-6 text-lg font-bold text-accent-500">
                  Our Values
                </h3>
                <p className="mt-3 text-xs leading-relaxed text-[#888888] sm:text-sm">
                  We are dedicated to creating profits and giving back to
                  society with sunshine.
                </p>
              </Reveal>
            </div>
          </div>

          {/* Right Image Column */}
          <RevealImage
            delay={150}
            className="relative w-full h-87.5 sm:h-112.5 lg:h-137.5 lg:col-span-5 rounded-lg shadow-lg"
          >
            <Image
              src="/images/about/approach-image.jpg" // Place your image asset path here
              alt="Engineers reviewing solar planning on a tablet"
              fill
              priority
              sizes="(max-w-7xl) 100vw, 40vw"
              className="object-cover object-center"
            />
          </RevealImage>
        </div>
      </div>
    </section>
  );
}

