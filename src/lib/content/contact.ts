/**
 * Copy + data for the /contact page. Components in this repo stay copy-free, so
 * every string the Contact page renders lives here.
 *
 * Company-wide details (phone, email, WhatsApp link, postal address) are NOT
 * restated here — they come from `@/lib/site-config`.
 *
 * This module also owns the shared field definitions and the pure validation
 * function, so the client form (ContactForm.tsx) and the server action
 * (actions.ts) enforce exactly the same rules instead of drifting apart.
 */

import { offices as canonicalOffices } from "@/lib/site-config";

/* ---------------------------------------------------------------------------
   Hero
   --------------------------------------------------------------------------- */

export const contactHero = {
  title: "Contact Us for Industrial Electrical Products",
  breadcrumb: "Contact",
  subtitle:
    "Send us your BOM, panel drawing or part list and a sales engineer will come back with pricing and availability — usually the same working day.",
} as const;

/* ---------------------------------------------------------------------------
   Enquiry form
   --------------------------------------------------------------------------- */

export const contactFieldNames = [
  "name",
  "email",
  "phone",
  "company",
  "subject",
  "message",
] as const;

export type ContactFieldName = (typeof contactFieldNames)[number];

/** Raw, untrimmed string values keyed by field name — what the form holds. */
export type ContactFormValues = Record<ContactFieldName, string>;

/** One human-readable message per invalid field. */
export type ContactFieldErrors = Partial<Record<ContactFieldName, string>>;

export const subjectOptions = [
  "General Inquiry",
  "Product Enquiry",
  "Request a Quote",
  "Partnership Inquiry",
  "Careers",
  "Other",
] as const;

type ContactFieldCommon = {
  name: ContactFieldName;
  label: string;
  required: boolean;
  /** Column span inside the two-column form grid. */
  span: "half" | "full";
  autoComplete?: string;
  placeholder?: string;
  /** Optional helper text rendered under the label and wired via aria-describedby. */
  hint?: string;
};

export type ContactField =
  | (ContactFieldCommon & { control: "input"; type: "text" | "email" | "tel" })
  | (ContactFieldCommon & { control: "select"; options: readonly string[] })
  | (ContactFieldCommon & { control: "textarea"; rows: number });

export const contactFields = [
  {
    name: "name",
    label: "Full Name",
    control: "input",
    type: "text",
    required: true,
    span: "half",
    autoComplete: "name",
    placeholder: "Your name",
  },
  {
    name: "email",
    label: "Email Address",
    control: "input",
    type: "email",
    required: true,
    span: "half",
    autoComplete: "email",
    placeholder: "name@company.com",
  },
  {
    name: "phone",
    label: "Phone Number",
    control: "input",
    type: "tel",
    required: true,
    span: "half",
    autoComplete: "tel",
    placeholder: "98100 00000",
    hint: "10-digit Indian mobile number, with or without +91.",
  },
  {
    name: "company",
    label: "Company Name",
    control: "input",
    type: "text",
    required: false,
    span: "half",
    autoComplete: "organization",
    placeholder: "Your company or firm",
  },
  {
    name: "subject",
    label: "Subject",
    control: "select",
    required: true,
    span: "full",
    options: subjectOptions,
  },
  {
    name: "message",
    label: "Message",
    control: "textarea",
    required: true,
    span: "full",
    rows: 6,
    placeholder:
      "Tell us what you need — brand, part numbers, quantities, delivery location and timeline.",
  },
] as const satisfies readonly ContactField[];

export const emptyContactValues = {
  name: "",
  email: "",
  phone: "",
  company: "",
  subject: "",
  message: "",
} as const satisfies ContactFormValues;

export const enquiryForm = {
  heading: "Send Us a Message",
  intro:
    "Share as much detail as you can — brand, part numbers, quantities and delivery location — and we will reply with pricing, stock position and lead time.",
  selectPlaceholder: "Select a subject",
  requiredLegend: "Fields marked (required) must be filled in.",
  submitLabel: "Send Message",
  submittingLabel: "Sending…",
  success: {
    title: "Thank you — your message has been received.",
    // TODO(ecp): confirm the response-time promise you want to publish here.
    body: "A member of our sales team will get back to you on the next working day. For anything urgent, call or WhatsApp us directly.",
    resetLabel: "Send another message",
  },
  error: {
    // Shown when delivery itself failed.
    title: "We could not send your message.",
    body: "Something went wrong on our side. Please try again, or reach us on phone or WhatsApp and we will pick it up straight away.",
    // Shown when the form was never sent because a field needs attention.
    validationTitle: "Please check a few details before sending.",
    validation: "The fields listed below need attention. Each one explains what is missing.",
  },
} as const;

/* ---------------------------------------------------------------------------
   Validation — shared by the client form and the server action.
   --------------------------------------------------------------------------- */

/** Deliberately permissive: rejects obvious typos without excluding valid addresses. */
const emailPattern = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;

/**
 * India-friendly mobile check: optional +91 / 91 / 0 prefix, then a 10-digit
 * number starting 6-9 (the current Indian mobile numbering range).
 */
