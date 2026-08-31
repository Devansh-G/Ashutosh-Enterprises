/**
 * Copy for the /about page. Components in this repo carry no business copy —
 * everything the About page says lives here.
 *
 * Company facts (name, founding year, brand list, certifications) are read from
 * site-config.ts so they stay consistent with the rest of the site.
 */
import {
  brands,
  company,
  headOffice,
  offices as canonicalOffices,
  yearsOfExperience,
} from "@/lib/site-config";

/*
 * TODO(ecp): two figures in this file are unverified and each appears in more
 * than one place, so they can drift:
 *   - "5,000+ clients"     — aboutMeta.description, the "Today" milestone and
 *                            statsBand. Also hard-coded in site-config.ts
 *                            (hero.subtitle / hero.stats).
 *   - "50+ professionals"  — the "Today" milestone and statsBand.
 * Confirm both with the owner, then promote them to site-config.ts so every
 * page reads a single value.
 */

export const aboutMeta = {
  title: "About Us",
  description: `${company.name} has distributed industrial electrical and control panel products across India since ${company.foundedYear} — ${yearsOfExperience} years as an authorized channel partner, 5,000+ clients, and offices in Delhi, Bhiwadi and Jaipur.`,
} as const;

export const aboutHero = {
  title: `About ${company.name}`,
  breadcrumb: "About Us",
  subtitle: `Three decades of trusted industrial electrical distribution. Since ${company.foundedYear} we have supplied panel builders, OEMs, contractors and government buyers across India — ${yearsOfExperience} years of the same business, run on the same principle.`,
} as const;

/* -------------------------------------------------------------------------- */
/* 1. Our Story — rendered as the timeline that anchors the page.             */
/* -------------------------------------------------------------------------- */

/*
 * TODO(ecp): READ BEFORE LAUNCH — this entire timeline is modelled on the
 * REFERENCE COMPANY'S history (debak.co), not ECP's. The founding year, the
 * relocation, the order in which brand partnerships and branches arrived, the
 * headcount and the client count are all that company's real facts. The
 * milestone ARC is a design template; every fact in it must be replaced with
 * ECP's own history before this page is published. Named localities have
 * already been genericised so nothing here points at the other firm's premises.
 */
