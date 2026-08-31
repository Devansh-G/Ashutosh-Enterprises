/**
 * Single source of truth for every piece of copy and contact detail on the site.
 * Edit this file to rebrand — the components read everything from here.
 *
 * TODO(ecp): replace the placeholder values marked below with real business details.
 */

export const company = {
  shortName: "ECP",
  name: "ECP Electricals", // TODO(ecp): real registered name
  tagline: "Electrical Control Panels & Industrial Supply",
  foundedYear: 1996, // TODO(ecp): real founding year
  // TODO(ecp): real contact details
  phone: "+91 98100 00000",
  phoneHref: "tel:+919810000000",
  whatsapp: "919810000000",
  email: "sales@ecpelectricals.com",
  gst: "07AAAAA0000A1Z5", // TODO(ecp): real GSTIN
} as const;

/**
 * Canonical office list — the ONLY place an address is written down. The footer,
 * /about and /contact all derive their office cards from this array, so the
 * same address can never disagree with itself across pages (it previously did:
 * the footer published one head office while /about and /contact published
 * another, both visible on /about at once).
 *
 * TODO(ecp): EVERY STREET ADDRESS BELOW IS A PLACEHOLDER and must be replaced.
 * The originals were scraped from the reference site (debak.co) and were that
 * company's real premises, so they have been deliberately scrubbed rather than
 * left in place looking authoritative. The city structure (Delhi head office +
 * Bhiwadi and Jaipur branches) is retained as a starting assumption — confirm
 * or change it.
 * TODO(ecp): each branch shows the single head-office number because that is
 * the only line we hold. Give Bhiwadi and Jaipur their own `phone` once known.
 * TODO(ecp): the per-office `focus` line is an assumption about which functions
 * sit where.
 */
export const offices = [
  {
    city: "Delhi",
    kind: "Head Office",
    isHeadOffice: true,
    lines: ["Plot 42, Industrial Area Phase II", "New Delhi, Delhi 110020"],
    focus: "Sales, quoting, technical support, despatch and accounts.",
  },
  {
    city: "Bhiwadi",
    kind: "Branch Office",
    isHeadOffice: false,
    lines: ["Unit 00, Industrial Area", "Bhiwadi, Rajasthan 301019"],
    focus: "Local sales and stock support for the Bhiwadi industrial belt.",
  },
  {
    city: "Jaipur",
    kind: "Branch Office",
    isHeadOffice: false,
    lines: ["Office 00, Central Business District", "Jaipur, Rajasthan 302001"],
    focus: "Sales and project coordination across Rajasthan.",
  },
] as const;

export type Office = (typeof offices)[number];

export const headOffice = offices[0];

/** Full address as one string, for <address> blocks and map links. */
export const officeAddress = (office: Office) =>
  [...office.lines, "India"].join(", ");

