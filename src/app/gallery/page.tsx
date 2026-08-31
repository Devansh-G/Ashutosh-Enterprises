import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from "@/components/icons";
import {
  Button,
  Card,
  Eyebrow,
  Section,
  SectionBody,
  SectionTitle,
} from "@/components/ui";
import {
  galleryCategories,
  galleryCategoryNotes,
  galleryComingSoon,
  galleryCta,
  galleryHero,
  galleryIntro,
  galleryItems,
  galleryMeta,
} from "@/lib/content/gallery";
import { company, whatsappHref } from "@/lib/site-config";
import GalleryGrid from "./GalleryGrid";

export const metadata: Metadata = {
  title: galleryMeta.title,
  description: galleryMeta.description,
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        title={galleryHero.title}
        subtitle={galleryHero.subtitle}
        breadcrumb={galleryHero.breadcrumb}
      />

      {/* Filterable grid --------------------------------------------------- */}
      <Section>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{galleryIntro.eyebrow}</Eyebrow>
          <SectionTitle>{galleryIntro.title}</SectionTitle>
          <SectionBody className="mt-5">{galleryIntro.body}</SectionBody>
          <p className="mx-auto mt-5 max-w-xl rounded-lg border border-hairline bg-brand-50 px-4 py-3 text-sm leading-relaxed text-[color:var(--color-muted)]">
            {galleryIntro.placeholderNote}
          </p>
        </div>

        <GalleryGrid items={galleryItems} categories={galleryCategories} />
      </Section>

      {/* What each category will hold -------------------------------------- */}
      <Section className="bg-brand-50">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>{galleryComingSoon.eyebrow}</Eyebrow>
          <SectionTitle>{galleryComingSoon.title}</SectionTitle>
          <SectionBody className="mt-5">{galleryComingSoon.body}</SectionBody>
        </div>

        <ul className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {galleryCategories.map((category) => {
            // Derived from the item list so the count can never drift from it.
            const count = galleryItems.filter(
              (item) => item.category === category,
            ).length;

            return (
              <li key={category}>
                <Card className="flex h-full flex-col">
                  <div className="flex items-baseline justify-between gap-3 border-b border-hairline pb-4">
                    <h3 className="text-base font-bold tracking-tight text-brand-900">
                      {category}
                    </h3>
                    <span className="flex-none text-xs font-medium text-[color:var(--color-muted)]">
                      {count} {galleryComingSoon.countSuffix}
                    </span>
                  </div>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-[color:var(--color-muted)]">
                    {galleryCategoryNotes[category]}
                  </p>
                </Card>
              </li>
            );
          })}
        </ul>
      </Section>

      {/* Closing CTA -------------------------------------------------------- */}
      {/* Mirrors <CtaSection> from the homepage; that component reads its copy
          straight from site-config, so it cannot carry this page's wording. */}
      <section className="relative overflow-hidden bg-brand-900 text-white">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_85%_0%,rgba(47,128,237,0.30),transparent_65%)]"
        />

        <div className="container-page relative py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {galleryCta.title}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-100">
                {galleryCta.body}
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                href={galleryCta.quote.href}
                variant="inverse"
                size="lg"
              className="w-full"
              >
                {galleryCta.quote.label}
                <ArrowRightIcon className="h-4 w-4" />
              </Button>
              <Button
                href={company.phoneHref}
                variant="ghost"
                size="lg"
              className="w-full"
              >
                <PhoneIcon className="h-4 w-4" />
                {galleryCta.callLabel}
              </Button>
              <Button
                href={whatsappHref}
                variant="ghost"
                size="lg"
              className="w-full"
              >
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                {galleryCta.whatsappLabel}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
