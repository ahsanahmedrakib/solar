"use client";

import React, { useState, useEffect } from "react";
import { 
  Globe, Layout, FileText, Share2, Shield, Sun, Phone, Mail, Check, Sparkles, Sliders, Info, MessageSquare
} from "lucide-react";

interface Field {
  id: string;
  label: string;
  type: string;
  value: string;
}

interface Toggle {
  id: string;
  label: string;
  checked: boolean;
}

interface Section {
  id: string;
  title: string;
  iconName: string;
  color: string;
  fields?: Field[];
  toggles?: Toggle[];
}

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  Sliders,
  Globe,
  Layout,
  Sun,
  FileText,
  Share2,
  Shield,
  MessageSquare,
};

const DEFAULT_SECTIONS: Section[] = [
  {
    id: "general",
    title: "General Brand & Company Identity",
    iconName: "Sliders",
    color: "#f59e0b",
    fields: [
      { label: "Company Name", type: "text", value: "Sunex Solar & Renewable Energy", id: "company-name" },
      { label: "Brand Tagline", type: "text", value: "Empowering Your Clean Energy Future", id: "brand-tagline" },
      { label: "Support Email Address", type: "email", value: "support@sunexsolar.com", id: "contact-email" },
      { label: "Primary Phone Number", type: "tel", value: "+1 (800) 555-SOLAR", id: "phone-number" },
      { label: "Headquarters Address", type: "text", value: "100 Renewable Way, Austin, TX 78701", id: "hq-address" },
    ],
  },
  {
    id: "chat-widgets",
    title: "Floating Chat & Messenger Widgets",
    iconName: "MessageSquare",
    color: "#10b981",
    fields: [
      { label: "WhatsApp Phone Number (with Country Code)", type: "text", value: "+18005557652", id: "whatsapp-number" },
      { label: "WhatsApp Default Greeting Message", type: "text", value: "Hello Sunex Solar, I would like to inquire about solar energy solutions.", id: "whatsapp-message" },
      { label: "Facebook Messenger Username / Page ID", type: "text", value: "sunexsolar", id: "messenger-username" },
    ],
    toggles: [
      { label: "Show Floating Chat Widgets on Main Site", checked: true, id: "show-chat-widgets" },
      { label: "Enable WhatsApp Direct Chat Button", checked: true, id: "show-whatsapp" },
      { label: "Enable Facebook Messenger Button", checked: true, id: "show-messenger" },
    ],
  },
  {
    id: "header",
    title: "Header & Navigation Settings",
    iconName: "Globe",
    color: "#3b82f6",
    fields: [
      { label: "Top Bar Announcement Text", type: "text", value: "⚡ Get up to 30% Federal Tax Credits on Residential Solar Systems!", id: "header-announcement" },
      { label: "Header CTA Button Text", type: "text", value: "Get Free Quote", id: "header-cta-text" },
      { label: "Header CTA Target Link", type: "text", value: "/contact", id: "header-cta-link" },
    ],
    toggles: [
      { label: "Show Top Announcement Banner", checked: true, id: "show-top-banner" },
      { label: "Show Emergency Call Button in Header", checked: true, id: "show-header-phone" },
    ]
  },
  {
    id: "homepage",
    title: "Homepage & Hero Content Defaults",
    iconName: "Layout",
    color: "#8b5cf6",
    fields: [
      { label: "Hero Main Heading", type: "text", value: "Sustainable Solar Energy Solutions For Your Home & Business", id: "hero-title" },
      { label: "Hero Subtitle Description", type: "text", value: "Clean, reliable, and affordable solar power systems tailored to reduce your energy bills.", id: "hero-subtitle" },
      { label: "Primary CTA Button Text", type: "text", value: "Calculate Savings", id: "hero-cta-primary" },
      { label: "Secondary CTA Button Text", type: "text", value: "Explore Projects", id: "hero-cta-secondary" },
    ],
  },
  {
    id: "solar-stats",
    title: "Solar Stats & Impact Counters",
    iconName: "Sun",
    color: "#eab308",
    fields: [
      { label: "Total Solar Systems Installed", type: "text", value: "12,500+", id: "stat-installations" },
      { label: "CO2 Emissions Reduced (Tons)", type: "text", value: "450,000+", id: "stat-co2" },
      { label: "Customer Satisfaction Rate (%)", type: "text", value: "99.4%", id: "stat-satisfaction" },
      { label: "Standard Panel Warranty (Years)", type: "text", value: "25 Years", id: "stat-warranty" },
    ],
  },
  {
    id: "seo",
    title: "SEO & Website Metadata",
    iconName: "FileText",
    color: "#10b981",
    fields: [
      { label: "Default Site Meta Title", type: "text", value: "Sunex Solar - Leading Renewable Energy Solutions", id: "meta-title" },
      { label: "Meta Description", type: "text", value: "Top-rated solar panel installation, battery storage, and maintenance for residential and commercial properties.", id: "meta-desc" },
      { label: "Keywords (Comma Separated)", type: "text", value: "solar panels, green energy, battery storage, renewable energy, solar installation", id: "meta-keywords" },
    ],
  },
  {
    id: "social",
    title: "Social Media & External Links",
    iconName: "Share2",
    color: "#ec4899",
    fields: [
      { label: "Facebook Page URL", type: "url", value: "https://facebook.com/sunexsolar", id: "social-fb" },
      { label: "Twitter / X Profile URL", type: "url", value: "https://x.com/sunexsolar", id: "social-x" },
      { label: "LinkedIn Company URL", type: "url", value: "https://linkedin.com/company/sunexsolar", id: "social-li" },
      { label: "Instagram Profile URL", type: "url", value: "https://instagram.com/sunexsolar", id: "social-ig" },
    ],
  },
  {
    id: "security",
    title: "Security & Admin Governance",
    iconName: "Shield",
    color: "#ef4444",
    toggles: [
      { label: "Two-Factor Authentication for Admins", checked: true, id: "2fa" },
      { label: "Detailed Audit Logging for Content Edits", checked: true, id: "audit-log" },
      { label: "Automatic Session Lock (30 Minutes)", checked: false, id: "session-timeout" },
    ],
  },
];

