"use client";

import {
  buildSettings,
  DEFAULT_CHAT_SETTINGS,
  getSocialLinks,
} from "@/components/Common/SocialIcons";
import { useQuerySettings } from "@/lib/queries";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

const SCROLL_THRESHOLD = 150;

export default function FloatingChatWidget() {
  const pathname = usePathname();
  const { data, isFetching: settingsLoading } = useQuerySettings();
  const [isVisible, setIsVisible] = useState(false);

  const settings = useMemo(
    () => (data ? buildSettings(data) : DEFAULT_CHAT_SETTINGS),
    [data],
  );

  const socialLinks = useMemo(() => getSocialLinks(settings), [settings]);

  useEffect(() => {
    const onScroll = () => setIsVisible(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mounted = !settingsLoading;

  if (!mounted) return null;
  if (pathname?.startsWith("/admin")) return null;
  if (socialLinks.length === 0) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        right: "15px",
        transform: "translateY(-50%)",
        zIndex: 50,
      }}
    >
      <div
        className={`flex flex-col items-end gap-3 transition-all duration-500 ${
          isVisible
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-4 pointer-events-none"
        }`}
      >
        <div className="chat-idle flex flex-col gap-2">
          {/* <button
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
              animationDelay: "0.05s",
            }}
            className="chat-btn-pop"
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.12)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
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
          </button> */}

          {socialLinks.map((link, index) => (
            <div
              key={link.key}
              style={{
                position: "relative",
                animationDelay: `${0.15 + index * 0.1}s`,
              }}
              className="chat-btn-pop group"
            >
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  background: link.background,
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
                title={link.title}
                aria-label={link.ariaLabel}
              >
                {link.icon}
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
                {link.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

