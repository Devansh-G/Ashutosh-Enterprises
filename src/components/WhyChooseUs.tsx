import { company, whyChooseUs } from "@/lib/site-config";
import {
  CalendarIcon,
  GearIcon,
  GlobeIcon,
  HeadsetIcon,
  ShieldIcon,
  TagIcon,
} from "./icons";
import { Eyebrow, Section, SectionTitle } from "./ui";

// Paired positionally with whyChooseUs entries in site-config.
const pillarIcons = [
  ShieldIcon,
  CalendarIcon,
  GlobeIcon,
  GearIcon,
  TagIcon,
  HeadsetIcon,
];

export default function WhyChooseUs() {
  return (
    <Section id="why-us">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Why Choose Us</Eyebrow>
        <SectionTitle>Why buyers stay with {company.shortName}</SectionTitle>
      </div>

      <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {whyChooseUs.map((pillar, i) => {
          const Icon = pillarIcons[i] ?? ShieldIcon;
          return (
            <div key={pillar.title} className="flex gap-4">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-brand-50 text-brand-700">
                <Icon className="h-5.5 w-5.5" />
              </span>
              <div>
                <h3 className="text-base font-bold leading-snug tracking-tight text-brand-900">
                  {pillar.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[color:var(--color-muted)]">
                  {pillar.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