/** Maps URL derived from the address so the pin can never drift from the text. */
export const officeMapHref = (office: Office) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    officeAddress(office),
  )}`;

export const yearsOfExperience = new Date().getFullYear() - company.foundedYear;

export const whatsappHref = `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(
  "Hi, I'd like a quote for industrial electrical supplies.",
)}`;

export const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Products", href: "/products" },
  { label: "Gallery", href: "/gallery" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const hero = {
  eyebrow: `Authorized Channel Partner Since ${company.foundedYear}`,
  title: `${yearsOfExperience} Years of Trust and Excellence`,
  subtitle:
    "Three decades of deep industry expertise, serving 5,000+ clients across India with complete electrical control panel and switchgear solutions.",
  primaryCta: { label: "Get a Quote", href: "/contact" },
  secondaryCta: { label: "Browse Products", href: "/products" },
  stats: [
    { value: `${yearsOfExperience}+`, label: "Years in business" },
    { value: "5,000+", label: "Clients served" },
    { value: "10+", label: "Global brands" },
    { value: "Pan-India", label: "Delivery network" },
  ],
} as const;

export const solutionsOverview = {
  eyebrow: "What We Do",
  title: "Complete Industrial Electrical Solutions",
  body: "Siemens, Polycab, Phoenix Contact, Eaton and six more global brands — all under one roof. From low-voltage switchgear and control panels to cables, meters and crimping tools, we supply everything a panel builder or contractor needs from a single purchase order.",
  points: [
    "Low-voltage switchgear, ACBs, MCCBs and MCBs",
    "Control panel components, contactors and relays",
    "Wires, cables, terminal blocks and cable management",
    "Energy meters, metering and power-factor correction",
  ],
} as const;

export const differentiators = {
  eyebrow: "Why It Matters",
  title: "Prompt Delivery. Competitive Price.",
  body: "System-driven execution, a large stock inventory and transparent pricing mean your project never waits on material.",
  cards: [
    {
      title: "Prompt Delivery",
      description:
        "Deep stock across fast-moving SKUs and a process-driven despatch desk get material out the same day wherever possible.",
      metric: "Same-day despatch",
    },
    {
      title: "Competitive Pricing",
      description:
        "Direct authorized-partner pricing on every brand we carry, with clear quotes and no hidden margins on freight or handling.",
      metric: "Direct partner rates",
    },
  ],
} as const;

/** Brand partners, each with the product lines we stock for them. */
export const brands = [
  {
    name: "Siemens",
    lines: [
      "Air Circuit Breaker (ACB)",
      "Moulded Case Circuit Breaker (MCCB)",
      "Switch Fuse Unit (SFU)",
      "Miniature Circuit Breaker (MCB)",
      "Power Contactor & Overload Relay",
      "Meters",
      "Fuse & Fuse Base",
      "PF Capacitor & APFC Relay",
    ],
  },
  { name: "Polycab", lines: ["Wires & Cables"] },
  { name: "Phoenix Contact", lines: ["Terminal Blocks", "SMPS & Automation"] },
  { name: "Secure", lines: ["Energy Meters & Metering Solutions"] },
  { name: "Elmeasure", lines: ["Changeover Switches & Transfer Systems"] },
  { name: "Eaton", lines: ["AC/DC Low Voltage Switchgear & Solar"] },
  { name: "Innomotics", lines: ["LV Industrial Motors"] },
  { name: "Havells", lines: ["Lighting, Cables & Capacitors"] },
  { name: "Salzer", lines: ["Cable Ducts and Switches"] },
  { name: "Klauke", lines: ["Hydraulic Crimping & Cutting Tools"] },
] as const;

export const certifications = ["IEC", "ISO 9001", "MSME", "GeM", "IndiaMART"] as const;

export const industries = [
  {
    title: "Panel Builders & Switchgear Manufacturers",
    description:
      "Bulk component supply with consistent availability so your build schedule never slips.",
  },
  {
    title: "OEMs",
    description:
      "Repeatable BOM fulfilment and long-term rate contracts for series production.",
  },
  {
    title: "Electrical Contractors & EPC",
    description:
      "Site-wise despatch and staged deliveries matched to your project milestones.",
  },
  {
    title: "Dealers & Distributors",
    description:
      "Channel pricing and reliable replenishment to keep your own counter stocked.",
  },
  {
    title: "Builders & Real Estate",
    description:
      "Complete electrical packages for residential and commercial developments.",
  },
  {
    title: "Government & Public Sector",
    description:
      "GeM-registered supply with full documentation and tender compliance support.",
  },
] as const;

export const whyChooseUs = [
  {
    title: "Authorized Channel Partner",
    description:
      "Genuine products with manufacturer warranty, sourced directly from the brand.",
  },
  {
    title: `${yearsOfExperience}+ Years of Experience`,
    description:
      "Three decades of specification know-how across every major industrial segment.",
  },
  {
    title: "Pan-India Delivery",
    description:
      "An established logistics network reaching sites across the country.",
  },
  {
    title: "System & Process Driven",
    description:
      "Documented quoting, order and despatch processes you can rely on.",
  },
  {
    title: "Competitive Pricing & Stock",
    description:
      "Large ready inventory backed by keen, transparent commercial terms.",
  },
  {
    title: "Technical Support",
    description:
      "Help with selection, sizing and substitution from engineers who know the products.",
  },
] as const;

export const finalCta = {
  title: "Need a quote for your next project?",
  body: "Send us your BOM or drawing and we'll come back with pricing and availability — usually the same working day.",
  primary: { label: "Request a Quote", href: "/contact" },
} as const;
