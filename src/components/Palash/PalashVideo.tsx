import Reveal from "@/components/Common/Reveal";

const VIDEO_URL =
  "https://drive.google.com/file/d/16Vmtfknf7_4Di-jlXJmsyGQ_iuUOlNzR/preview";

export default function PalashVideo() {
  return (
    <section className="bg-white py-20 lg:py-25 px-4 sm:px-6 lg:px-8 font-sans overflow-x-hidden">
      <div className="solar-container">
        <div className="text-center mb-12 space-y-4">
          <Reveal variant="fade-up">
            <span className="section-eyebrow justify-center">
              Watch Our Story
            </span>
          </Reveal>
          <Reveal variant="fade-up" delay={100}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold tracking-tight leading-[1.1] text-accent-500">
              See Palash Charging Station in Action
            </h2>
          </Reveal>
        </div>

        <Reveal variant="fade-up" delay={180}>
          <div className="relative solar-container aspect-video rounded-lg overflow-hidden shadow-xl">
            <iframe
              src={VIDEO_URL}
              title="Palash Charging Station video"
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media; fullscreen"
              allowFullScreen
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

