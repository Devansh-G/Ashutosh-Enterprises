"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import type { FormEvent } from "react";
import { CheckIcon } from "@/components/icons";
import {
  contactFields,
  emptyContactValues,
  enquiryForm,
  MAX_MESSAGE_LENGTH,
  MAX_SHORT_FIELD_LENGTH,
  validateContactValues,
  type ContactField,
  type ContactFieldErrors,
  type ContactFieldName,
  type ContactFormValues,
} from "@/lib/content/contact";
import { submitContactForm } from "./actions";

/* Local inline SVG — a warning glyph is not in the shared icon set. */
function AlertIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-4 w-4"}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v6M12 16.5h.01" />
    </svg>
  );
}

/*
 * No `focus:outline-none` here on purpose: globals.css defines the site-wide
 * :focus-visible ring in the base layer, and a utility would win the cascade
 * and delete the only visible focus indicator these controls have.
 */
const controlBase =
  "w-full rounded-lg border bg-white px-3.5 py-2.5 text-sm text-ink shadow-sm transition-colors placeholder:text-[color:var(--color-muted)] disabled:cursor-not-allowed disabled:bg-brand-50";
const controlIdle = "border-hairline hover:border-brand-300 focus:border-brand-500";
const controlInvalid = "border-red-400 focus:border-red-500";

const submitClasses =
  "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto";

const resetClasses =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-hairline bg-white px-5 py-3 text-sm font-semibold text-brand-900 transition-colors duration-200 hover:border-brand-300 hover:bg-brand-50";

/** Ids are derived, not stored, so the focus effect only needs the uid. */
const domId = (uid: string, name: ContactFieldName) => `${uid}-${name}`;

type FormError = { title: string; body: string };

