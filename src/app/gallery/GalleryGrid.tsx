"use client";

import Image from "next/image";
import type { ComponentType } from "react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { CalendarIcon, CloseIcon, TagIcon, TruckIcon } from "@/components/icons";
import {
  galleryCountLabel,
  galleryGridUi,
  type GalleryCategory,
  type GalleryFilter,
  type GalleryItem,
} from "@/lib/content/gallery";

/* -------------------------------------------------------------------------- */
/* Local icons — not in the shared icons.tsx set, so they live here.           */
/* -------------------------------------------------------------------------- */

type IconProps = { className?: string };

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function LocalSvg({
  className,
  children,
}: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className ?? "h-6 w-6"}
      aria-hidden="true"
      {...strokeProps}
    >
      {children}
    </svg>
  );
}

const BuildingIcon = (p: IconProps) => (
  <LocalSvg {...p}>
    <path d="M4 21V5.5A1.5 1.5 0 015.5 4h7A1.5 1.5 0 0114 5.5V21" />
    <path d="M14 10h4.5A1.5 1.5 0 0120 11.5V21M2.5 21h19" />
    <path d="M7 8h4M7 12h4M7 16h4M17 14h1M17 17.5h1" />
  </LocalSvg>
);

const UsersIcon = (p: IconProps) => (
  <LocalSvg {...p}>
    <circle cx="9" cy="8.5" r="3.2" />
    <path d="M2.8 20a6.2 6.2 0 0112.4 0" />
    <path d="M16.4 5.8a3 3 0 010 5.6M17.8 20a6 6 0 00-2-4.2" />
  </LocalSvg>
);

const CameraIcon = (p: IconProps) => (
  <LocalSvg {...p}>
    <path d="M8.2 6.5l1.3-2h5l1.3 2H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2v-9a2 2 0 012-2z" />
    <circle cx="12" cy="13" r="3.4" />
  </LocalSvg>
);

const ExpandIcon = (p: IconProps) => (
  <LocalSvg {...p}>
    <path d="M9 4H4v5M15 20h5v-5M20 9V4h-5M4 15v5h5" />
  </LocalSvg>
);

const ChevronLeftIcon = (p: IconProps) => (
  <LocalSvg {...p}>
    <path d="M14.5 5.5L8 12l6.5 6.5" />
  </LocalSvg>
);

const ChevronRightIcon = (p: IconProps) => (
  <LocalSvg {...p}>
    <path d="M9.5 5.5L16 12l-6.5 6.5" />
  </LocalSvg>
);

/** One icon per category, used as the face of every placeholder tile. */
const categoryIcon: Record<GalleryCategory, ComponentType<IconProps>> = {
  Offices: BuildingIcon,
  "Warehouse & Stock": TruckIcon,
  Team: UsersIcon,
  Products: TagIcon,
  Events: CalendarIcon,
};

/* Selectors used to keep Tab inside the open lightbox. */
const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/* -------------------------------------------------------------------------- */
/* Tile visual                                                                 */
/* -------------------------------------------------------------------------- */

/**
 * The picture area of a tile. Renders a real next/image once `item.src` is set;
 * until then it renders a clearly-labelled CSS placeholder so the grid still
 * reads as deliberate rather than broken.
 *
 * `ratio` is a closed union rather than a free string so a class Tailwind has
 * never generated cannot be passed in.
 */
