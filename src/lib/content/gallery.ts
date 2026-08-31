/**
 * Copy and data for the /gallery page.
 *
 * Components in this repo carry no hard-coded business copy — everything the
 * Gallery page renders lives here, including the button/aria labels used by the
 * client-side <GalleryGrid>. Company, brand and certification details are NOT
 * restated: they are imported from "@/lib/site-config".
 *
 * TODO(ecp): the twelve item captions and the five category notes below are
 * invented descriptions of scenes we expect to photograph — no shoot has
 * happened and none of them describe a real image yet. Reconcile every caption
 * and note with the shots actually taken before this page is treated as final.
 */
import { company } from "@/lib/site-config";

/* -------------------------------------------------------------------------- */
/* Metadata                                                                    */
/* -------------------------------------------------------------------------- */

export const galleryMeta = {
  // Bare page name: the root layout applies the "%s | ECP Electricals" template.
  title: "Gallery",
  description: `A look inside ${company.name} — our offices, warehouse and stock, the team, our product range and the industry events we take part in.`,
} as const;

/* -------------------------------------------------------------------------- */
/* Hero                                                                       */
/* -------------------------------------------------------------------------- */

export const galleryHero = {
  title: `${company.name} Gallery`,
  breadcrumb: "Gallery",
  subtitle: "A glimpse into our team, offices, and work across India.",
} as const;

/* -------------------------------------------------------------------------- */
/* Section intro                                                              */
/* -------------------------------------------------------------------------- */

export const galleryIntro = {
  eyebrow: "Photo Gallery",
  title: "Inside the business, category by category",
  body: "Our offices and stock rooms, the people who quote and despatch your order, the range sitting on our shelves, and the industry events we show up at.",
  // Be honest with visitors: nothing below is a photograph yet. Deliberately
  // does not promise a booked shoot or a date, because neither is confirmed.
  // TODO(ecp): delete this note once real photographs replace the tiles.
  placeholderNote:
    "Note: every tile below is a labelled placeholder, not a photograph. Real images of our offices, warehouse, team and product range will replace them as photography becomes available.",
} as const;

/* -------------------------------------------------------------------------- */
/* Categories                                                                 */
/* -------------------------------------------------------------------------- */

export const galleryCategories = [
  "Offices",
  "Warehouse & Stock",
  "Team",
  "Products",
  "Events",
] as const;

export type GalleryCategory = (typeof galleryCategories)[number];

/** The filter row adds an "All" pseudo-category in front of the real ones. */
export type GalleryFilter = "All" | GalleryCategory;

/** One-line description of what each category will eventually hold. */
export const galleryCategoryNotes: Record<GalleryCategory, string> = {
  Offices: "Reception, the quoting desk and the meeting rooms customers walk into.",
  "Warehouse & Stock":
    "Racked switchgear, cable drums and the despatch bay your order leaves from.",
  Team: "The people behind the quotes, the technical advice and the deliveries.",
  Products: "Physical range shots of the lines we stock as an authorized partner.",
  Events: "Exhibition stands, brand training days and customer site visits.",
};

/* -------------------------------------------------------------------------- */
/* Items                                                                      */
/* -------------------------------------------------------------------------- */

export type GalleryItem = {
  /** Stable slug — also the expected filename stem under public/gallery/. */
  readonly id: string;
  readonly category: GalleryCategory;
  /** Doubles as the tile label and the lightbox title. */
  readonly caption: string;
  /**
   * Public path to the real photograph, or null while none exists.
   *
   * TODO(ecp): there are no photographs on disk yet (public/ is empty), so every
   * item ships with `src: null` and renders as a styled CSS placeholder tile. To
   * switch a tile over to a real next/image render, drop the file into
   * `public/gallery/` (e.g. public/gallery/offices-reception.jpg, landscape,
   * ~1600x1200, under ~400 KB) and set `src: "/gallery/offices-reception.jpg"`
   * below. No component changes are needed — GalleryGrid branches on this field.
   */
  readonly src: string | null;
};

