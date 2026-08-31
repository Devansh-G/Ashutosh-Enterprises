/**
 * Copy + data for the /products page.
 *
 * NOTE ON OVERLAP WITH site-config.ts: `brands` in src/lib/site-config.ts is a
 * deliberately SHORT summary used by the homepage ProductRange grid. THIS file is
 * the richer superset — the same ten brand partners, but with a one-line scope, a
 * descriptive sentence and the complete product-category list for each. Keep the
 * two in the same order; if a brand is added or dropped, update both. Category
 * counts are always derived from `categories.length` in code, never written out
 * as literals, so a number can never drift away from the list beside it.
 *
 * TODO(ecp): the per-brand descriptive sentences below were drafted for the site
 * and include soft availability claims ("stocked deep", "ready stock") — as does
 * the stat label "Product categories stocked". Please confirm they are accurate
 * for each brand agreement before go-live.
 *
 * TODO(ecp): the `categories` lists below are a SUPERSET of the product lines in
 * site-config's `brands` — they were drafted from the brand portfolios, not from
 * a supplied line card, so several entries are inferred (e.g. Siemens MPCB, soft
 * starters, RCCB/RCBO; Phoenix Contact surge protection, Profinet; Secure ABT/HT/
 * NET meters; Innomotics TEFC/brake/crane motors; Salzer plugs & sockets). Every
 * headline number on the page is derived from these arrays, so confirm the lists
 * before go-live: correcting a list silently corrects the published counts.
 */

export type ProductBrand = {
  /** Brand partner name, as it should be printed. */
  name: string;
  /** URL-fragment id used for the in-page anchor links. */
  slug: string;
  /** One-line scope of what we carry for this brand. */
  scope: string;
  /** Short descriptive sentence in the homepage voice. */
  description: string;
  /** Full product-category list. The count on the page is this array's length. */
  categories: readonly string[];
};

export const productBrands = [
  {
    name: "Siemens",
    slug: "siemens",
    scope: "LV Switchgears & Controlgear",
    description:
      "The backbone of most panels we supply — breakers, contactors, relays and metering, stocked deep across ratings.",
    categories: [
      "Air Circuit Breaker (ACB)",
      "Moulded Case Circuit Breaker (MCCB)",
      "Switch Fuse Unit (SFU)",
      "Miniature Circuit Breaker (MCB)",
      "Power Contactor & Overload Relay",
      "Meters",
      "Fuse & Fuse Base",
      "PF Capacitor & APFC Relay",
      "Motor Protection Circuit Breaker",
      "Cap Duty Contactor",
      "Soft Starters",
      "Motor Starters",
      "Timing & Monitoring Relays",
      "Plugin Relays",
      "RCCB & RCBO",
    ],
  },
  {
    name: "Polycab",
    slug: "polycab",
    scope: "Wires & Cables",
    description:
      "FR, FRLS and armoured wires and cables in coil and drum lengths for panel wiring and site runs.",
    categories: ["Flexible Wires & Cables (FR & FRLS)", "Armoured Wires & Cables"],
  },
  {
    name: "Phoenix Contact",
    slug: "phoenix-contact",
    scope: "Terminal Blocks, SMPS & Automation",
    description:
      "German terminal blocks, power supplies and industrial networking for clean, serviceable panel wiring.",
    categories: [
      "Terminal Blocks",
      "SMPS Power Supplies",
      "Surge Protection Devices",
      "Signal Converters & Switching Devices",
      "Automation Components & Systems",
      "Patch Cables & Ethernet Switches",
      "Profinet Connectors",
    ],
  },
  {
    name: "Secure",
    slug: "secure",
    scope: "Energy Meters & Metering Solutions",
    description:
      "Accurate energy metering for panels, HT installations, ABT and net metering, with documentation for utility approval.",
    categories: [
      "Panel Meters",
      "Multi-function Meters",
      "ABT Meters",
      "HT Meters",
      "NET Meters",
    ],
  },
  {
    name: "Elmeasure",
    slug: "elmeasure",
    scope: "Changeover Switches & Transfer Systems",
    description:
      "Automatic and manual changeover gear for dependable source transfer between mains, DG and backup supply.",
    categories: [
      "Automatic Transfer Switch",
      "Manual Changeover Switch",
      "Automatic Changeover with Current Limiter",
    ],
  },
  {
    name: "Eaton",
    slug: "eaton",
    scope: "AC/DC Low Voltage Switchgear & Solar",
    description:
      "AC and DC low-voltage switchgear from 800V to 1140V, plus dedicated product for solar applications.",
    categories: [
      // TODO(ecp): the 800V-1140V band is not in the brief — confirm the actual
      // range, or drop the parenthetical.
      "AC/DC Low Voltage Switchgear (800V-1140V)",
      "Solar Application Products",
    ],
  },
  {
    name: "Innomotics",
    slug: "innomotics",
    scope: "LV Industrial Motors",
    description:
      "Low-voltage industrial motors selected and supplied to duty — TEFC, brake and crane applications.",
    categories: [
      "LV Industrial Motors",
      "TEFC Motors",
      "Brake Motors",
      "Crane Duty Motors",
    ],
  },
  {
    name: "Havells",
    slug: "havells",
    scope: "Lighting, Cables & Capacitors",
    description:
      "Industrial and commercial lighting, cables and capacitors that round out a complete electrical package.",
    categories: ["Lighting Fixtures", "Cables", "Capacitors"],
  },
  {
    name: "Salzer",
    slug: "salzer",
    scope: "Cable Ducts and Switches",
    description:
      "Cable ducts, cam-operated rotary switches and industrial plugs and sockets for tidy, safe panel builds.",
    categories: [
      "Cable Ducts",
      "Cam Operated Rotary Switches",
      "Industrial Plugs & Sockets",
    ],
  },
  {
    name: "Klauke",
    slug: "klauke",
    scope: "Hydraulic Crimping & Cutting Tools",
    description:
      "Battery-powered hydraulic crimping and cutting tools that make termination work faster on site.",
    categories: [
      "Battery Powered Hydraulic Crimping Tools",
      "Battery Powered Hydraulic Cutting Tools",
    ],
  },
] as const satisfies readonly ProductBrand[];

