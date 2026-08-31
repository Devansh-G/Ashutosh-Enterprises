import Link from "next/link";
import { industries } from "@/lib/site-config";
import { ArrowRightIcon } from "./icons";
import { Eyebrow, Section, SectionBody, SectionTitle } from "./ui";

export default function Industries() {
  return (
    <Section id="industries" className="bg-brand-50">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Industries Served</Eyebrow>
        <SectionTitle>Built for how your business buys</SectionTitle>
        <SectionBody className="mt-5">
          Six customer segments, each with a supply model shaped around the way
          they actually order.
        </SectionBody>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {industries.map((industry) => (
          <Link
            key={industry.title}
            href="/contact"
            className="group flex flex-col rounded-xl border border-hairline bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover"
          >
            <h3 className="text-base font-bold leading-snug tracking-tight text-brand-900">
              {industry.title}
            </h3>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[color:var(--color-muted)]">
              {industry.description}
            </p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
              Enquire
              <ArrowRightIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </Section>
  );
}