function TileVisual({
  item,
  ratio,
  large = false,
}: {
  item: GalleryItem;
  ratio: "aspect-[4/3]" | "aspect-[16/10]";
  large?: boolean;
}) {
  const Icon = categoryIcon[item.category];

  // Everything here is a <span> rather than a <div>: tiles render inside a
  // <button>, whose content model only allows phrasing content.
  if (item.src) {
    return (
      <span className={`relative block ${ratio} overflow-hidden bg-brand-50`}>
        <Image
          src={item.src}
          // In the grid the caption is rendered right next to the image inside
          // the same button, so alt text here would double the button's
          // accessible name. In the lightbox the image is the content.
          alt={large ? item.caption : ""}
          fill
          sizes={
            large
              ? "(min-width: 768px) 768px, 100vw"
              : "(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          }
          className="object-cover"
        />
      </span>
    );
  }

  return (
    <span
      className={`relative block ${ratio} overflow-hidden bg-[linear-gradient(140deg,var(--color-brand-50)_0%,var(--color-brand-100)_100%)]`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:28px_28px]"
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_35%,rgba(255,255,255,0.75),transparent_70%)]"
      />
      <span className="relative flex h-full flex-col items-center justify-center gap-3 px-6 text-center">
        <span
          className={`flex items-center justify-center rounded-full border border-hairline bg-white text-brand-600 shadow-card ${
            large ? "h-16 w-16" : "h-12 w-12"
          }`}
        >
          <Icon className={large ? "h-8 w-8" : "h-6 w-6"} />
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-700">
          {galleryGridUi.placeholderBadge}
        </span>
        {large && (
          <span className="max-w-sm text-sm leading-relaxed text-[color:var(--color-muted)]">
            {item.caption}
          </span>
        )}
      </span>
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Grid + filter + lightbox                                                    */
/* -------------------------------------------------------------------------- */

export default function GalleryGrid({
  items,
  categories,
}: {
  items: readonly GalleryItem[];
  categories: readonly GalleryCategory[];
}) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilter>("All");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  /** The tile that opened the lightbox, so focus can be handed back on close. */
  const triggerRef = useRef<HTMLElement | null>(null);

  const titleId = useId();
  const descriptionId = useId();

  const visible = useMemo(
    () =>
      activeFilter === "All"
        ? items
        : items.filter((item) => item.category === activeFilter),
    [items, activeFilter],
  );

  const counts = useMemo(() => {
    const map = new Map<GalleryFilter, number>([["All", items.length]]);
    for (const category of categories) {
      map.set(
        category,
        items.filter((item) => item.category === category).length,
      );
    }
    return map;
  }, [items, categories]);

  // Derived from `visible` so an out-of-range index can never leave the page
  // scroll-locked with nothing rendered.
  const activeItem = openIndex === null ? null : (visible[openIndex] ?? null);
  const isOpen = activeItem !== null;

  const close = useCallback(() => setOpenIndex(null), []);

  const step = useCallback(
    (delta: number) => {
      setOpenIndex((current) => {
        if (current === null || visible.length === 0) return current;
        return (current + delta + visible.length) % visible.length;
      });
    },
    [visible.length],
  );

  const changeFilter = (filter: GalleryFilter) => {
    setOpenIndex(null); // indices are relative to the filtered list
    setActiveFilter(filter);
  };

  // Move focus into the dialog on open; hand it back to the triggering tile on
  // close. Runs after the DOM has committed, so the tile is focusable again.
  useEffect(() => {
    if (isOpen) {
      dialogRef.current?.focus();
      return;
    }
    const trigger = triggerRef.current;
    triggerRef.current = null;
    trigger?.focus();
  }, [isOpen]);

  // Lock body scroll while the lightbox is open; the cleanup also covers
  // unmounting mid-open.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Escape closes, left/right arrows move between items, Tab cycles inside the
  // dialog (aria-modal alone does not stop Tab reaching the page behind).
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
        return;
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
        return;
      }
      if (event.key !== "Tab") return;

      const root = dialogRef.current;
      if (!root) return;
      // The dialog itself carries tabindex="-1", so the selector excludes it.
      const focusable = Array.from(
        root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        // Nothing tabbable inside: keep focus on the dialog itself.
        event.preventDefault();
        root.focus();
        return;
      }

      const active = document.activeElement;
      const inside = active instanceof Node && root.contains(active);
      if (event.shiftKey) {
        if (!inside || active === first || active === root) {
          event.preventDefault();
          last.focus();
        }
      } else if (!inside || active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, close, step]);

  const filters: readonly GalleryFilter[] = ["All", ...categories];

  return (
    <div className="mt-12">
      {/* Filter row */}
      <div className="flex flex-col gap-4 border-b border-hairline pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div
          role="group"
          aria-label={galleryGridUi.filterGroupLabel}
          className="-mx-1 flex flex-wrap gap-2 px-1"
        >
          {filters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                aria-pressed={isActive}
                onClick={() => changeFilter(filter)}
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-sm font-semibold transition-colors duration-200 ${
                  isActive
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-hairline bg-white text-brand-900 hover:border-brand-300 hover:bg-brand-50"
                }`}
              >
                {filter}
                <span
                  className={
                    isActive
                      ? "text-xs font-medium text-brand-100"
                      : "text-xs font-medium text-[color:var(--color-muted)]"
                  }
                >
                  {counts.get(filter) ?? 0}
                </span>
              </button>
            );
          })}
        </div>

        <p
          aria-live="polite"
          className="text-sm text-[color:var(--color-muted)] sm:text-right"
        >
          {galleryCountLabel(visible.length, items.length, activeFilter)}
        </p>
      </div>

      {/* Tiles */}
      {visible.length === 0 ? (
        <div className="mt-10 rounded-xl border border-dashed border-hairline bg-brand-50 px-6 py-14 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-hairline bg-white text-brand-600">
            <CameraIcon className="h-6 w-6" />
          </span>
          <h3 className="mt-4 text-base font-bold tracking-tight text-brand-900">
            {galleryGridUi.empty.title}
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-[color:var(--color-muted)]">
            {galleryGridUi.empty.body}
          </p>
          <button
            type="button"
            onClick={() => changeFilter("All")}
            className="mt-5 inline-flex items-center justify-center rounded-lg border border-hairline bg-white px-4 py-2.5 text-sm font-semibold text-brand-900 transition-colors duration-200 hover:border-brand-300 hover:bg-brand-50"
          >
            {galleryGridUi.empty.resetLabel}
          </button>
        </div>
      ) : (
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {visible.map((item, index) => (
            <li key={item.id}>
              {/* A native button gives Enter/Space activation for free. */}
              <button
                type="button"
                aria-haspopup="dialog"
                onClick={(event) => {
                  triggerRef.current = event.currentTarget;
                  setOpenIndex(index);
                }}
                className="group flex h-full w-full flex-col overflow-hidden rounded-xl border border-hairline bg-white text-left shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card-hover"
              >
                <TileVisual item={item} ratio="aspect-[4/3]" />
                <span className="flex flex-1 flex-col p-5">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
                    {item.category}
                  </span>
                  <span className="mt-2 flex-1 text-sm font-bold leading-snug tracking-tight text-brand-900">
                    {item.caption}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[color:var(--color-muted)] transition-colors duration-200 group-hover:text-brand-600">
                    <ExpandIcon className="h-3.5 w-3.5" />
                    {galleryGridUi.viewLargerLabel}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Lightbox */}
      {activeItem && openIndex !== null && (
        // Clicking the backdrop closes; Escape is the keyboard equivalent and is
        // handled by the document listener above. z-[60] clears the sticky site
        // header, which sits at z-50.
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-brand-950/80 p-4 backdrop-blur-sm sm:p-6"
          onClick={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descriptionId}
            tabIndex={-1}
            className="relative max-h-full w-full max-w-3xl overflow-y-auto rounded-2xl border border-hairline bg-white shadow-card-hover"
          >
            <div className="flex items-start justify-between gap-4 border-b border-hairline p-5 sm:p-6">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-600">
                  {activeItem.category}
                </p>
                <h2
                  id={titleId}
                  className="mt-1.5 text-lg font-bold leading-snug tracking-tight text-brand-900"
                >
                  {activeItem.caption}
                </h2>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={galleryGridUi.lightbox.closeLabel}
                className="flex h-10 w-10 flex-none items-center justify-center rounded-lg border border-hairline bg-white text-brand-900 transition-colors duration-200 hover:border-brand-300 hover:bg-brand-50"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <TileVisual item={activeItem} ratio="aspect-[16/10]" large />

            <div className="flex flex-col gap-4 border-t border-hairline p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <p
                id={descriptionId}
                className="text-sm leading-relaxed text-[color:var(--color-muted)]"
              >
                {activeItem.src
                  ? activeItem.caption
                  : galleryGridUi.lightbox.placeholderBody}
              </p>

              <div className="flex flex-none items-center gap-2 sm:justify-end">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  disabled={visible.length < 2}
                  aria-label={galleryGridUi.lightbox.previousLabel}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-white text-brand-900 transition-colors duration-200 hover:border-brand-300 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-hairline disabled:hover:bg-white"
                >
                  <ChevronLeftIcon className="h-5 w-5" />
                </button>
                <span className="min-w-[4.5rem] text-center text-xs font-semibold tabular-nums text-[color:var(--color-muted)]">
                  {openIndex + 1} / {visible.length}
                </span>
                <button
                  type="button"
                  onClick={() => step(1)}
                  disabled={visible.length < 2}
                  aria-label={galleryGridUi.lightbox.nextLabel}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-hairline bg-white text-brand-900 transition-colors duration-200 hover:border-brand-300 hover:bg-brand-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-hairline disabled:hover:bg-white"
                >
                  <ChevronRightIcon className="h-5 w-5" />
                </button>
              </div>
            </div>

            <p className="sr-only">{galleryGridUi.lightbox.keyboardHint}</p>
          </div>
        </div>
      )}
    </div>
  );
}
