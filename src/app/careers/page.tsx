import type { ComponentType } from "react";
import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { ArrowRightIcon, CheckIcon, GlobeIcon, MailIcon, PinIcon } from "@/components/icons";
import {
  Button,
  Card,
  Eyebrow,
  Section,
  SectionBody,
  SectionTitle,
} from "@/components/ui";
import {
  applicationMailtoHref,
  benefitsSection,
  careersEmail,
  careersHero,
  careersMeta,
  generalApplication,
  generalApplicationMailtoHref,
  openPositions,
  positionsSection,
  whyWorkWithUs,
  type CareerBenefit,
} from "@/lib/content/careers";

export const metadata: Metadata = {
  title: careersMeta.title,
  description: careersMeta.description,
};

/* ---------------------------------------------------------------------------
   Icons used only by this page. Kept local rather than added to the shared
   icon set, matching the 24x24 stroke style used there.
   --------------------------------------------------------------------------- */
type IconProps = { className?: string };

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function LocalSvg({ className, children }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6"}
      aria-hidden="true"
      {...strokeProps}
    >
      {children}
    </svg>
  );
}

const GrowthIcon = (p: IconProps) => (
  <LocalSvg {...p}>
    <path d="M3.5 17.5l5.5-5.5 3.5 3.5 6-6.5" />
    <path d="M14.5 8.5h4v4" />
    <path d="M3.5 20.5h17" />
  </LocalSvg>
);

const AwardIcon = (p: IconProps) => (
  <LocalSvg {...p}>
    <circle cx="12" cy="9" r="5.5" />
    <path d="M8.7 13.7L7.5 21l4.5-2.4L16.5 21l-1.2-7.3" />
  </LocalSvg>
);

const PeopleIcon = (p: IconProps) => (
  <LocalSvg {...p}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M3.5 19.5v-1a4.5 4.5 0 014.5-4.5h2a4.5 4.5 0 014.5 4.5v1" />
    <path d="M16 5.6a3.2 3.2 0 010 5.9M17.5 14.2a4.5 4.5 0 013 4.2v1.1" />
  </LocalSvg>
);

const BriefcaseIcon = (p: IconProps) => (
  <LocalSvg {...p}>
    <rect x="2.8" y="7.5" width="18.4" height="12" rx="2" />
    <path d="M9 7.5V6a2 2 0 012-2h2a2 2 0 012 2v1.5M2.8 12.5h18.4" />
  </LocalSvg>
);

const ChevronDownIcon = (p: IconProps) => (
  <LocalSvg {...p}>
    <path d="M6 9.5l6 6 6-6" />
  </LocalSvg>
);

// Paired by the `icon` key on each whyWorkWithUs entry.
const benefitIcons: Record<CareerBenefit["icon"], ComponentType<IconProps>> = {
  growth: GrowthIcon,
  brands: AwardIcon,
  reach: GlobeIcon,
  culture: PeopleIcon,
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        title={careersHero.title}
        subtitle={careersHero.subtitle}
        breadcrumb={careersHero.breadcrumb}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={careersHero.primaryCta.href} variant="inverse">
            {careersHero.primaryCta.label}
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
          <Button href={generalApplicationMailtoHref} variant="ghost">
            <MailIcon className="h-4 w-4" />
            {careersHero.secondaryCtaLabel}
          </Button>
        </div>
      </PageHero>

      {/* Why work with us -------------------------------------------------- */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{benefitsSection.eyebrow}</Eyebrow>
          <SectionTitle>{benefitsSection.title}</SectionTitle>
          <SectionBody className="mt-5">{benefitsSection.body}</SectionBody>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {whyWorkWithUs.map((benefit) => {
            const Icon = benefitIcons[benefit.icon];
            return (
              <Card key={benefit.title} className="flex flex-col">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-brand-50 text-brand-700">
                  <Icon className="h-5.5 w-5.5" />
                </span>
                <h3 className="mt-5 text-base font-bold leading-snug tracking-tight text-brand-900">
                  {benefit.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {benefit.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* Open positions ---------------------------------------------------- */}
      <Section id={positionsSection.id} className="bg-brand-50">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{positionsSection.eyebrow}</Eyebrow>
          <SectionTitle>{positionsSection.title}</SectionTitle>
          <SectionBody className="mt-5">{positionsSection.body}</SectionBody>
        </div>

        {/* Native <details> keeps this expandable, keyboard-operable and
            crawlable without shipping any client-side JavaScript. */}
        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {openPositions.map((role) => (
            <details
              key={role.id}
              id={role.id}
              className="group rounded-xl border border-hairline bg-white shadow-card transition-shadow duration-200 hover:shadow-card-hover open:shadow-card-hover"
            >
              {/* <summary> takes phrasing content intermixed with heading
                  content, so the <h3> must be a DIRECT child — a <span> may
                  only contain phrasing content. The two-column layout is
                  therefore done with an explicitly placed grid rather than a
                  wrapper element around the title + meta pair. */}
              <summary className="grid cursor-pointer list-none grid-cols-[minmax(0,1fr)_auto] items-start gap-x-4 gap-y-2 p-6 [&::-webkit-details-marker]:hidden">
                <h3 className="col-start-1 row-start-1 text-lg font-bold leading-snug tracking-tight text-brand-900">
                  {role.title}
                </h3>
                <span className="col-start-1 row-start-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-[color:var(--color-muted)]">
                  <span className="inline-flex items-center gap-1.5">
                    <PinIcon className="h-4 w-4 text-brand-500" />
                    {role.location}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <BriefcaseIcon className="h-4 w-4 text-brand-500" />
                    {role.employmentType}
                  </span>
                </span>
                <span className="col-start-2 row-start-1 mt-0.5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
                  <span className="hidden sm:inline">
                    {positionsSection.detailsLabel}
                  </span>
                  <ChevronDownIcon className="h-5 w-5 transition-transform duration-200 group-open:rotate-180" />
                </span>
              </summary>

              <div className="border-t border-hairline px-6 py-5">
                <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {role.description}
                </p>
                <div className="mt-5">
                  <Button href={applicationMailtoHref(role.title)}>
                    <MailIcon className="h-4 w-4" />
                    {positionsSection.applyLabel}
                  </Button>
                </div>
              </div>
            </details>
          ))}
        </div>
      </Section>

      {/* General application ----------------------------------------------- */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_85%_0%,rgba(47,128,237,0.30),transparent_65%)]"
        />

        <div className="container-page relative py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {generalApplication.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-100">
                {generalApplication.body}
              </p>
              <ul className="mt-6 space-y-2.5">
                {generalApplication.checklist.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-brand-100">
                    <CheckIcon className="mt-0.5 h-4 w-4 flex-none text-volt-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                href={generalApplicationMailtoHref}
                variant="inverse"
                size="lg"
              className="w-full"
              >
                <MailIcon className="h-4 w-4" />
                {generalApplication.primaryLabel}
              </Button>
              <Button
                href={generalApplication.secondary.href}
                variant="ghost"
                size="lg"
              className="w-full"
              >
                {generalApplication.secondary.label}
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <p className="text-center text-sm text-brand-200">
                <a className="font-medium hover:text-white" href={`mailto:${careersEmail}`}>
                  {careersEmail}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
