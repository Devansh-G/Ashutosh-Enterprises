import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { ArrowRightIcon, MailIcon, WhatsAppIcon } from "@/components/icons";
import { Button, Eyebrow, Section, SectionBody, SectionTitle } from "@/components/ui";
import {
  productBrands,
  productsPage,
  totalProductCategories,
} from "@/lib/content/products";
import { certifications, company, whatsappHref } from "@/lib/site-config";

export const metadata: Metadata = {
  title: productsPage.meta.title,
  description: productsPage.meta.description,
};

/**
 * Not in components/icons.tsx, and this page is its only consumer, so it lives
 * here rather than in the shared (agent-shared) icon module.
 */
function ArrowDownIcon({ className }: { className?: string }) {
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
      <path d="M12 5v14M6 13l6 6 6-6" />
    </svg>
  );
}

const BRANDS_SECTION_ID = "brand-partners";
const CATEGORIES_SECTION_ID = "product-categories";

/** Anchor id for a brand's block in the full-catalogue section. */
const brandAnchorId = (slug: string) => `brand-${slug}`;

/** mailto: with a pre-filled subject so enquiries arrive already triaged. */
function priceMailto(subject: string) {
  return `mailto:${company.email}?subject=${encodeURIComponent(subject)}`;
}

/**
 * `count: number` (not the literal type of `categories.length`) is deliberate:
 * `as const` narrows the length to a literal union, and comparing that union
 * against 1 fails typecheck with TS2367 when no brand happens to have 1 entry.
 */
function categoryCountLabel(count: number) {
  const { one, many } = productsPage.categoryCount;
  return `${count} ${count === 1 ? one : many}`;
}

export default function ProductsPage() {
  const { hero, brandsSection, categoriesSection, closingCta } = productsPage;

  return (
    <>
      <PageHero
        title={hero.title}
        subtitle={hero.subtitle}
        breadcrumb={hero.breadcrumb}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <Button href={whatsappHref} variant="inverse">
            <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
            {hero.priceListCta}
          </Button>
          <Button href={priceMailto(hero.emailSubject)} variant="ghost">
            <MailIcon className="h-4 w-4" />
            {hero.emailCta}
          </Button>
        </div>
      </PageHero>

      {/* ---------------------------------------------------------------- */}
      {/* Brand partner cards                                              */}
      {/* ---------------------------------------------------------------- */}
      <Section id={BRANDS_SECTION_ID}>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{brandsSection.eyebrow}</Eyebrow>
          <SectionTitle>{brandsSection.title}</SectionTitle>
          <SectionBody className="mt-5">{brandsSection.body}</SectionBody>
        </div>

        <dl className="mt-12 grid gap-6 rounded-xl border border-hairline bg-brand-50 p-6 sm:grid-cols-3 sm:p-8">
          {[
            {
              value: `${productBrands.length}`,
              label: brandsSection.statLabels.brands,
            },
            {
              value: `${totalProductCategories}`,
              label: brandsSection.statLabels.categories,
            },
            {
              value: brandsSection.authorizedValue,
              label: brandsSection.statLabels.authorized,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col-reverse text-center sm:text-left"
            >
              <dt className="mt-1 text-sm text-[color:var(--color-muted)]">
                {stat.label}
              </dt>
              <dd className="text-3xl font-bold tracking-tight text-brand-900">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {productBrands.map((brand) => (
            <a
              key={brand.slug}
              href={`#${brandAnchorId(brand.slug)}`}
              className="group flex flex-col rounded-xl border border-hairline bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover"
            >
              <h3 className="text-lg font-bold tracking-tight text-brand-900">
                {brand.name}
              </h3>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.10em] text-brand-600">
                {brand.scope}
              </p>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-[color:var(--color-muted)]">
                {brand.description}
              </p>

              <div className="mt-5 flex items-center justify-between gap-3 border-t border-hairline pt-4">
                <span className="text-sm font-semibold text-brand-900">
                  {categoryCountLabel(brand.categories.length)}
                </span>
                <span className="inline-flex flex-none items-center gap-1.5 text-sm font-semibold text-brand-600">
                  {brandsSection.jumpLabel}
                  <ArrowDownIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-[color:var(--color-muted)]">
            {brandsSection.complianceLabel}
          </span>
          <ul className="flex flex-wrap justify-center gap-2">
            {certifications.map((cert) => (
              <li
                key={cert}
                className="rounded border border-hairline bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700"
              >
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Complete category lists, brand by brand                          */}
      {/* ---------------------------------------------------------------- */}
      <Section id={CATEGORIES_SECTION_ID} className="bg-brand-50">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{categoriesSection.eyebrow}</Eyebrow>
          <SectionTitle>{categoriesSection.title}</SectionTitle>
          <SectionBody className="mt-5">{categoriesSection.body}</SectionBody>
        </div>

        <nav aria-label={categoriesSection.jumpNavLabel} className="mt-10">
          <ul className="flex flex-wrap justify-center gap-2">
            {productBrands.map((brand) => (
              <li key={brand.slug}>
                <a
                  href={`#${brandAnchorId(brand.slug)}`}
                  className="inline-flex items-center rounded-full border border-hairline bg-white px-4 py-2 text-sm font-medium text-brand-900 transition-colors duration-200 hover:border-brand-300 hover:text-brand-700"
                >
                  {brand.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-10 space-y-5 lg:mt-12 lg:space-y-6">
          {productBrands.map((brand) => (
            <article
              key={brand.slug}
              id={brandAnchorId(brand.slug)}
              className="rounded-xl border border-hairline bg-white p-6 shadow-card sm:p-8"
            >
              <div className="flex flex-col gap-3 border-b border-hairline pb-5 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex items-start gap-3.5">
                  <span
                    aria-hidden="true"
                    className="mt-1 h-9 w-1 flex-none rounded-full bg-volt-500"
                  />
                  <div>
                    <h3 className="text-xl font-bold tracking-tight text-brand-900 sm:text-2xl">
                      {brand.name}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium text-[color:var(--color-muted)]">
                      {brand.scope}
                    </p>
                  </div>
                </div>
                <span className="inline-flex flex-none items-center self-start rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 sm:self-auto">
                  {categoryCountLabel(brand.categories.length)}
                </span>
              </div>

              <ul className="mt-6 grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {brand.categories.map((category) => (
                  <li
                    key={category}
                    className="flex items-start gap-2.5 text-sm leading-snug text-[color:var(--color-muted)]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 flex-none rounded-full bg-brand-400"
                    />
                    {category}
                  </li>
                ))}
              </ul>

              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-hairline pt-5">
                <a
                  href={priceMailto(
                    `${categoriesSection.enquirePrefix} ${brand.name} ${categoriesSection.enquireSuffix}`,
                  )}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-brand-600 hover:text-brand-700"
                >
                  <MailIcon className="h-4 w-4" />
                  {categoriesSection.enquirePrefix} {brand.name}{" "}
                  {categoriesSection.enquireSuffix}
                </a>
                <a
                  href={`#${BRANDS_SECTION_ID}`}
                  className="text-sm font-medium text-[color:var(--color-muted)] hover:text-brand-700"
                >
                  {categoriesSection.backToBrands}
                </a>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Closing CTA                                                      */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_85%_0%,rgba(47,128,237,0.30),transparent_65%)]"
        />

        <div className="container-page relative py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {closingCta.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-100">
                {closingCta.body}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                href={closingCta.primary.href}
                variant="inverse"
                className="w-full py-3.5"
              >
                {closingCta.primary.label}
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button
                href={whatsappHref}
                variant="ghost"
                className="w-full py-3.5"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                {closingCta.whatsappLabel}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