export const story = {
  eyebrow: "Our Story",
  title: "Built on honest business, one relationship at a time",
  lead: `${company.name} began in a small rented unit in south Delhi — no showroom, no shortcuts, just the belief that if you deal fairly, trust takes care of the rest. ${yearsOfExperience} years later that is still how the business is run, only now from three offices with ${brands.length} global brands on the shelf.`,
  timeline: [
    {
      // Founding year comes from site-config (company.foundedYear = 1996).
      year: `${company.foundedYear}`,
      title: "A small rented unit in Delhi",
      description:
        "The business opened in a modest unit with a single operating principle — do honest business and let trust do the rest. Every long-standing customer relationship we have today traces back to it.",
    },
    {
      // TODO(ecp): year inferred from "about two years in" — not verified.
      year: `${company.foundedYear + 2}`,
      title: "Into the heart of the electrical market",
      description:
        "About two years in, we moved into Delhi's main electrical trading district, which put us shoulder to shoulder with the contractors, panel builders and traders we supplied every day.",
    },
    {
      // TODO(ecp): confirm the year the Siemens channel partnership was signed.
      year: "Early 2000s",
      title: "The Siemens relationship begins",
      description:
        "Becoming an authorized Siemens channel partner changed the shape of the company: genuine switchgear with full manufacturer warranty, direct partner pricing, and factory-backed technical support on ACBs, MCCBs, contactors and meters.",
    },
    {
      // TODO(ecp): confirm the years the Bhiwadi and Jaipur branches opened.
      year: "Expansion years",
      title: "Into Rajasthan — Bhiwadi, then Jaipur",
      description:
        "Branches at Bhiwadi and Jaipur moved stock and service next door to Rajasthan's industrial belt, cutting lead times for customers who had until then been buying out of Delhi.",
    },
    {
      year: "Today",
      title: `${headOffice.city} head office, 50+ professionals`,
      description:
        "We operate from our head office in Delhi, with a team of over 50 professionals serving more than 5,000 clients — from single-panel workshops to pan-India EPC contractors and government buyers.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 2. Mission & Vision                                                        */
/* -------------------------------------------------------------------------- */

export const missionVision = {
  eyebrow: "Mission & Vision",
  title: "What we are here to do",
  items: [
    {
      icon: "mission",
      label: "Our Mission",
      statement:
        "To be the most trusted and reliable channel partner for industrial electrical products in India, delivering quality products with exceptional service, competitive pricing, and technical expertise to every customer.",
    },
    {
      icon: "vision",
      label: "Our Vision",
      statement:
        "To expand our reach across India as the go-to distributor for industrial electrical solutions, building lasting partnerships with global brands and empowering India's industrial growth.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 3. Core values                                                             */
/* -------------------------------------------------------------------------- */

export const coreValues = {
  eyebrow: "Core Values",
  // NOTE: the title hard-codes "Four" and the page renders these in a 4-column
  // grid — keep both in step with `items` below if a value is added or removed.
  title: "Four things we do not compromise on",
  body: "They are not posters on a wall — they are the rules we use to settle an argument about a price, a delivery date or a substitution.",
  items: [
    {
      icon: "customer",
      title: "Customer First",
      description:
        "Every decision we make is guided by what's best for our clients.",
    },
    {
      icon: "quality",
      title: "Quality Assurance",
      description:
        "Only genuine, certified products from authorized brand partnerships.",
    },
    {
      icon: "growth",
      title: "Continuous Growth",
      description:
        "Constantly expanding our product range, reach, and capabilities.",
    },
    {
      icon: "integrity",
      title: "Integrity",
      description:
        "Transparent pricing, honest dealings, and trustworthy partnerships.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */
/* 4. Stats band                                                              */
/* -------------------------------------------------------------------------- */

export const statsBand = {
  heading: `${company.shortName} at a glance`,
  items: [
    {
      value: `${yearsOfExperience}+`,
      label: "Years in business",
      detail: `Trading since ${company.foundedYear}`,
    },
    {
      value: "5,000+",
      label: "Clients served",
      detail: "Panel builders, OEMs, EPC and government",
    },
    {
      value: `${brands.length}+`,
      label: "Brand partners",
      detail: "Authorized channel partnerships",
    },
    {
      value: "50+",
      label: "Professionals",
      detail: "Sales, technical and despatch teams",
    },
  ],
  certificationsLabel: "Registered & certified",
} as const;

/* -------------------------------------------------------------------------- */
/* 5. Offices                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * TODO(ecp): all three addresses below are carried over from the reference
 * business and must be confirmed (including PIN codes) before launch.
 * Office SECTION COPY only — the addresses themselves come from site-config's
 * canonical `offices` array, so /about, /contact and the footer can never
 * disagree. The placeholder-address TODO(ecp) lives there.
 */
export const offices = {
  eyebrow: "Where We Are",
  // NOTE: this title and `story.lead` both say "three offices" — keep them in
  // step with the canonical `offices` array in site-config.ts.
  title: "Three offices, one supply chain",
  body: "A head office in Delhi and two Rajasthan branches, so material and answers both start closer to your site.",
  items: canonicalOffices,
} as const;

/* -------------------------------------------------------------------------- */
/* 6. Closing CTA                                                             */
/* -------------------------------------------------------------------------- */

export const closingCta = {
  title: `${yearsOfExperience} years of supply experience, at your disposal`,
  body: "Send us a BOM, a drawing or a single part number. Our team comes back with pricing and availability — usually the same working day.",
  primary: { label: "Talk to our team", href: "/contact" },
  secondary: { label: "Browse the product range", href: "/products" },
} as const;