export default function SettingsPage() {
  const [sections, setSections] = useState<Section[]>(DEFAULT_SECTIONS);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("admin_settings");
    if (stored) {
      try {
        const parsed: Section[] = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Filter out notifications if present in cached localStorage data
          const filtered = parsed.filter((s) => s.id !== "notifications");
          setSections(filtered);
        }
      } catch {
        setSections(DEFAULT_SECTIONS);
      }
    }
  }, []);

  const handleFieldChange = (sectionId: string, fieldId: string, newValue: string) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId && sec.fields) {
          return {
            ...sec,
            fields: sec.fields.map((f) => (f.id === fieldId ? { ...f, value: newValue } : f)),
          };
        }
        return sec;
      })
    );
  };

  const handleToggleChange = (sectionId: string, toggleId: string) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId && sec.toggles) {
          return {
            ...sec,
            toggles: sec.toggles.map((t) => (t.id === toggleId ? { ...t, checked: !t.checked } : t)),
          };
        }
        return sec;
      })
    );
  };

  const handleSave = () => {
    localStorage.setItem("admin_settings", JSON.stringify(sections));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Website & Portal Settings</h2>
          <p className="admin-page-header-sub">
            Manage comprehensive site-wide information, branding, hero content, SEO, and system defaults ({sections.length} sections)
          </p>
        </div>
        <div className="admin-page-header-actions flex items-center gap-3">
          {isSaved && (
            <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center gap-1.5 animate-fade-in">
              <Check size={14} /> Website Settings Saved!
            </span>
          )}
          <button id="save-settings-btn" onClick={handleSave} className="admin-btn-primary px-6">
            <Sparkles size={14} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sections.map((section) => {
          const IconComponent = ICON_MAP[section.iconName] || Sliders;
          return (
            <div key={section.id} className="admin-section-card">
              <div className="admin-section-header">
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 8,
                      background: `${section.color}1a`,
                      color: section.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconComponent size={16} />
                  </div>
                  <p className="admin-section-title">{section.title}</p>
                </div>
              </div>
              <div className="admin-section-body space-y-4">
                {section.fields && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {section.fields.map((field) => (
                      <div key={field.id}>
                        <label
                          htmlFor={field.id}
                          style={{
                            display: "block",
                            fontSize: 12,
                            fontWeight: 600,
                            color: "var(--admin-text-secondary)",
                            marginBottom: 6,
                            letterSpacing: "0.02em",
                          }}
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          value={field.value}
                          onChange={(e) => handleFieldChange(section.id, field.id, e.target.value)}
                          style={{
                            width: "100%",
                            background: "var(--admin-surface-2)",
                            border: "1px solid var(--admin-border)",
                            borderRadius: 8,
                            padding: "8px 12px",
                            color: "var(--admin-text-primary)",
                            fontSize: 13,
                            outline: "none",
                            transition: "border-color 0.15s",
                            boxSizing: "border-box",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor = "var(--admin-accent)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor = "var(--admin-border)";
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {section.toggles && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 14, paddingTop: section.fields ? 12 : 0 }}>
                    {section.toggles.map((toggle) => (
                      <div key={toggle.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ fontSize: 13.5, color: "var(--admin-text-secondary)" }}>
                          {toggle.label}
                        </span>
                        <label
                          htmlFor={toggle.id}
                          style={{ position: "relative", display: "inline-block", width: 40, height: 22, cursor: "pointer", flexShrink: 0 }}
                        >
                          <input
                            id={toggle.id}
                            type="checkbox"
                            checked={toggle.checked}
                            onChange={() => handleToggleChange(section.id, toggle.id)}
                            style={{ opacity: 0, width: 0, height: 0 }}
                          />
                          <span
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: toggle.checked ? "var(--admin-accent)" : "var(--admin-surface-2)",
                              borderRadius: 22,
                              border: "1px solid var(--admin-border)",
                              transition: "background 0.2s",
                            }}
                          />
                          <span
                            style={{
                              position: "absolute",
                              top: 3,
                              left: toggle.checked ? 21 : 3,
                              width: 14,
                              height: 14,
                              background: toggle.checked ? "#0f1117" : "var(--admin-text-muted)",
                              borderRadius: "50%",
                              transition: "left 0.2s",
                            }}
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
