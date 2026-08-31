"use server";

import {
  contactFieldNames,
  emptyContactValues,
  enquiryForm,
  validateContactValues,
  type ContactFieldErrors,
  type ContactFormValues,
} from "@/lib/content/contact";

/* ===========================================================================
   TODO(ecp): THIS FORM DOES NOT DELIVER MAIL ANYWHERE YET.
   ---------------------------------------------------------------------------
   `submitContactForm` validates the enquiry, writes it to the server log and
   returns success. Nothing is emailed, stored or forwarded — so on the live
   site every enquiry would be LOST as soon as the log rotates.
   Before launch, wire the marked spot below to ONE of:
     - a transactional email service (Resend / Amazon SES / Postmark), or
     - an SMTP relay, or
     - a hosted form provider (Formspree, Basin, HubSpot Forms).
   That work also needs: the recipient address(es), credentials held as
   server-only environment variables, spam protection (honeypot or CAPTCHA),
   rate limiting, and a decision on whether enquiries should also be persisted
   to a database or CRM. No provider, SDK or env var is referenced here on
   purpose — do not guess one.
   =========================================================================== */

export type ContactSubmitResult =
  | { ok: true }
  | { ok: false; message: string; fieldErrors?: ContactFieldErrors };

/** Hard cap applied before validation so a hostile payload cannot blow up logs. */
const MAX_RAW_FIELD_LENGTH = 5000;

/**
 * Server actions accept whatever the network hands them, so the payload is
 * treated as untrusted and re-shaped into known string fields before use.
 */
function coerceValues(input: unknown): ContactFormValues | null {
  if (typeof input !== "object" || input === null) return null;

  const record = input as Record<string, unknown>;
  const values: ContactFormValues = { ...emptyContactValues };

  for (const field of contactFieldNames) {
    const raw = record[field];
    if (raw === undefined || raw === null) continue;
    if (typeof raw !== "string") return null;
    values[field] = raw.slice(0, MAX_RAW_FIELD_LENGTH);
  }

  return values;
}

/**
 * Handles a Contact-page enquiry.
 *
 * Client-side validation is a convenience only — everything is validated again
 * here, because a server action is a public endpoint that can be called
 * directly without ever loading the form.
 */
export async function submitContactForm(
  input: unknown,
): Promise<ContactSubmitResult> {
  const values = coerceValues(input);

  if (!values) {
    return { ok: false, message: enquiryForm.error.body };
  }

  const fieldErrors = validateContactValues(values);
  if (Object.keys(fieldErrors).length > 0) {
    return { ok: false, message: enquiryForm.error.validation, fieldErrors };
  }

  // TODO(ecp): replace this log with the real delivery call (see the block at
  // the top of this file). The payload below contains personal data, so any
  // permanent logging also needs a retention / redaction policy.
  console.info("[contact] enquiry received", {
    receivedAt: new Date().toISOString(),
    name: values.name.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    company: values.company.trim() || null,
    subject: values.subject.trim(),
    message: values.message.trim(),
  });

  return { ok: true };
}
