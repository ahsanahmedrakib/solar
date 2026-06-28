"use client";

import { Settings, User, Bell, Shield } from "lucide-react";

const sections = [
  {
    id: "general",
    title: "General Settings",
    icon: Settings,
    color: "#f59e0b",
    fields: [
      { label: "Company Name", type: "text", value: "Sunex Solar & Renewable Energy", id: "company-name" },
      { label: "Contact Email", type: "email", value: "admin@sunex.com", id: "contact-email" },
      { label: "Phone Number", type: "tel", value: "+1 (555) 000-0000", id: "phone-number" },
      { label: "Website URL", type: "url", value: "https://sunex.com", id: "website-url" },
    ],
  },
  {
    id: "profile",
    title: "Admin Profile",
    icon: User,
    color: "#3b82f6",
    fields: [
      { label: "Full Name", type: "text", value: "Admin User", id: "admin-full-name" },
      { label: "Email Address", type: "email", value: "admin@sunex.com", id: "admin-email" },
      { label: "Role", type: "text", value: "Super Administrator", id: "admin-role" },
    ],
  },
  {
    id: "notifications",
    title: "Notification Preferences",
    icon: Bell,
    color: "#10b981",
    toggles: [
      { label: "New Order Alerts", checked: true, id: "notif-orders" },
      { label: "Low Stock Warnings", checked: true, id: "notif-stock" },
      { label: "Customer Registrations", checked: false, id: "notif-customers" },
      { label: "Payment Confirmations", checked: true, id: "notif-payments" },
      { label: "Weekly Reports", checked: true, id: "notif-reports" },
    ],
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
    color: "#ef4444",
    toggles: [
      { label: "Two-Factor Authentication", checked: true, id: "2fa" },
      { label: "Login Notifications", checked: true, id: "login-notif" },
      { label: "Session Timeout (30 min)", checked: false, id: "session-timeout" },
    ],
  },
];

export default function SettingsPage() {
  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2 className="admin-page-header-title">Settings</h2>
          <p className="admin-page-header-sub">Configure your admin panel preferences</p>
        </div>
        <div className="admin-page-header-actions">
          <button id="save-settings-btn" className="admin-btn-primary">
            Save Changes
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {sections.map((section) => {
          const Icon = section.icon;
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
                    <Icon size={16} />
                  </div>
                  <p className="admin-section-title">{section.title}</p>
                </div>
              </div>
              <div className="admin-section-body">
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
                          defaultValue={field.value}
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
                  <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
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
                            defaultChecked={toggle.checked}
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
