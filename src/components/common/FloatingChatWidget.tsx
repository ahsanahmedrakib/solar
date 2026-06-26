"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, MessageCircle } from "lucide-react";

interface ChatSettings {
  showChatWidgets: boolean;
  showWhatsapp: boolean;
  whatsappNumber: string;
  whatsappMessage: string;
  showMessenger: boolean;
  messengerUsername: string;
}

const DEFAULTS: ChatSettings = {
  showChatWidgets: true,
  showWhatsapp: true,
  whatsappNumber: "18005557652",
  whatsappMessage: "Hello! I would like to inquire about solar energy solutions.",
  showMessenger: true,
  messengerUsername: "sunexsolar",
};

function readSettings(): ChatSettings {
  try {
    const raw = localStorage.getItem("admin_settings");
    if (!raw) return DEFAULTS;
    const sections = JSON.parse(raw);
    if (!Array.isArray(sections)) return DEFAULTS;
    const sec = sections.find((s: any) => s.id === "chat-widgets");
    if (!sec) return DEFAULTS;

    const fv = (id: string, d: string) =>
      sec.fields?.find((f: any) => f.id === id)?.value ?? d;
    const tv = (id: string, d: boolean) =>
      sec.toggles?.find((t: any) => t.id === id)?.checked ?? d;

    const rawPhone = fv("whatsapp-number", DEFAULTS.whatsappNumber);
    const cleanPhone = rawPhone.replace(/[^0-9]/g, "");

    return {
      showChatWidgets: tv("show-chat-widgets", true),
      showWhatsapp: tv("show-whatsapp", true),
      whatsappNumber: cleanPhone,
      whatsappMessage: fv("whatsapp-message", DEFAULTS.whatsappMessage),
      showMessenger: tv("show-messenger", true),
      messengerUsername: fv("messenger-username", DEFAULTS.messengerUsername),
    };
  } catch {
    return DEFAULTS;
  }
}

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
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<ChatSettings>(DEFAULTS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSettings(readSettings());

    const onStorage = () => setSettings(readSettings());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // SSR guard + admin pages + disabled
  if (!mounted) return null;
  if (pathname?.startsWith("/admin")) return null;
  if (!settings.showChatWidgets) return null;
  if (!settings.showWhatsapp && !settings.showMessenger) return null;

  const waUrl = `https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(settings.whatsappMessage)}`;
  const meUrl = `https://m.me/${settings.messengerUsername}`;

  return (
    <>
      {/* Backdrop when open (mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Widget container — fixed bottom-right */}
      <div
        style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 50 }}
        className="flex flex-col items-end gap-3"
      >
        {/* Popup card */}
        {isOpen && (
          <div
            style={{
              background: "#0d1b2a",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "20px",
              padding: "20px",
              width: "280px",
              boxShadow: "0 25px 60px rgba(0,0,0,0.5)",
              marginBottom: "4px",
            }}
          >
            {/* Card header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "12px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#4ade80",
                    display: "inline-block",
                    animation: "pulse 2s infinite",
                  }}
                />
                <span
                  style={{
                    color: "#e2e8f0",
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.08em",
                  }}
                >
                  Live Support
                </span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: "rgba(255,255,255,0.08)",
                  border: "none",
                  borderRadius: "8px",
                  padding: "4px",
                  cursor: "pointer",
                  color: "#94a3b8",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <X size={14} />
              </button>
            </div>

            <p style={{ color: "#94a3b8", fontSize: "12px", lineHeight: 1.6, marginBottom: "14px" }}>
              Chat with our team about solar installation, pricing, or any questions.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {settings.showWhatsapp && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: "#25D366",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 600,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <WhatsAppIcon />
                  </div>
                  <div>
                    <div>WhatsApp</div>
                    <div style={{ fontSize: "10px", opacity: 0.8, fontWeight: 400 }}>Typically replies instantly</div>
                  </div>
                </a>
              )}

              {settings.showMessenger && (
                <a
                  href={meUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "10px 14px",
                    borderRadius: "12px",
                    background: "#0084FF",
                    color: "#fff",
                    textDecoration: "none",
                    fontSize: "13px",
                    fontWeight: 600,
                    transition: "opacity 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  <div
                    style={{
                      width: "30px",
                      height: "30px",
                      borderRadius: "50%",
                      background: "rgba(255,255,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <MessengerIcon />
                  </div>
                  <div>
                    <div>Messenger</div>
                    <div style={{ fontSize: "10px", opacity: 0.8, fontWeight: 400 }}>Facebook Messenger</div>
                  </div>
                </a>
              )}
            </div>
          </div>
        )}

        {/* Bottom row: individual icons + main toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {/* WhatsApp standalone button (shown when popup is closed) */}
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
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                title="Chat on WhatsApp"
              >
                <WhatsAppIcon />
              </a>
              {/* Tooltip */}
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

          {/* Messenger standalone button (shown when popup is closed) */}
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
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                title="Chat on Messenger"
              >
                <MessengerIcon />
              </a>
              {/* Tooltip */}
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

          {/* Main toggle button */}
          <button
            onClick={() => setIsOpen((v) => !v)}
            title={isOpen ? "Close" : "Chat with us"}
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: isOpen ? "#334155" : "#4CAF50",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isOpen
                ? "0 4px 16px rgba(0,0,0,0.3)"
                : "0 4px 24px rgba(76,175,80,0.5)",
              transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
              transition: "background 0.25s, transform 0.3s, box-shadow 0.25s",
            }}
            onMouseEnter={(e) => {
              if (!isOpen) e.currentTarget.style.background = "#43a047";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = isOpen ? "#334155" : "#4CAF50";
            }}
          >
            {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          </button>
        </div>
      </div>
    </>
  );
}
