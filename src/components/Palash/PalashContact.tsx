import Reveal from "@/components/Common/Reveal";
import { SOCIAL_ICONS } from "@/lib/const";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import type { ReactNode } from "react";

const PALASH_FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61589795817520";
const PALASH_PHONE_DISPLAY = "01335-127307";
const PALASH_PHONE_TEL = "tel:+8801335127307";
const PALASH_EMAIL = "solarahead.re@gmail.com";
const PALASH_MAP_EMBED_URL =
  "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d1422.6220272309374!2d90.37387910856147!3d23.98919654091044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjPCsDU5JzIwLjAiTiA5MMKwMjInMzAuMCJF!5e1!3m2!1sen!2sbd!4v1785743688050!5m2!1sen!2sbd";

interface ContactLink {
  label: string;
  title: string;
  icon: ReactNode;
  href: string;
  external: boolean;
}

const contactLinks: ContactLink[] = [
  {
    label: "Facebook Page",
    title: "Palash Charging Station",
    icon: SOCIAL_ICONS.facebook,
    href: PALASH_FACEBOOK_URL,
    external: true,
  },
  {
    label: "Phone / WhatsApp",
    title: PALASH_PHONE_DISPLAY,
    icon: <Phone size={22} />,
    href: PALASH_PHONE_TEL,
    external: false,
  },
  {
    label: "Email",
    title: PALASH_EMAIL,
    icon: <Mail size={22} />,
    href: `mailto:${PALASH_EMAIL}`,
    external: false,
  },
];

export default function PalashContact() {
  return (
    <section className="bg-forest-900 py-20 lg:py-25 px-4 sm:px-6 lg:px-8 font-sans overflow-x-hidden">
      <div className="solar-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-10 items-stretch">
        {/* Left: Contact Info */}
        <div className="space-y-6">
          <Reveal variant="fade-up">
            <span className="section-eyebrow">Contact & Location</span>
          </Reveal>

          <Reveal variant="fade-up" delay={100}>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-[52px] font-bold text-white tracking-tight leading-[1.1]">
              Reach Out to{" "}
              <span className="text-accent-500">Palash Charging Station</span>
            </h2>
          </Reveal>

          <Reveal variant="fade-up" delay={180}>
            <p className="text-white/70 text-sm sm:text-base font-normal leading-relaxed">
              Visit our charging station or contact our team for lithium battery
              rental, charging services, dealership and partnership inquiries.
            </p>
          </Reveal>

          <div className="flex flex-col gap-4 pt-2">
            {contactLinks.map((item, index) => {
              return (
                <Reveal
                  key={item.label}
                  variant="fade-up"
                  delay={220 + index * 80}
                >
                  <a
                    href={item.href}
                    target={item.external ? "_blank" : undefined}
                    rel={item.external ? "noopener noreferrer" : undefined}
                    className="group flex items-center gap-4 bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 hover:border-accent-500/40 transition-all duration-300"
                  >
                    <div className="w-12 h-12 shrink-0 rounded-[16px] bg-accent-500/15 text-accent-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                      {item.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white/50 text-[11px] font-bold uppercase tracking-wider">
                        {item.label}
                      </p>
                      <p className="text-white text-sm sm:text-base font-semibold mt-0.5 truncate group-hover:text-accent-500 transition-colors">
                        {item.title}
                      </p>
                    </div>
                    <ArrowUpRight
                      size={18}
                      className="text-white/40 group-hover:text-accent-500 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 shrink-0"
                    />
                  </a>
                </Reveal>
              );
            })}
          </div>

          <Reveal variant="fade-up" delay={460}>
            <div className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="w-12 h-12 shrink-0 rounded-[16px] bg-gold-500/15 text-gold-500 flex items-center justify-center">
                <MapPin size={22} />
              </div>
              <div className="min-w-0">
                <p className="text-white/50 text-[11px] font-bold uppercase tracking-wider">
                  Location
                </p>
                <p className="text-white text-sm sm:text-base font-semibold mt-0.5 leading-relaxed">
                  Mouchak, Kaliakoir, Gazipur, Dhaka, Bangladesh, 1751
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Right: Map */}
        <Reveal variant="slide-left" delay={150} className="h-full">
          <div className="relative w-full h-80 sm:h-96 lg:h-full min-h-80 lg:min-h-112.5 rounded-2xl overflow-hidden border border-white/10 shadow-xl">
            <iframe
              title="Palash Charging Station location map"
              src={PALASH_MAP_EMBED_URL}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

