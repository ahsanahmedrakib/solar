export interface ContactQuery {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
  status: "new" | "replied" | "archived";
  notes?: string;
}

export const DEFAULT_QUERIES: ContactQuery[] = [
  {
    id: "cq-101",
    name: "Michael Henderson",
    email: "m.henderson@example.com",
    phone: "+1 (555) 234-5678",
    subject: "Residential Solar Panel Installation Quote",
    message: "Hello, I am looking to install a 10kW solar system on my rooftop in Austin. Could you please send me an estimated pricing sheet and available tax rebate info?",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    status: "new",
  },
  {
    id: "cq-102",
    name: "Sarah Jenkins",
    email: "sarah.j@greencorp.org",
    phone: "+1 (555) 876-5432",
    subject: "Commercial Battery Storage Consultation",
    message: "We operate a commercial facility and wish to integrate high-capacity Tesla Powerwall or commercial battery backups to mitigate power outages.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    status: "new",
  },
  {
    id: "cq-103",
    name: "David Miller",
    email: "david.miller@techhub.io",
    phone: "+1 (555) 345-6789",
    subject: "Maintenance & Inverter Diagnostics",
    message: "Our inverter displays an error code E-04 since yesterday morning. We need an urgent technician dispatch.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    status: "replied",
    notes: "Dispatched field technician John Doe for inspection on June 28.",
  },
  {
    id: "cq-104",
    name: "Elena Rostova",
    email: "elena.r@lifestyle.com",
    phone: "+1 (555) 987-1234",
    subject: "General Inquiry regarding Warranty",
    message: "Hi! I wanted to check what brand of solar panels you supply and if they come with a 25-year performance warranty.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
    status: "archived",
  },
];
