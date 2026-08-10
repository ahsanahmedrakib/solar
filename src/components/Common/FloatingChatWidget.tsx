"use client";

import type { Section } from "@/data/settings";
import { DEFAULT_SECTIONS } from "@/data/settings";
import { useQuerySettings } from "@/lib/queries";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

interface ChatSettings {
  showWhatsapp: boolean;
  whatsappNumber: string;
  whatsappMessage: string;
  showMessenger: boolean;
  messengerUsername: string;
  showFacebook: boolean;
  facebookUrl: string;
  showLinkedin: boolean;
  linkedinUrl: string;
  showYoutube: boolean;
  youtubeUrl: string;
}

function getField(
  sec: Section | undefined,
  id: string,
  fallback: string,
): string {
  return sec?.fields?.find((f) => f.id === id)?.value ?? fallback;
}

function getToggle(
  sec: Section | undefined,
  id: string,
  fallback: boolean,
): boolean {
  return sec?.toggles?.find((t) => t.id === id)?.checked ?? fallback;
}

function buildSettings(sections: Section[]): ChatSettings {
  const sec = sections.find((s) => s.id === "chat-widgets");
  const rawPhone = getField(sec, "whatsapp-number", "18005557652").replace(
    /[^0-9]/g,
    "",
  );
  return {
    showWhatsapp: getToggle(sec, "show-whatsapp", true),
    whatsappNumber: rawPhone,
    whatsappMessage: getField(
      sec,
      "whatsapp-message",
      "Hello! I would like to inquire about solar energy solutions.",
    ),
    showMessenger: getToggle(sec, "show-messenger", true),
    messengerUsername: getField(sec, "messenger-username", "sunexsolar"),

    showFacebook: getToggle(sec, "show-facebook", true),
    facebookUrl: getField(
      sec,
      "facebook-url",
      "https://www.facebook.com/profile.php?id=61591154285690",
    ),
    showLinkedin: getToggle(sec, "show-linkedin", true),
    linkedinUrl: getField(
      sec,
      "linkedin-url",
      "https://www.linkedin.com/company/ahead-solar-ltd/",
    ),
    showYoutube: getToggle(sec, "show-youtube", true),
    youtubeUrl: getField(sec, "youtube-url", ""),
  };
}

const DEFAULTS = buildSettings(DEFAULT_SECTIONS);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const MessengerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.304 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.96 3.131 3.259 5.887-3.259-6.559 6.961z" />
  </svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0z" />
  </svg>
);

const YouTubeIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default function FloatingChatWidget() {
  const pathname = usePathname();
  const { data, isFetching: settingsLoading } = useQuerySettings();
  const settings = useMemo(
    () => (data ? buildSettings(data) : DEFAULTS),
    [data],
  );

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 1);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const mounted = !settingsLoading;

  if (!mounted) return null;
  if (pathname?.startsWith("/admin")) return null;

  const waUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`;
  const meUrl = `https://m.me/${settings.messengerUsername}`;

  const socialIcons = [
    {
      key: "whatsapp",
      show: settings.showWhatsapp,
      href: waUrl,
      title: "Chat on WhatsApp",
      label: "WhatsApp Us",
      background: "#25D366",
      Icon: WhatsAppIcon,
    },
    {
      key: "messenger",
      show: settings.showMessenger,
      href: meUrl,
      title: "Chat on Messenger",
      label: "Messenger",
      background: "#0084FF",
      Icon: MessengerIcon,
    },
    {
      key: "facebook",
      show: settings.showFacebook,
      href: settings.facebookUrl,
      title: "Visit our Facebook page",
      label: "Facebook",
      background: "#1877F2",
      Icon: FacebookIcon,
    },
    {
      key: "linkedin",
      show: settings.showLinkedin,
      href: settings.linkedinUrl,
      title: "Visit our LinkedIn page",
      label: "LinkedIn",
      background: "#0A66C2",
      Icon: LinkedInIcon,
    },
    {
      key: "youtube",
      show: settings.showYoutube,
      href: settings.youtubeUrl,
      title: "Subscribe to our YouTube channel",
      label: "YouTube",
      background: "#FF0000",
      Icon: YouTubeIcon,
    },
  ].filter((icon) => icon.show && icon.href.trim());

  if (socialIcons.length === 0) return null;

  const count = socialIcons.length;

  return (
    <div
      className="chat-widget-in"
      style={{
        position: "fixed",
        right: "15px",
        top: "50%",
        zIndex: 50,
      }}
    >
      <div style={{ transform: "translateY(-50%)" }}>
        <div className="flex flex-col items-end gap-3">
          <div className="flex flex-col gap-2">
            {socialIcons.map((icon, index) => {
              const revealed = progress >= (index + 1) / (count + 1);
              return (
                <div
                  key={icon.key}
                  style={{
                    position: "relative",
                    opacity: revealed ? 1 : 0,
                    transform: revealed
                      ? "translateY(0) scale(1)"
                      : "translateY(16px) scale(0.6)",
                    transition:
                      "opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1), transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
                    pointerEvents: revealed ? "auto" : "none",
                  }}
                  className="group"
                >
                  <a
                    href={icon.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: icon.background,
                      color: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      textDecoration: "none",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.transform = "scale(1.12)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.transform = "scale(1)")
                    }
                    title={icon.title}
                  >
                    <icon.Icon />
                  </a>
                  <span
                    className="group-hover:opacity-100"
                    style={{
                      position: "absolute",
                      right: "calc(100% + 10px)",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "#1e293b",
                      color: "#fff",
                      fontSize: "11px",
                      fontWeight: 600,
                      padding: "4px 10px",
                      borderRadius: "6px",
                      whiteSpace: "nowrap",
                      opacity: 0,
                      transition: "opacity 0.2s",
                      pointerEvents: "none",
                    }}
                  >
                    {icon.label}
                  </span>
                </div>
              );
            })}

            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "#1e293b",
                color: "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
                border: "none",
                cursor: "pointer",
                transition: "transform 0.2s",
                marginLeft: "4px",
              }}
              className="chat-btn-pop"
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.12)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
              title="Back to top"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