const indiaPhonePattern = /^(?:\+?91)?[6-9]\d{9}$/;

export const MAX_MESSAGE_LENGTH = 2000;
export const MAX_SHORT_FIELD_LENGTH = 120;

/** Strips the separators people actually type: spaces, dashes, dots, brackets. */
function normalisePhone(value: string): string {
  return value.replace(/[\s().-]/g, "").replace(/^0+/, "");
}

export function validateContactValues(
  values: ContactFormValues,
): ContactFieldErrors {
  const errors: ContactFieldErrors = {};

  const name = values.name.trim();
  if (!name) {
    errors.name = "Please enter your full name.";
  } else if (name.length < 2) {
    errors.name = "Please enter at least 2 characters.";
  } else if (name.length > MAX_SHORT_FIELD_LENGTH) {
    errors.name = `Please keep this under ${MAX_SHORT_FIELD_LENGTH} characters.`;
  }

  const email = values.email.trim();
  if (!email) {
    errors.email = "Please enter your email address.";
  } else if (!emailPattern.test(email)) {
    errors.email = "Enter a valid email address, for example name@company.com.";
  }

  const phone = values.phone.trim();
  if (!phone) {
    errors.phone = "Please enter your phone number.";
  } else if (!indiaPhonePattern.test(normalisePhone(phone))) {
    errors.phone =
      "Enter a 10-digit Indian mobile number, with or without the +91 prefix.";
  }

  // Company is optional — only length is checked.
  if (values.company.trim().length > MAX_SHORT_FIELD_LENGTH) {
    errors.company = `Please keep this under ${MAX_SHORT_FIELD_LENGTH} characters.`;
  }

  const subject = values.subject.trim();
  if (!subject) {
    errors.subject = "Please choose a subject.";
  } else if (!(subjectOptions as readonly string[]).includes(subject)) {
    errors.subject = "Please choose a subject from the list.";
  }

  const message = values.message.trim();
  if (!message) {
    errors.message = "Please tell us what you need.";
  } else if (message.length < 10) {
    errors.message = "Please add a little more detail — at least 10 characters.";
  } else if (message.length > MAX_MESSAGE_LENGTH) {
    errors.message = `Please keep your message under ${MAX_MESSAGE_LENGTH} characters.`;
  }

  return errors;
}

/* ---------------------------------------------------------------------------
   Office locations. Declared before the contact-details panel because that
   panel reuses the head-office address instead of restating it.
   --------------------------------------------------------------------------- */

export const officesSection = {
  eyebrow: "Our Locations",
  title: "Offices across Delhi NCR and Rajasthan",
  // Deliberately free of office counts so the copy cannot drift from `offices`.
  body: "A corporate office in Delhi plus branches placed close to the industrial belts we serve, so material and support stay near your site.",
  // TODO(ecp): the branches show the head-office number from site-config.ts
  // because that is the only line we hold today. Supply a direct number (and
  // ideally a branch email) for Bhiwadi and Jaipur before this page goes live,
  // then give each office its own `phone` field here.
  headOfficePhoneNote: "Head office sales line.",
  branchPhoneNote: "Head office sales line — ask for the branch desk.",
} as const;

// Offices come from site-config's canonical `offices` array — the single place
// an address is written down, so /contact, /about and the footer cannot disagree.
// The placeholder-address TODO(ecp) lives there.
export const offices = canonicalOffices;

/* ---------------------------------------------------------------------------
   Contact details panel
   --------------------------------------------------------------------------- */

/** Single source for the head-office address on this page. */
const headOfficeLines = [...offices[0].lines, "India"] as const;

export const contactDetails = {
  heading: "Contact Details",
  intro:
    "Talk to us directly — sales, technical selection help and order status all go through the same desk.",
  labels: {
    phone: "Phone",
    email: "Email",
    address: "Head Office",
  },
  headOfficeLines,
  callLabel: "Call Sales",
  whatsappLabel: "Chat on WhatsApp",
  businessHours: {
    heading: "Business Hours",
    // TODO(ecp): confirm the opening hours before launch. These are assumed,
    // not supplied — about.ts deliberately publishes no hours for this reason.
    rows: [
      { days: "Monday - Saturday", hours: "9:30 AM - 6:30 PM" },
      { days: "Sunday", hours: "Closed" },
    ],
    note: "Enquiries that arrive outside business hours are answered on the next working day.",
  },
} as const;

/* ---------------------------------------------------------------------------
   Sales team coverage
   --------------------------------------------------------------------------- */

export const salesCoverage = {
  eyebrow: "Sales Coverage",
  title: "Sales Team Coverage",
  body: "Field sales and service are organised by territory, so you always deal with someone who knows your area, your site and your usual BOM.",
  // TODO(ecp): confirm this territory list, then add each territory owner's
  // name, direct number and email. Only territory names are published for now.
  territories: [
    "Faridabad",
    "Delhi",
    "Noida",
    "Ghaziabad",
    "Gurugram & Manesar",
    "Bhiwadi",
    "Jaipur",
  ],
  note: "Need a territory contact? Ask on the form above or call the head-office line and we will connect you to the right person.",
} as const;
