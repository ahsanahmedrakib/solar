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
        value: "Ahead Solar",
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
        value: "/logo.svg",
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
        value: "manik@aheadsolarbd.com",
        id: "contact-email",
      },
      {
        label: "Primary Phone Number",
        type: "tel",
        value: "+8801712947551",
        id: "phone-number",
      },
      {
        label: "Headquarters Address",
        type: "text",
        value: "House 12, Road 7, Sector 11, Uttara, Dhaka 1230",
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
        value: "+8801712947551",
        id: "whatsapp-number",
      },
      {
        label: "WhatsApp Default Greeting Message",
        type: "text",
        value:
          "Hello Ahead Solar, I would like to inquire about solar energy solutions.",
        id: "whatsapp-message",
      },
      {
        label: "Facebook Messenger Username / Page ID",
        type: "text",
        value: "61591154285690",
        id: "messenger-username",
      },
    ],
    toggles: [
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
    id: "seo",
    title: "SEO & Website Metadata",
    iconName: "FileText",
    color: "#10b981",
    fields: [
      {
        label: "Default Site Meta Title",
        type: "text",
        value: "Ahead Solar - Leading Renewable Energy Solutions",
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
        value: "https://www.facebook.com/profile.php?id=61591154285690",
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
          " https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3393.9947761658013!2d90.39066177501897!3d23.87729687858403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c5003133f351%3A0xc57cc5d4675738ff!2sAhead%20Center!5e1!3m2!1sen!2sbd!4v1784135178921!5m2!1sen!2sbd",
        id: "google-map",
      },
    ],
  },
];

export const DEFAULT_LOGO =
  getDefaultField("general", "site-logo") || "/logo.svg";

export const DEFAULT_ADMIN_LOGO =
  getDefaultField("general", "admin-logo") || "/logo.svg";

export function getDefaultField(sectionId: string, fieldId: string): string {
  return (
    DEFAULT_SECTIONS.find((s) => s.id === sectionId)?.fields?.find(
      (f) => f.id === fieldId,
    )?.value ?? ""
  );
}

