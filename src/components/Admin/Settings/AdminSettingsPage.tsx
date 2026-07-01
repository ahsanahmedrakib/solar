"use client";

import { DEFAULT_ADMIN_LOGO } from "@/data/settings";
import Image from "next/image";
import {
  FileText,
  Globe,
  Layout,
  MessageSquare,
  Share2,
  Shield,
  Sliders,
  Sparkles,
  Sun,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ImageUploadInput } from "@/components/Admin/ImageUploadInput";
import { DEFAULT_SECTIONS, type Section } from "@/data/settings";
import { apiClient } from "@/lib/apiClient";

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

function mergeSectionsWithDefaults(
  loaded: Section[],
  defaults: Section[],
): Section[] {
  return defaults.map((defaultSection) => {
    const loadedSection = loaded.find((s) => s.id === defaultSection.id);
    if (!loadedSection) return defaultSection;

    const defaultFields = defaultSection.fields ?? [];
    const loadedFields = loadedSection.fields ?? [];
    const mergedFields = [
      ...loadedFields,
      ...defaultFields.filter(
        (df) => !loadedFields.some((lf) => lf.id === df.id),
      ),
    ];

    const defaultToggles = defaultSection.toggles ?? [];
    const loadedToggles = loadedSection.toggles ?? [];
    const mergedToggles = [
      ...loadedToggles,
      ...defaultToggles.filter(
        (dt) => !loadedToggles.some((lt) => lt.id === dt.id),
      ),
    ];

    return {
      ...defaultSection,
      ...loadedSection,
      fields: mergedFields.length > 0 ? mergedFields : undefined,
      toggles: mergedToggles.length > 0 ? mergedToggles : undefined,
    };
  });
}

function createEmptySections(): Section[] {
  return DEFAULT_SECTIONS.map((section) => ({
    ...section,
    fields: section.fields?.map((f) => ({ ...f, value: "" })),
    toggles: section.toggles?.map((t) => ({ ...t, checked: false })),
  }));
}

export default function AdminSettingsPage() {
  const [sections, setSections] = useState<Section[]>(createEmptySections);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await apiClient("/api/settings");
        const json = await res.json();
        if (json.success && Array.isArray(json.data) && json.data.length > 0) {
          setSections(mergeSectionsWithDefaults(json.data, DEFAULT_SECTIONS));
        } else if (json.success) {
          setSections(createEmptySections());
        } else {
          toast.error("Failed to load settings: " + json.error);
        }
      } catch (err) {
        console.error("Failed to load settings", err);
        toast.error("Failed to load settings.");
        setSections(createEmptySections());
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleFieldChange = (
    sectionId: string,
    fieldId: string,
    newValue: string,
  ) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId && sec.fields) {
          return {
            ...sec,
            fields: sec.fields.map((f) =>
              f.id === fieldId ? { ...f, value: newValue } : f,
            ),
          };
        }
        return sec;
      }),
    );
  };

  const handleToggleChange = (sectionId: string, toggleId: string) => {
    setSections((prev) =>
      prev.map((sec) => {
        if (sec.id === sectionId && sec.toggles) {
          return {
            ...sec,
            toggles: sec.toggles.map((t) =>
              t.id === toggleId ? { ...t, checked: !t.checked } : t,
            ),
          };
        }
        return sec;
      }),
    );
  };

  const handleSave = async () => {
    try {
      const res = await apiClient("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections }),
      });
      const json = await res.json();
      if (json.success) {
        toast.success("Website settings saved successfully!");
      } else {
        toast.error("Failed to save settings: " + json.error);
      }
    } catch (err) {
      console.error("Failed to save settings", err);
      toast.error("Failed to save settings.");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-100">
        <Image src={DEFAULT_ADMIN_LOGO} alt="Loading" width={0} height={0} sizes="100vw" className="h-16 w-auto animate-pulse opacity-70" priority />
        <p className="mt-4 text-(--admin-text-secondary) font-medium">
          Loading settings...
        </p>
      </div>
    );
  }


  return (
    <div className="space-y-6 pb-12">
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Website & Portal Settings</h2>
          <p className="admin-page-header-sub">
            Manage comprehensive site-wide information, branding, hero content,
            SEO, and system defaults ({sections.length} sections)
          </p>
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
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                    }}
                  >
                    {section.fields.map((field) => (
                      <div key={field.id}>
                        {field.type === "image" ? (
                          <ImageUploadInput
                            label={field.label}
                            value={field.value}
                            onChange={(val) =>
                              handleFieldChange(section.id, field.id, val)
                            }
                            placeholder="/logo.svg"
                          />
                        ) : (
                          <>
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
                              onChange={(e) =>
                                handleFieldChange(
                                  section.id,
                                  field.id,
                                  e.target.value,
                                )
                              }
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
                                e.currentTarget.style.borderColor =
                                  "var(--admin-accent)";
                              }}
                              onBlur={(e) => {
                                e.currentTarget.style.borderColor =
                                  "var(--admin-border)";
                              }}
                            />
                          </>
                        )}
                      </div>
                    ))}
                  </div>
                )}
                {section.toggles && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 14,
                      paddingTop: section.fields ? 12 : 0,
                    }}
                  >
                    {section.toggles.map((toggle) => (
                      <div
                        key={toggle.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 13.5,
                            color: "var(--admin-text-secondary)",
                          }}
                        >
                          {toggle.label}
                        </span>
                        <label
                          htmlFor={toggle.id}
                          style={{
                            position: "relative",
                            display: "inline-block",
                            width: 40,
                            height: 22,
                            cursor: "pointer",
                            flexShrink: 0,
                          }}
                        >
                          <input
                            id={toggle.id}
                            type="checkbox"
                            checked={toggle.checked}
                            onChange={() =>
                              handleToggleChange(section.id, toggle.id)
                            }
                            style={{ opacity: 0, width: 0, height: 0 }}
                          />
                          <span
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: toggle.checked
                                ? "var(--admin-accent)"
                                : "var(--admin-surface-2)",
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
                              background: toggle.checked
                                ? "#0f1117"
                                : "var(--admin-text-muted)",
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
      <button
        id="save-settings-btn"
        onClick={handleSave}
        className="admin-btn-primary px-6"
      >
        <Sparkles size={14} />
        Save Changes
      </button>
    </div>
  );
}