export const galleryItems: readonly GalleryItem[] = [
  {
    id: "offices-reception",
    category: "Offices",
    caption: "Front office and customer reception desk",
    src: null, // TODO(ecp): set to "/gallery/offices-reception.jpg" once shot
  },
  {
    id: "offices-meeting-room",
    category: "Offices",
    caption: "Meeting room where BOMs and drawings get reviewed",
    src: null, // TODO(ecp): set to "/gallery/offices-meeting-room.jpg" once shot
  },
  {
    id: "warehouse-switchgear-racking",
    category: "Warehouse & Stock",
    caption: "Racked switchgear inventory in the main store",
    src: null, // TODO(ecp): set to "/gallery/warehouse-switchgear-racking.jpg" once shot
  },
  {
    id: "warehouse-cable-drums",
    category: "Warehouse & Stock",
    caption: "Cable drums staged for cutting to length",
    src: null, // TODO(ecp): set to "/gallery/warehouse-cable-drums.jpg" once shot
  },
  {
    id: "warehouse-despatch-bay",
    category: "Warehouse & Stock",
    caption: "Order picking and despatch staging bay",
    src: null, // TODO(ecp): set to "/gallery/warehouse-despatch-bay.jpg" once shot
  },
  {
    id: "team-group-photo",
    category: "Team",
    caption: "The team outside the head office",
    src: null, // TODO(ecp): set to "/gallery/team-group-photo.jpg" once shot
  },
  {
    id: "team-technical-desk",
    category: "Team",
    caption: "Technical desk helping a panel builder size a breaker",
    src: null, // TODO(ecp): set to "/gallery/team-technical-desk.jpg" once shot
  },
  {
    id: "team-despatch-crew",
    category: "Team",
    caption: "Despatch crew loading a pan-India consignment",
    src: null, // TODO(ecp): set to "/gallery/team-despatch-crew.jpg" once shot
  },
  {
    id: "products-switchgear-wall",
    category: "Products",
    caption: "ACB, MCCB and MCB range on the display wall",
    src: null, // TODO(ecp): set to "/gallery/products-switchgear-wall.jpg" once shot
  },
  {
    id: "products-din-rail-components",
    category: "Products",
    caption: "Terminal blocks, contactors and DIN-rail components",
    src: null, // TODO(ecp): set to "/gallery/products-din-rail-components.jpg" once shot
  },
  {
    id: "events-exhibition-stand",
    category: "Events",
    caption: "Our stand at an industrial electrical exhibition",
    src: null, // TODO(ecp): set to "/gallery/events-exhibition-stand.jpg" once shot
  },
  {
    id: "events-brand-training",
    category: "Events",
    caption: "Brand product training session for the sales team",
    src: null, // TODO(ecp): set to "/gallery/events-brand-training.jpg" once shot
  },
];

/* -------------------------------------------------------------------------- */
/* Grid, filter and lightbox labels (used by GalleryGrid)                     */
/* -------------------------------------------------------------------------- */

export const galleryGridUi = {
  filterGroupLabel: "Filter gallery by category",
  allFilterLabel: "All",
  placeholderBadge: "Placeholder · photo coming soon",
  viewLargerLabel: "View larger",
  empty: {
    title: "Nothing in this category yet",
    body: "Nothing has been added under this category so far. Try another one, or see everything lined up across the gallery.",
    resetLabel: "Show all categories",
  },
  lightbox: {
    closeLabel: "Close image viewer",
    previousLabel: "Previous item",
    nextLabel: "Next item",
    keyboardHint:
      "Use the left and right arrow keys to move between items, or press Escape to close.",
    // TODO(ecp): delete once real photographs replace the placeholder tiles.
    placeholderBody:
      "This tile is a labelled placeholder, not a photograph. A real image will replace it as photography becomes available.",
  },
} as const;

/**
 * Live count under the filter row. Says "tiles" rather than "placeholder tiles"
 * so the wording stays true once some items carry a real `src`.
 */
export function galleryCountLabel(
  shown: number,
  total: number,
  filter: GalleryFilter,
): string {
  const scope = filter === "All" ? "" : ` in ${filter}`;
  return `Showing ${shown} of ${total} tiles${scope}`;
}

/* -------------------------------------------------------------------------- */
/* Coming Soon section                                                        */
/* -------------------------------------------------------------------------- */

export const galleryComingSoon = {
  eyebrow: "Coming Soon",
  title: "What you will find in each set",
  body: `All ${galleryCategories.length} categories are already mapped out, so you know exactly what the finished gallery will cover.`,
  /** Rendered after the per-category count, e.g. "3 planned". */
  countSuffix: "planned",
} as const;

/* -------------------------------------------------------------------------- */
/* Closing CTA                                                               */
/* -------------------------------------------------------------------------- */

export const galleryCta = {
  title: "Looking for Industrial Electrical Products?",
  body: "Send us your BOM, drawing or part number and we will come back with pricing and stock availability — usually the same working day.",
  quote: { label: "Request a Quote", href: "/contact" },
  callLabel: "Call Us Now",
  whatsappLabel: "WhatsApp",
} as const;
