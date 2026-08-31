import type { Metadata } from "next";
import type { ReactNode } from "react";
import PageHero from "@/components/PageHero";
import {
  ArrowRightIcon,
  BoltIcon,
  GlobeIcon,
  HeadsetIcon,
  PinIcon,
  ShieldIcon,
} from "@/components/icons";
import {
  Button,
  Card,
  Eyebrow,
  Section,
  SectionBody,
  SectionTitle,
} from "@/components/ui";
import { certifications, officeMapHref } from "@/lib/site-config";
import {
  aboutHero,
  aboutMeta,
  closingCta,
  coreValues,
  missionVision,
  offices,
  statsBand,
  story,
} from "@/lib/content/about";

export const metadata: Metadata = {
  title: aboutMeta.title,
  description: aboutMeta.description,
};

/* -------------------------------------------------------------------------- */
/* Local icons — these two are not in components/icons.tsx, so they are        */
/* defined here rather than editing the shared icon set.                       */
/* -------------------------------------------------------------------------- */

type IconProps = { className?: string };

function LocalSvg({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6"}
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {children}
    </svg>
  );
}

/** Upward trend line — used for "Continuous Growth". */
function TrendUpIcon(props: IconProps) {
  return (
    <LocalSvg {...props}>
      <path d="M3.5 16.8l5.2-5.2 3.3 3.3 6.5-7" />
      <path d="M14.6 7.9h4.4v4.4" />
    </LocalSvg>
  );
}

/** Balance scales — used for "Integrity". */
function ScalesIcon(props: IconProps) {
  return (
    <LocalSvg {...props}>
      <path d="M12 4.6v13.9M8 18.5h8M4.6 8.4h14.8" />
      <path d="M4.6 8.4L2.2 13.4h4.8z" />
      <path d="M19.4 8.4L17 13.4h4.8z" />
    </LocalSvg>
  );
}

const valueIcons: Record<
  (typeof coreValues.items)[number]["icon"],
  (props: IconProps) => ReactNode
> = {
  customer: HeadsetIcon,
  quality: ShieldIcon,
  growth: TrendUpIcon,
  integrity: ScalesIcon,
};

const missionVisionIcons: Record<
  (typeof missionVision.items)[number]["icon"],
  (props: IconProps) => ReactNode
> = {
  mission: BoltIcon,
  vision: GlobeIcon,
};

/** Square icon chip used by the value / mission / office cards. */
function IconChip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-lg border border-brand-100 bg-brand-50 text-brand-600">
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------------- */

