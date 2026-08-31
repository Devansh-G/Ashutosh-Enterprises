import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import {
  CalendarIcon,
  MailIcon,
  PhoneIcon,
  PinIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { Button, Card, Eyebrow, Section, SectionBody, SectionTitle } from "@/components/ui";
import {
  contactDetails,
  contactHero,
  offices,
  officesSection,
  salesCoverage,
} from "@/lib/content/contact";
import { company, whatsappHref } from "@/lib/site-config";
import ContactForm from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact ECP Electricals for control panel components, switchgear, cables and metering. Send an enquiry, call our Delhi head office, or reach the Bhiwadi and Jaipur branches.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title={contactHero.title}
        subtitle={contactHero.subtitle}
        breadcrumb={contactHero.breadcrumb}
      />

      {/* Enquiry form + direct contact details */}
      <Section>
        <div className="grid gap-8 lg:grid-cols-[1.25fr_1fr] lg:items-start lg:gap-10">
          <ContactForm />

          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-2xl bg-brand-900 p-6 text-white shadow-card sm:p-8">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_90%_0%,rgba(47,128,237,0.30),transparent_65%)]"
              />

              <div className="relative">
                <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                  {contactDetails.heading}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-100">
                  {contactDetails.intro}
                </p>

                <dl className="mt-7 space-y-6">
                  <div className="flex items-start gap-3.5">
                    <PhoneIcon className="mt-0.5 h-5 w-5 flex-none text-brand-300" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-300">
                        {contactDetails.labels.phone}
                      </dt>
                      <dd className="mt-1 text-base font-semibold">
                        <a href={company.phoneHref} className="hover:text-brand-200">
                          {company.phone}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <MailIcon className="mt-0.5 h-5 w-5 flex-none text-brand-300" />
                    <div className="min-w-0">
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-300">
                        {contactDetails.labels.email}
                      </dt>
                      <dd className="mt-1 break-words text-base font-semibold">
                        <a
                          href={`mailto:${company.email}`}
                          className="hover:text-brand-200"
                        >
                          {company.email}
                        </a>
                      </dd>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <PinIcon className="mt-0.5 h-5 w-5 flex-none text-brand-300" />
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-300">
                        {contactDetails.labels.address}
                      </dt>
                      <dd className="mt-1">
                        <address className="text-sm not-italic leading-relaxed text-brand-100">
                          {contactDetails.headOfficeLines.map((line) => (
                            <span key={line} className="block">
                              {line}
                            </span>
                          ))}
                        </address>
                      </dd>
                    </div>
                  </div>
                </dl>

                <div className="mt-8 flex flex-col gap-3">
                  <Button href={whatsappHref} variant="inverse" className="w-full">
                    <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                    {contactDetails.whatsappLabel}
                  </Button>
                  <Button href={company.phoneHref} variant="ghost" className="w-full">
                    <PhoneIcon className="h-4 w-4" />
                    {contactDetails.callLabel}
                  </Button>
                </div>
              </div>
            </div>

            <Card>
              <h3 className="flex items-center gap-2.5 text-base font-bold tracking-tight text-brand-900">
                <CalendarIcon className="h-5 w-5 flex-none text-brand-600" />
                {contactDetails.businessHours.heading}
              </h3>

              <dl className="mt-4">
                {contactDetails.businessHours.rows.map((row) => (
                  <div
                    key={row.days}
                    className="flex items-baseline justify-between gap-4 border-t border-hairline py-2.5 first:border-t-0 first:pt-0"
                  >
                    <dt className="text-sm text-[color:var(--color-muted)]">
                      {row.days}
                    </dt>
                    <dd className="text-sm font-semibold text-brand-900">
                      {row.hours}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-4 border-t border-hairline pt-4 text-xs leading-relaxed text-[color:var(--color-muted)]">
                {contactDetails.businessHours.note}
              </p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Office locations */}
      <Section className="bg-brand-50">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{officesSection.eyebrow}</Eyebrow>
          <SectionTitle>{officesSection.title}</SectionTitle>
          <SectionBody className="mt-5">{officesSection.body}</SectionBody>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3 lg:gap-6">
          {offices.map((office) => (
            <Card key={office.city} className="flex flex-col">
              <span className="inline-flex w-fit items-center rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-brand-700">
                {office.kind}
              </span>

              <h3 className="mt-4 text-lg font-bold tracking-tight text-brand-900">
                {office.city}
              </h3>

              <address className="mt-3 flex-1 text-sm not-italic leading-relaxed text-[color:var(--color-muted)]">
                {office.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              {/*
                TODO(ecp): every card deliberately shows the single head-office
                number from site-config.ts — no branch numbers are invented. The
                note below tells the visitor which line they are calling.
              */}
              <div className="mt-5 border-t border-hairline pt-4">
                <a
                  href={company.phoneHref}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  <PhoneIcon className="h-4 w-4 flex-none" />
                  <span>
                    {company.phone}
                    <span className="sr-only"> — {office.city} office</span>
                  </span>
                </a>
                <p className="mt-1.5 text-xs text-[color:var(--color-muted)]">
                  {office.isHeadOffice
                    ? officesSection.headOfficePhoneNote
                    : officesSection.branchPhoneNote}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Sales team coverage */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{salesCoverage.eyebrow}</Eyebrow>
          <SectionTitle>{salesCoverage.title}</SectionTitle>
          <SectionBody className="mt-5">{salesCoverage.body}</SectionBody>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {salesCoverage.territories.map((territory) => (
            <li
              key={territory}
              className="flex items-center gap-3 rounded-xl border border-hairline bg-white p-4 shadow-card"
            >
              <span className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-brand-50 text-brand-600">
                <PinIcon className="h-5 w-5" />
              </span>
              <span className="text-sm font-semibold text-brand-900">
                {territory}
              </span>
            </li>
          ))}
        </ul>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-[color:var(--color-muted)]">
          {salesCoverage.note}
        </p>
      </Section>
    </>
  );
}
