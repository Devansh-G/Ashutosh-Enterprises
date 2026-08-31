# ECP Website

Marketing site for an electrical control panel / industrial electrical supply
business, built with Next.js (App Router), TypeScript and Tailwind CSS v4.

Structure and section flow are modelled on https://www.debak.co/.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

Other scripts: `npm run build` (static production build), `npm start`
(serve the build), `npm run lint`.

## Editing content

**All copy and contact details live in one file: `src/lib/site-config.ts`.**
Change it there and every section updates — components contain no hard-coded
business text. Search that file for `TODO(ecp)` to find the placeholders that
still need real values:

| Placeholder | What to replace it with |
| --- | --- |
| `company.name` | Registered business name |
| `company.foundedYear` | Real founding year (drives the "30 Years" headline and the `30+ Years of Experience` pillar automatically) |
| `company.phone` / `phoneHref` / `whatsapp` | Real phone number (`whatsapp` is digits only, with country code) |
| `company.email` | Real sales email |
| `company.address` | Real address |
| `company.gst` | Real GSTIN |

The client counts (`5,000+`) and the brand/product lists in `brands` are taken
from the reference site — confirm they match your actual business before going
live.

## Pages

| Route | Content module | Notes |
| --- | --- | --- |
| `/` | `site-config.ts` | Homepage, 7 sections |
| `/about` | `lib/content/about.ts` | Story timeline, mission/vision, values, stats, offices |
| `/products` | `lib/content/products.ts` | 10 brands, 46 categories (counts derived from the arrays) |
| `/contact` | `lib/content/contact.ts` | Validated enquiry form, offices, hours, sales territories |
| `/careers` | `lib/content/careers.ts` | Benefits, 4 roles as `<details>`, mailto applications |
| `/gallery` | `lib/content/gallery.ts` | Filterable grid + lightbox, placeholder tiles |

`Header` and `Footer` are rendered once by `src/app/layout.tsx`, so a page
component renders only its own sections — never the shell or a `<main>` wrapper.

## Homepage sections

In render order (`src/app/page.tsx`):

1. `Header` — utility strip, sticky nav, WhatsApp + quote CTAs, mobile drawer
2. `Hero` — headline, stat band, certification chips
3. `SolutionsOverview` — what we do + brand tiles
4. `Differentiators` — prompt delivery / competitive pricing
5. `ProductRange` — all 10 brands with their product lines
6. `Industries` — six customer segments
7. `WhyChooseUs` — six value pillars
8. `CtaSection` — quote / phone / WhatsApp (also the `#contact` anchor)
9. `Footer` — address, quick links, brands, certifications

## Before this goes live

Two things will mislead a visitor if shipped as-is:

1. **The contact form delivers mail nowhere.** `src/app/contact/actions.ts`
   validates the payload, `console.info`s it and returns `{ ok: true }`, so the
   visitor sees "your message has been received" while the enquiry is lost.
   Wire it to an email service (Resend/SES/Postmark/SMTP) or a hosted form
   provider, then add spam protection and rate limiting. The interim log line
   contains personal data and needs removing.
2. **Every business fact is a placeholder**, and some were modelled on the
   reference company rather than invented. Search for `TODO(ecp)` — the
   highest-value ones are the office addresses (`offices` in
   `site-config.ts`), the `/about` story timeline (whose milestones follow the
   reference company's real history), the `5,000+` client and `50+` staff
   figures, the per-brand product category lists on `/products`, and the
   `careers@` inbox.

## Notes for the next pass

- Brand tiles currently render the brand **name as text**. Drop real logo
  files into `public/brands/` and swap the `<span>` in
  `src/components/SolutionsOverview.tsx` for `next/image`.
- `/gallery` ships 12 CSS placeholder tiles with `src: null`. Drop real
  landscape images into `public/gallery/` and set `src` on the item — the tile
  switches to a `next/image` render with no component change.
- Icons are inline SVGs in `src/components/icons.tsx` — no icon dependency.

## Two conventions worth knowing

**Sizing on `<Button>` is a prop, not a class.** Use `size="lg"`, never
`className="text-base"`. Tailwind resolves same-property collisions by
stylesheet order, and `.text-sm` is emitted after `.text-base`, so a
`text-base` override on a button is silently dead. Same reason `variant="inverse"`
exists instead of `className="bg-white text-brand-900"`. Three separate bugs in
this repo came from overriding a component's own utilities from outside.

**Amber on light backgrounds must be `volt-700`.** `volt-600` on white is
3.19:1, under the WCAG AA 4.5:1 floor; `volt-700` is 5.02:1. Keep
`volt-400`/`volt-500` for icons and dark-background accents only.

## Registry

`.npmrc` pins this project to the public npm registry so it does not inherit
a corporate Artifactory mirror from `~/.npmrc`.

## Known advisories

`npm audit` reports PostCSS advisories reachable only through Next's build
pipeline. They apply to build-time CSS processing, not to runtime user input,
and `npm audit fix --force` would downgrade Next — left as-is deliberately.
