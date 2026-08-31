import { brands, solutionsOverview as copy } from "@/lib/site-config";
import { ArrowRightIcon, CheckIcon } from "./icons";
import { Button, Eyebrow, Section, SectionBody, SectionTitle } from "./ui";

export default function SolutionsOverview() {
  return (
    <Section id="solutions">
      <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div>
          <Eyebrow>{copy.eyebrow}</Eyebrow>
          <SectionTitle>{copy.title}</SectionTitle>
          <SectionBody className="mt-5">{copy.body}</SectionBody>

          <ul className="mt-8 space-y-3.5">
            {copy.points.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="mt-0.5 grid h-5 w-5 flex-none place-items-center rounded-full bg-brand-100 text-brand-700">
                  <CheckIcon className="h-3.5 w-3.5" />
                </span>
                <span className="text-[15px] leading-relaxed text-brand-900">
                  {point}
                </span>
              </li>
            ))}
          </ul>

          <Button href="/products" variant="secondary" className="mt-9">
            See the full product range
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Brand tiles double as a visual anchor for this section.
            Flex-wrap rather than grid so a partial final row centres itself
            instead of leaving an orphan tile hanging on the left. */}
        <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="grid aspect-[3/2] basis-[calc(50%-0.375rem)] place-items-center rounded-xl border border-hairline bg-white p-3 text-center shadow-card transition-shadow hover:shadow-card-hover sm:basis-[calc(33.333%-0.5rem)] lg:basis-[calc(33.333%-0.667rem)]"
            >
              {/* TODO(ecp): swap for real partner logos in /public/brands/. */}
              <span className="text-sm font-semibold tracking-tight text-brand-900">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
