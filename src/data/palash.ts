import type { ContactQuery } from "@/data/contact";

export interface PalashApplication {
  id: string;
  fullName: string;
  businessName: string;
  mobile: string;
  whatsapp: string;
  email: string;
  district: string;
  thana: string;
  address: string;
  services: string[];
  hasBusiness: "yes" | "no";
  experienceYears: string;
  space: "own" | "rented" | "looking";
  comments: string;
  createdAt: string;
  status: ContactQuery["status"];
  notes?: string;
  rawMessage: string;
}

export const PALASH_SUBJECT = "Palash Charging Station";

export const SERVICE_LABELS: Record<string, string> = {
  charging: "Charging Station Network Partner",
  battery: "Lithium Battery Dealership",
  both: "Both",
};

export const SPACE_LABELS: Record<string, string> = {
  own: "Own Space",
  rented: "Rented Space",
  looking: "Looking for Space",
};

const FALLBACK_EMAIL_SUFFIX = "@palash.local";

function parseField(message: string, key: string): string {
  const prefix = `${key}:`;
  for (const line of message.split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith(prefix)) {
      return trimmed.slice(prefix.length).trim();
    }
  }
  return "";
}

export function parsePalashApplication(
  query: ContactQuery,
): PalashApplication | null {
  if (!query.subject.includes(PALASH_SUBJECT)) return null;

  const get = (key: string) => parseField(query.message, key);

  const servicesRaw = get("Dealership Interest");
  const hasBusinessRaw = get("Existing Business");
  const spaceRaw = get("Facility Status");
  const email = query.email.trim();
  const fallbackEmail = email.endsWith(FALLBACK_EMAIL_SUFFIX) ? "" : email;

  return {
    id: query.id,
    fullName: query.name,
    businessName: get("Business/Shop Name"),
    mobile: query.phone.trim() || get("Mobile"),
    whatsapp: get("WhatsApp"),
    email: fallbackEmail,
    district: get("District"),
    thana: get("Thana/Upazila"),
    address: get("Full Address"),
    services: servicesRaw
      ? servicesRaw
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [],
    hasBusiness: hasBusinessRaw.startsWith("Yes") ? "yes" : "no",
    experienceYears: get("Years of Experience"),
    space: (["own", "rented", "looking"] as const).find((value) =>
      spaceRaw.includes(value),
    ) ?? "looking",
    comments: get("Additional Comments"),
    createdAt: query.createdAt,
    status: query.status,
    notes: query.notes,
    rawMessage: query.message,
  };
}

export function serviceLabel(value: string): string {
  return SERVICE_LABELS[value] ?? value;
}

export function expandServices(services: string[]): string[] {
  const expanded: string[] = [];
  for (const value of services) {
    if (value === "both") {
      expanded.push("charging", "battery");
    } else {
      expanded.push(value);
    }
  }
  return [...new Set(expanded)];
}

export function spaceLabel(value: PalashApplication["space"]): string {
  return SPACE_LABELS[value] ?? value;
}
