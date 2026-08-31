import { brands } from "@/lib/site-config";
import { ArrowRightIcon } from "./icons";
import { Button, Eyebrow, Section, SectionBody, SectionTitle } from "./ui";

export default function ProductRange() {
  return (
    <Section id="products">
      <div className="mx-auto max-w-2xl text-center">
        <Eyebrow>Product Range</Eyebrow>
        <SectionTitle>Ten global brands, one purchase order</SectionTitle>
        <SectionBody className="mt-5">
          Every line below is stocked as an authorized channel partner, so you get
          genuine product with full manufacturer warranty.
        </SectionBody>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {brands.map((brand) => (
          <article
            key={brand.name}
            className="flex flex-col rounded-xl border border-hairline bg-white p-6 shadow-card transition-shadow hover:shadow-card-hover"
          >
            <div className="flex items-baseline justify-between gap-3 border-b border-hairline pb-4">
              <h3 className="text-lg font-bold tracking-tight text-brand-900">
                {brand.name}
              </h3>
              <span className="text-xs font-medium text-[color:var(--color-muted)]">
                {brand.lines.length}{" "}
                {brand.lines.length === 1 ? "line" : "lines"}
              </span>
            </div>

            <ul className="mt-4 flex-1 space-y-2.5">
              {brand.lines.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2.5 text-sm leading-snug text-[color:var(--color-muted)]"
                >
                  <span
                    aria-hidden="true"
                    className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-brand-400"
                  />
                  {line}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="mt-11 text-center">
        <Button href="/contact">
          Ask about a specific part number
          <ArrowRightIcon className="h-4 w-4" />
        </Button>
      </div>
    </Section>
  );
}
