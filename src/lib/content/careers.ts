/**
 * All copy for the /careers page. Components in this repo stay copy-free —
 * edit the strings here and the page follows.
 */
import { brands, company, yearsOfExperience } from "@/lib/site-config";

// TODO(ecp): placeholder inbox — confirm the real careers email before launch.
export const careersEmail = "careers@ecpelectricals.com";

// TODO(ecp): confirm the branch office list. site-config only carries the
// Delhi address, so these city names are not yet backed by full addresses.
const officeCities = ["Delhi", "Bhiwadi", "Jaipur"] as const;

/** "A, B, and C" — keeps derived lists reading like prose. */
function toSentenceList(items: readonly string[]): string {
  if (items.length < 2) return items[0] ?? "";
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

// Brand names come from site-config so this page never restates the partner list.
const featuredBrands = toSentenceList(brands.slice(0, 3).map((brand) => brand.name));

export const careersMeta = {
  // TODO(ecp): keep the functions and cities below in step with openPositions —
  // this description restates them for search results and is not derived.
  title: "Careers",
  description: `Explore careers at ${company.name}. Open roles in sales, technical support, business development and operations across Delhi NCR and Jaipur.`,
} as const;

export const careersHero = {
  title: `Careers at ${company.name}`,
  breadcrumb: "Careers",
  subtitle:
    "Join a team that values growth, integrity, and customer excellence",
  primaryCta: { label: "See open positions", href: "#open-positions" },
  secondaryCtaLabel: "Email your resume",
} as const;

export const benefitsSection = {
  eyebrow: `Life at ${company.shortName}`,
  title: "Why Work With Us?",
  body: `An authorized channel partner team that has been growing for ${yearsOfExperience}+ years — here is what that means for your career.`,
} as const;

export const whyWorkWithUs = [
  {
    icon: "growth",
    title: "Growth Opportunities",
    description:
      "Work with a rapidly growing company and advance your career in industrial electrical distribution.",
  },
  {
    icon: "brands",
    title: "Work with Industry Leaders",
    description: `Gain experience with global brands like ${featuredBrands}.`,
  },
  {
    icon: "reach",
    title: "Pan-India Reach",
    description: `Be part of a team serving clients across India from our offices in ${toSentenceList(
      officeCities,
    )}.`,
  },
  {
    icon: "culture",
    // TODO(ecp): confirm the ownership/culture claim. An earlier draft said
    // "family-run business", which nothing in site-config supports — reinstate
    // it only if that is accurate.
    title: "Supportive Culture",
    description: `Join a close-knit team where ${yearsOfExperience}+ years of values-driven culture and team spirit shape how we work.`,
  },
] as const;

export type CareerBenefit = (typeof whyWorkWithUs)[number];

// TODO(ecp): confirm the live vacancy list before launch — the role titles,
// locations, employment types and briefs below are drafts. Deliberately no
// salary, headcount or closing date is stated for any role.
export const openPositions = [
  {
    id: "sales-engineer",
    title: "Sales Engineer",
    location: "Delhi NCR",
    employmentType: "Full-time",
    description:
      "Drive sales of industrial electrical products across Delhi NCR. Strong technical knowledge of switchgear, cables, and motor products required.",
  },
  {
    id: "technical-support-executive",
    title: "Technical Support Executive",
    location: "Delhi",
    employmentType: "Full-time",
    description:
      "Provide technical guidance to customers on product selection, specifications, and applications for our brand partner products.",
  },
  {
    id: "business-development-manager",
    title: "Business Development Manager",
    location: "Jaipur",
    employmentType: "Full-time",
    description:
      "Expand our customer base in Rajasthan. Build relationships with new clients and grow revenue from existing accounts.",
  },
  {
    id: "inventory-operations-coordinator",
    title: "Inventory & Operations Coordinator",
    location: "Delhi",
    employmentType: "Full-time",
    description:
      "Manage inventory, coordinate with brand partners for stock replenishment, and timely order fulfillment.",
  },
] as const;

// Widened to `number` so the pluralisation below is not narrowed away by the
// `as const` literal length (TS2367) and still tracks the array.
const openPositionCount: number = openPositions.length;

export const positionsSection = {
  id: "open-positions",
  eyebrow: "We're Hiring",
  title: "Open Positions",
  // Count is derived from the array above so it can never drift; the verb
  // agrees with it so a single remaining vacancy still reads correctly.
  body: `${openPositionCount} ${
    openPositionCount === 1 ? "role is" : "roles are"
  } open right now. Expand a role to read the brief, then apply by email.`,
  detailsLabel: "Details",
  applyLabel: "Apply for this role",
} as const;

export const generalApplication = {
  title: "Don't see a suitable position? Send us your resume anyway!",
  // TODO(ecp): confirm this response commitment ("we read every application")
  // with the hiring team — it is a promise to candidates, not supplied copy.
  body: `We read every application and get in touch when a role that fits opens up at ${company.name}.`,
  // TODO(ecp): confirm what the hiring team wants applicants to send.
  checklist: [
    "An updated resume as a PDF or Word document",
    "The role or function you are interested in",
    "Your current location and preferred office",
  ],
  primaryLabel: "Email your resume",
  secondary: { label: "Contact us", href: "/contact" },
} as const;

/** mailto: for a specific vacancy, with the role named in the subject line. */
export function applicationMailtoHref(roleTitle: string): string {
  const subject = `Application: ${roleTitle} — ${company.name}`;
  return `mailto:${careersEmail}?subject=${encodeURIComponent(subject)}`;
}

/** mailto: for speculative applications. */
export const generalApplicationMailtoHref = `mailto:${careersEmail}?subject=${encodeURIComponent(
  `General application — ${company.name}`,
)}`;