export default function AboutPage() {
  return (
    <>
      <PageHero
        title={aboutHero.title}
        subtitle={aboutHero.subtitle}
        breadcrumb={aboutHero.breadcrumb}
      />

      {/* 1. Our Story — timeline ------------------------------------------- */}
      <Section id="our-story">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>{story.eyebrow}</Eyebrow>
            <SectionTitle>{story.title}</SectionTitle>
            <SectionBody className="mt-5">{story.lead}</SectionBody>
          </div>

          <ol role="list" className="list-none">
            {story.timeline.map((milestone, index) => {
              const isLast = index === story.timeline.length - 1;

              return (
                <li
                  key={milestone.title}
                  className={`relative pl-14 sm:pl-16 ${isLast ? "" : "pb-8 sm:pb-10"}`}
                >
                  {/* Vertical spine, drawn per item so the last one stops. */}
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-5 top-12 w-px -translate-x-1/2 bg-hairline"
                    />
                  )}

                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-0 inline-flex h-10 w-10 items-center justify-center rounded-full border border-brand-100 bg-brand-50 text-brand-600"
                  >
                    <BoltIcon className="h-5 w-5" />
                  </span>

                  <Card>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-volt-700">
                      {milestone.year}
                    </p>
                    <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-brand-900">
                      {milestone.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                      {milestone.description}
                    </p>
                  </Card>
                </li>
              );
            })}
          </ol>
        </div>
      </Section>

      {/* 2. Mission & Vision ---------------------------------------------- */}
      <Section id="mission-vision" className="bg-brand-50">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{missionVision.eyebrow}</Eyebrow>
          <SectionTitle>{missionVision.title}</SectionTitle>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:gap-6">
          {missionVision.items.map((item) => {
            const Icon = missionVisionIcons[item.icon];

            return (
              <Card key={item.label} className="flex flex-col sm:p-8">
                <IconChip>
                  <Icon className="h-5 w-5" />
                </IconChip>
                <h3 className="mt-5 text-xl font-bold tracking-tight text-brand-900">
                  {item.label}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-[color:var(--color-muted)]">
                  {item.statement}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* 3. Core values ---------------------------------------------------- */}
      <Section id="values">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{coreValues.eyebrow}</Eyebrow>
          <SectionTitle>{coreValues.title}</SectionTitle>
          <SectionBody className="mt-5">{coreValues.body}</SectionBody>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {coreValues.items.map((value) => {
            const Icon = valueIcons[value.icon];

            return (
              <Card key={value.title} className="flex flex-col">
                <IconChip>
                  <Icon className="h-5 w-5" />
                </IconChip>
                <h3 className="mt-5 text-base font-bold leading-snug tracking-tight text-brand-900">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {value.description}
                </p>
              </Card>
            );
          })}
        </div>
      </Section>

      {/* 4. Stats band ----------------------------------------------------- */}
      <section
        id="at-a-glance"
        className="relative overflow-hidden bg-brand-900 text-white"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_15%_0%,rgba(47,128,237,0.28),transparent_65%)]"
        />

        <div className="container-page relative py-14 sm:py-16 lg:py-20">
          <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-brand-300">
            {statsBand.heading}
          </h2>

          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-8 lg:grid-cols-4">
            {statsBand.items.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                {/* Visual order is value -> label -> detail; the DOM keeps
                    <dt> before its <dd>s so the list stays valid. */}
                <dt className="order-2 mt-1 text-sm font-semibold text-brand-100">
                  {stat.label}
                </dt>
                <dd className="order-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  {stat.value}
                </dd>
                <dd className="order-3 mt-1 text-xs leading-relaxed text-brand-300">
                  {stat.detail}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-white/10 pt-8">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-300">
              {statsBand.certificationsLabel}
            </span>
            {certifications.map((cert) => (
              <span
                key={cert}
                className="rounded border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-brand-100"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Offices -------------------------------------------------------- */}
      <Section id="offices" className="bg-brand-50">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{offices.eyebrow}</Eyebrow>
          <SectionTitle>{offices.title}</SectionTitle>
          <SectionBody className="mt-5">{offices.body}</SectionBody>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {offices.items.map((office) => (
            <Card key={office.city} className="flex flex-col">
              <div className="flex items-start justify-between gap-3">
                <IconChip>
                  <PinIcon className="h-5 w-5" />
                </IconChip>
                <span className="rounded-full border border-hairline bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">
                  {office.kind}
                </span>
              </div>

              <h3 className="mt-5 text-lg font-bold tracking-tight text-brand-900">
                {office.city}
              </h3>

              <address className="mt-3 text-sm not-italic leading-relaxed text-[color:var(--color-muted)]">
                {office.lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>

              <p className="mt-4 flex-1 text-sm leading-relaxed text-[color:var(--color-muted)]">
                {office.focus}
              </p>

              <a
                href={officeMapHref(office)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View on map: ${office.city} office on Google Maps (opens in a new tab)`}
                className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                View on map
                <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </Card>
          ))}
        </div>
      </Section>

      {/* 6. Closing CTA ---------------------------------------------------- */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_85%_0%,rgba(47,128,237,0.30),transparent_65%)]"
        />

        <div className="container-page relative py-16 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {closingCta.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-100">
                {closingCta.body}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Button
                href={closingCta.primary.href}
                variant="inverse"
                size="lg"
              className="w-full"
              >
                {closingCta.primary.label}
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button
                href={closingCta.secondary.href}
                variant="ghost"
                size="lg"
              className="w-full"
              >
                {closingCta.secondary.label}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
