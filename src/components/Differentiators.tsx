import { differentiators as copy } from "@/lib/site-config";
import { TagIcon, TruckIcon } from "./icons";
import { Eyebrow, Section, SectionBody, SectionTitle } from "./ui";

const cardIcons = [TruckIcon, TagIcon];

export default function Differentiators() {
  return (
    <Section className="bg-brand-50">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>{copy.eyebrow}</Eyebrow>
        <SectionTitle>{copy.title}</SectionTitle>
        <SectionBody className="mt-5">{copy.body}</SectionBody>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:gap-6">
        {copy.cards.map((card, i) => {
          const Icon = cardIcons[i] ?? TruckIcon;
          return (
            <div
              key={card.title}
              className="rounded-2xl border border-hairline bg-white p-7 shadow-card sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-brand-900 text-white">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-lg font-bold tracking-tight text-brand-900">
                    {card.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-volt-700">
                    {card.metric}
                  </p>
                </div>
              </div>
              <p className="mt-5 text-[15px] leading-relaxed text-[color:var(--color-muted)]">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
