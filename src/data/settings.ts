export interface Field {
  id: string;
  label: string;
  type: string;
  value: string;
}

export interface Toggle {
  id: string;
  label: string;
  checked: boolean;
}

export interface Section {
  id: string;
  title: string;
  iconName: string;
  color: string;
  fields?: Field[];
  toggles?: Toggle[];
}

export const DEFAULT_SECTIONS: Section[] = [
  {
    id: "general",
    title: "General Brand & Company Identity",
    iconName: "Sliders",
    color: "#f59e0b",
    fields: [
      {
        label: "Company Name",
        type: "text",
        value: "Sunex Solar & Renewable Energy",
        id: "company-name",
      },
      {
        label: "Site Logo",
        type: "image",
        value: "/logo.svg",
        id: "site-logo",
      },
      {
        label: "Admin Logo",
        type: "image",
        value: "/logo-white.svg",
        id: "admin-logo",
      },
      {
        label: "Favicon",
        type: "image",
        value: "/favicon.ico",
        id: "site-favicon",
      },
      {
        label: "Brand Tagline",
        type: "text",
        value: "Empowering Your Clean Energy Future",
        id: "brand-tagline",
      },
      {
        label: "Support Email Address",
        type: "email",
        value: "support@sunexsolar.com",
        id: "contact-email",
      },
      {
        label: "Primary Phone Number",
        type: "tel",
        value: "+1 (800) 555-SOLAR",
        id: "phone-number",
      },
      {
        label: "Headquarters Address",
        type: "text",
        value: "100 Renewable Way, Austin, TX 78701",
        id: "hq-address",
      },
    ],
  },
  {
    id: "chat-widgets",
    title: "Floating Chat & Messenger Widgets",
    iconName: "MessageSquare",
    color: "#10b981",
    fields: [
      {
        label: "WhatsApp Phone Number (with Country Code)",
        type: "text",
        value: "+18005557652",
        id: "whatsapp-number",
      },
      {
        label: "WhatsApp Default Greeting Message",
        type: "text",
        value:
          "Hello Sunex Solar, I would like to inquire about solar energy solutions.",
        id: "whatsapp-message",
      },
      {
        label: "Facebook Messenger Username / Page ID",
        type: "text",
        value: "sunexsolar",
        id: "messenger-username",
      },
    ],
    toggles: [
      {
        label: "Show Floating Chat Widgets on Main Site",
        checked: true,
        id: "show-chat-widgets",
      },
      {
        label: "Enable WhatsApp Direct Chat Button",
        checked: true,
        id: "show-whatsapp",
      },
      {
        label: "Enable Facebook Messenger Button",
        checked: true,
        id: "show-messenger",
      },
    ],
  },
  {
    id: "header",
    title: "Header & Navigation Settings",
    iconName: "Globe",
    color: "#3b82f6",
    fields: [
      {
        label: "Top Bar Announcement Text",
        type: "text",
        value:
          "\u26a1 Get up to 30% Federal Tax Credits on Residential Solar Systems!",
        id: "header-announcement",
      },
      {
        label: "Header CTA Button Text",
        type: "text",
        value: "Get Free Quote",
        id: "header-cta-text",
      },
      {
        label: "Header CTA Target Link",
        type: "text",
        value: "/contact",
        id: "header-cta-link",
      },
    ],
    toggles: [
      {
        label: "Show Top Announcement Banner",
        checked: true,
        id: "show-top-banner",
      },
      {
        label: "Show Emergency Call Button in Header",
        checked: true,
        id: "show-header-phone",
      },
    ],
  },
  {
    id: "homepage",
    title: "Homepage & Hero Content Defaults",
    iconName: "Layout",
    color: "#8b5cf6",
    fields: [
      {
        label: "Hero Main Heading",
        type: "text",
        value: "Sustainable Solar Energy Solutions For Your Home & Business",
        id: "hero-title",
      },
      {
        label: "Hero Subtitle Description",
        type: "text",
        value:
          "Clean, reliable, and affordable solar power systems tailored to reduce your energy bills.",
        id: "hero-subtitle",
      },
      {
        label: "Primary CTA Button Text",
        type: "text",
        value: "Calculate Savings",
        id: "hero-cta-primary",
      },
      {
        label: "Secondary CTA Button Text",
        type: "text",
        value: "Explore Projects",
        id: "hero-cta-secondary",
      },
    ],
  },
  {
    id: "solar-stats",
    title: "Solar Stats & Impact Counters",
    iconName: "Sun",
    color: "#eab308",
    fields: [
      {
        label: "Total Solar Systems Installed",
        type: "text",
        value: "12,500+",
        id: "stat-installations",
      },
      {
        label: "CO2 Emissions Reduced (Tons)",
        type: "text",
        value: "450,000+",
        id: "stat-co2",
      },
      {
        label: "Customer Satisfaction Rate (%)",
        type: "text",
        value: "99.4%",
        id: "stat-satisfaction",
      },
      {
        label: "Standard Panel Warranty (Years)",
        type: "text",
        value: "25 Years",
        id: "stat-warranty",
      },
    ],
  },
  {
    id: "seo",
    title: "SEO & Website Metadata",
    iconName: "FileText",
    color: "#10b981",
    fields: [
      {
        label: "Default Site Meta Title",
        type: "text",
        value: "Sunex Solar - Leading Renewable Energy Solutions",
        id: "meta-title",
      },
      {
        label: "Meta Description",
        type: "text",
        value:
          "Top-rated solar panel installation, battery storage, and maintenance for residential and commercial properties.",
        id: "meta-desc",
      },
      {
        label: "Keywords (Comma Separated)",
        type: "text",
        value:
          "solar panels, green energy, battery storage, renewable energy, solar installation",
        id: "meta-keywords",
      },
    ],
  },
  {
    id: "social",
    title: "Social Media & External Links",
    iconName: "Share2",
    color: "#ec4899",
    fields: [
      {
        label: "Facebook Page URL",
        type: "url",
        value: "https://facebook.com/sunexsolar",
        id: "social-fb",
      },
      {
        label: "Twitter / X Profile URL",
        type: "url",
        value: "https://x.com/sunexsolar",
        id: "social-x",
      },
      {
        label: "LinkedIn Company URL",
        type: "url",
        value: "https://linkedin.com/company/sunexsolar",
        id: "social-li",
      },
      {
        label: "Instagram Profile URL",
        type: "url",
        value: "https://instagram.com/sunexsolar",
        id: "social-ig",
      },
      {
        label: "Google Map Embed URL",
        type: "url",
        value:
          "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.25280821213!2d-74.11976373059876!3d40.69767006346294!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus",
        id: "google-map",
      },
    ],
  },
  {
    id: "security",
    title: "Security & Admin Governance",
    iconName: "Shield",
    color: "#ef4444",
    toggles: [
      {
        label: "Two-Factor Authentication for Admins",
        checked: true,
        id: "2fa",
      },
      {
        label: "Detailed Audit Logging for Content Edits",
        checked: true,
        id: "audit-log",
      },
      {
        label: "Automatic Session Lock (30 Minutes)",
        checked: false,
        id: "session-timeout",
      },
    ],
  },
];

export const DEFAULT_LOGO =
  getDefaultField("general", "site-logo") || "/logo.svg";

export const DEFAULT_ADMIN_LOGO =
  getDefaultField("general", "admin-logo") || "/logo-white.svg";

export function getDefaultField(sectionId: string, fieldId: string): string {
  return (
    DEFAULT_SECTIONS.find((s) => s.id === sectionId)?.fields?.find(
      (f) => f.id === fieldId,
    )?.value ?? ""
  );
}