export default function ContactForm() {
  const uid = useId();
  const [values, setValues] = useState<ContactFormValues>(() => ({
    ...emptyContactValues,
  }));
  const [errors, setErrors] = useState<ContactFieldErrors>({});
  const [isSent, setIsSent] = useState(false);
  const [formError, setFormError] = useState<FormError | null>(null);
  /** Field to move focus to once the form is interactive again. */
  const [focusField, setFocusField] = useState<ContactFieldName | null>(null);
  const [isPending, startTransition] = useTransition();
  const successRef = useRef<HTMLDivElement>(null);

  const fieldId = (name: ContactFieldName) => domId(uid, name);
  const errorId = (name: ContactFieldName) => `${uid}-${name}-error`;
  const hintId = (name: ContactFieldName) => `${uid}-${name}-hint`;

  // Controls are disabled while the submission is in flight, and a disabled
  // element cannot take focus — so wait for the transition to settle.
  useEffect(() => {
    if (!focusField || isPending) return;
    document.getElementById(domId(uid, focusField))?.focus();
    setFocusField(null);
  }, [focusField, isPending, uid]);

  // The form unmounts on success, which would drop focus to <body> and leave
  // keyboard and screen-reader users with no idea the message went through.
  useEffect(() => {
    if (isSent) successRef.current?.focus();
  }, [isSent]);

  function updateValue(name: ContactFieldName, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  /**
   * Validate a single field on blur — but stay quiet about a field that is
   * still empty and has never errored, so tabbing through the form does not
   * paint it red before the visitor has had a chance to type.
   */
  function validateField(name: ContactFieldName) {
    if (!values[name].trim() && !errors[name]) return;
    const message = validateContactValues(values)[name];
    setErrors((prev) => {
      const next = { ...prev };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  }

  /** Reports invalid fields inline and points the visitor at the first one. */
  function reportFieldErrors(fieldErrors: ContactFieldErrors) {
    setErrors(fieldErrors);
    setFormError({
      title: enquiryForm.error.validationTitle,
      body: enquiryForm.error.validation,
    });
    const firstInvalid = contactFields.find((field) => fieldErrors[field.name]);
    if (firstInvalid) setFocusField(firstInvalid.name);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateContactValues(values);
    if (Object.keys(nextErrors).length > 0) {
      reportFieldErrors(nextErrors);
      return;
    }

    setErrors({});
    setFormError(null);

    startTransition(async () => {
      try {
        const result = await submitContactForm(values);

        if (result.ok) {
          setValues({ ...emptyContactValues });
          setErrors({});
          setFormError(null);
          setFocusField(null);
          setIsSent(true);
          return;
        }

        // The server re-validates independently; surface anything it rejected.
        const serverFieldErrors = result.fieldErrors ?? {};
        if (Object.keys(serverFieldErrors).length > 0) {
          reportFieldErrors(serverFieldErrors);
          return;
        }

        setErrors({});
        setFormError({
          title: enquiryForm.error.title,
          body: result.message || enquiryForm.error.body,
        });
      } catch {
        setErrors({});
        setFormError({
          title: enquiryForm.error.title,
          body: enquiryForm.error.body,
        });
      }
    });
  }

  function handleReset() {
    setValues({ ...emptyContactValues });
    setErrors({});
    setFormError(null);
    setIsSent(false);
    // The reset button itself unmounts with the success panel, so hand focus
    // back to the top of the fresh form.
    setFocusField(contactFields[0].name);
  }

  return (
    <div className="rounded-2xl border border-hairline bg-white p-6 shadow-card sm:p-8">
      <h2 className="text-2xl font-bold tracking-tight text-brand-900 sm:text-3xl">
        {enquiryForm.heading}
      </h2>

      {isSent ? (
        <div
          ref={successRef}
          tabIndex={-1}
          role="status"
          className="mt-6 rounded-xl border border-brand-200 bg-brand-50 p-6"
        >
          <div className="flex items-start gap-4">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-full bg-brand-600 text-white">
              <CheckIcon className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-base font-bold tracking-tight text-brand-900">
                {enquiryForm.success.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted)]">
                {enquiryForm.success.body}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className={`mt-6 ${resetClasses}`}
          >
            {enquiryForm.success.resetLabel}
          </button>
        </div>
      ) : (
        <>
          <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
            {enquiryForm.intro}
          </p>

          <form
            noValidate
            onSubmit={handleSubmit}
            aria-busy={isPending}
            className="mt-7"
          >
            {formError && (
              <div
                role="alert"
                className="mb-6 flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4"
              >
                <AlertIcon className="mt-0.5 h-4 w-4 flex-none text-red-600" />
                <div className="text-sm">
                  <p className="font-semibold text-red-700">{formError.title}</p>
                  <p className="mt-1 leading-relaxed text-red-700">
                    {formError.body}
                  </p>
                </div>
              </div>
            )}

            <div className="grid gap-5 sm:grid-cols-2">
              {contactFields.map((field) => (
                <Field
                  key={field.name}
                  field={field}
                  value={values[field.name]}
                  error={errors[field.name]}
                  disabled={isPending}
                  fieldId={fieldId(field.name)}
                  errorId={errorId(field.name)}
                  hintId={hintId(field.name)}
                  onChange={(value) => updateValue(field.name, value)}
                  onBlur={() => validateField(field.name)}
                />
              ))}
            </div>

            <div className="mt-7 flex flex-col gap-4 sm:flex-row-reverse sm:items-center sm:justify-between">
              <button type="submit" className={submitClasses} disabled={isPending}>
                {isPending ? enquiryForm.submittingLabel : enquiryForm.submitLabel}
              </button>
              <p className="text-xs leading-relaxed text-[color:var(--color-muted)]">
                {enquiryForm.requiredLegend}
              </p>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

function Field({
  field,
  value,
  error,
  disabled,
  fieldId,
  errorId,
  hintId,
  onChange,
  onBlur,
}: {
  field: ContactField;
  value: string;
  error?: string;
  disabled: boolean;
  fieldId: string;
  errorId: string;
  hintId: string;
  onChange: (value: string) => void;
  onBlur: () => void;
}) {
  const describedBy =
    [field.hint ? hintId : null, error ? errorId : null]
      .filter(Boolean)
      .join(" ") || undefined;

  const controlClasses = `${controlBase} ${error ? controlInvalid : controlIdle}`;

  const shared = {
    id: fieldId,
    name: field.name,
    value,
    disabled,
    required: field.required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": describedBy,
    onBlur,
    className: controlClasses,
  } as const;

  return (
    <div className={field.span === "full" ? "sm:col-span-2" : undefined}>
      <label
        htmlFor={fieldId}
        className="block text-sm font-semibold text-brand-900"
      >
        {field.label}{" "}
        <span className="font-normal text-[color:var(--color-muted)]">
          {field.required ? "(required)" : "(optional)"}
        </span>
      </label>

      <div className="mt-2">
        {field.control === "input" && (
          <input
            {...shared}
            type={field.type}
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
            maxLength={MAX_SHORT_FIELD_LENGTH}
            onChange={(event) => onChange(event.target.value)}
          />
        )}

        {field.control === "select" && (
          <select
            {...shared}
            onChange={(event) => onChange(event.target.value)}
          >
            <option value="">{enquiryForm.selectPlaceholder}</option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {field.control === "textarea" && (
          <textarea
            {...shared}
            rows={field.rows}
            placeholder={field.placeholder}
            maxLength={MAX_MESSAGE_LENGTH}
            onChange={(event) => onChange(event.target.value)}
          />
        )}
      </div>

      {/* Hint sits AFTER the control so that label+input stay aligned across the
          two-column grid; aria-describedby links them by id, so order is free. */}
      {field.hint && (
        <p
          id={hintId}
          className="mt-1.5 text-xs leading-relaxed text-[color:var(--color-muted)]"
        >
          {field.hint}
        </p>
      )}

      {error && (
        <p
          id={errorId}
          className="mt-2 flex items-start gap-1.5 text-xs font-medium text-red-700"
        >
          <AlertIcon className="mt-px h-3.5 w-3.5 flex-none" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}