/** Total product categories across every brand — derived, never hard-coded. */
export const totalProductCategories = productBrands.reduce(
  (total, brand) => total + brand.categories.length,
  0,
);

export const productsPage = {
  /**
   * Noun for the derived per-brand count. Lives here so no business copy sits in
   * the component; the page picks a form with a `(count: number)` helper.
   */
  categoryCount: {
    one: "product category",
    many: "product categories",
  },
  meta: {
    title: "Products",
    description: `Authorized channel partner for ${productBrands.length} global brands across ${totalProductCategories} product categories — Siemens, Polycab, Phoenix Contact, Eaton, Havells and more, with pan-India delivery.`,
  },
  hero: {
    title: "Our Products & Brand Partners",
    breadcrumb: "Products",
    subtitle: `Authorized channel partner for ${productBrands.length} global brands across ${totalProductCategories} product categories — from LV switchgear and control-panel components to cables, meters, motors and crimping tools, all on one purchase order.`,
    priceListCta: "Request price list on WhatsApp",
    emailCta: "Email us for prices",
    /** Pre-filled subject for the hero's mailto: CTA. */
    emailSubject: "Price list request — products",
  },
  brandsSection: {
    eyebrow: "Brand Partners",
    title: "Every brand we are authorized for",
    body: "Genuine product with full manufacturer warranty, quoted at authorized-partner rates. Pick a brand to jump straight to its complete category list.",
    /**
     * Labels for the summary strip. The numbers beside them are derived in the
     * page from productBrands.length / totalProductCategories.
     */
    statLabels: {
      brands: "Global brand partners",
      categories: "Product categories stocked",
      authorized: "Authorized channel supply",
    },
    authorizedValue: "Genuine",
    complianceLabel: "Compliance & channels",
    jumpLabel: "View categories",
  },
  categoriesSection: {
    // TODO(ecp): "we source across each brand's catalogue" is a sourcing promise —
    // confirm it holds for every brand below, or soften the wording.
    eyebrow: "Full Catalogue",
    title: "Complete Product Categories",
    body: "The full line card, brand by brand. If a part number is not listed here, ask anyway — we source across each brand's catalogue.",
    jumpNavLabel: "Jump to a brand",
    backToBrands: "Back to brand partners",
    enquirePrefix: "Ask for",
    enquireSuffix: "prices",
  },
  closingCta: {
    // TODO(ecp): the "same working day" turnaround is reused from site-config's
    // finalCta. Confirm it is still the commitment you want published.
    title: "Cannot find the part number you need?",
    body: "Send us your BOM, drawing or part list and we will confirm pricing, stock and lead time — usually the same working day.",
    primary: { label: "Request a Quote", href: "/contact" },
    /** Label only — the href comes from whatsappHref in site-config.ts. */
    whatsappLabel: "Send your BOM on WhatsApp",
  },
} as const;
