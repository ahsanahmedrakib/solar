"use client";

import type { Section } from "@/data/settings";
import { DEFAULT_SECTIONS } from "@/data/settings";
import { useQuerySettings } from "@/lib/queries";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

interface ChatSettings {
  showWhatsapp: boolean;
  whatsappNumber: string;
  whatsappMessage: string;
  showMessenger: boolean;
  messengerUsername: string;
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
  };
}

const DEFAULTS = buildSettings(DEFAULT_SECTIONS);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const MessengerIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.304 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.559-6.96 3.131 3.259 5.887-3.259-6.559 6.961z" />
  </svg>
);

export default function FloatingChatWidget() {
  const pathname = usePathname();
  const { data, isFetching: settingsLoading } = useQuerySettings();
  const [isOpen, setIsOpen] = useState(false);

  const settings = useMemo(
    () => (data ? buildSettings(data) : DEFAULTS),
    [data],
  );

  const mounted = !settingsLoading;

  if (!mounted) return null;
  if (pathname?.startsWith("/admin")) return null;
  if (!settings.showWhatsapp && !settings.showMessenger) return null;

  const waUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`;
  const meUrl = `https://m.me/${settings.messengerUsername}`;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
      )}

      <div
        style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50 }}
        className="flex flex-col items-end gap-3"
      >
        <div className="flex flex-col gap-2">
          {!isOpen && settings.showWhatsapp && (
            <div style={{ position: "relative" }} className="group">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "#25D366",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(37,211,102,0.4)",
                  textDecoration: "none",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.12)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon />
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
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                WhatsApp Us
              </span>
            </div>
          )}

          {!isOpen && settings.showMessenger && (
            <div style={{ position: "relative" }} className="group">
              <a
                href={meUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "#0084FF",
                  color: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 4px 20px rgba(0,132,255,0.4)",
                  textDecoration: "none",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "scale(1.12)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "scale(1)")
                }
                title="Chat on Messenger"
              >
                <MessengerIcon />
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
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                }}
              >
                Messenger
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

