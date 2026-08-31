"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { company, navLinks, whatsappHref } from "@/lib/site-config";
import { CloseIcon, MenuIcon, PhoneIcon, WhatsAppIcon } from "./icons";
import { Button } from "./ui";

/** Wordmark used in the header and footer. */
export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label={`${company.name} home`}>
      <span
        className={`grid h-9 w-9 place-items-center rounded-md text-sm font-bold tracking-tight ${
          inverted ? "bg-white text-brand-900" : "bg-brand-900 text-white"
        }`}
      >
        {company.shortName}
      </span>
      <span className="min-w-0 leading-tight">
        <span
          className={`block truncate text-base font-bold tracking-tight ${
            inverted ? "text-white" : "text-brand-900"
          }`}
        >
          {company.name}
        </span>
        {/* In the cramped header the tagline is dropped on small screens rather
            than allowed to wrap and overflow; the footer has room for it always. */}
        <span
          className={`text-[11px] font-medium ${
            inverted
              ? "block text-brand-200"
              : "hidden text-[color:var(--color-muted)] md:block"
          }`}
        >
          {company.tagline}
        </span>
      </span>
    </Link>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the drawer on Escape.
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      {/* Utility strip: contact details, hidden on small screens to save height. */}
      <div className="hidden bg-brand-900 text-white lg:block">
        <div className="container-page flex h-10 items-center justify-between text-xs">
          <p className="text-brand-100">
            Authorized channel partner · GSTIN {company.gst}
          </p>
          <div className="flex items-center gap-5">
            <a
              href={company.phoneHref}
              className="flex items-center gap-1.5 font-medium hover:text-volt-400"
            >
              <PhoneIcon className="h-3.5 w-3.5" />
              {company.phone}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="font-medium hover:text-volt-400"
            >
              {company.email}
            </a>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b border-hairline bg-white/95 backdrop-blur-sm">
        <div className="container-page flex h-16 items-center justify-between gap-4 sm:h-18">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-brand-900 transition-colors hover:bg-brand-50 hover:text-brand-700"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <Button href={whatsappHref} variant="secondary">
                <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                WhatsApp
              </Button>
              <Button href="/contact">Get a Quote</Button>
            </div>

            {/* Compact phone CTA replaces the pair on the smallest screens. */}
            <a
              href={company.phoneHref}
              aria-label={`Call ${company.phone}`}
              className="grid h-10 w-10 place-items-center rounded-lg bg-brand-600 text-white sm:hidden"
            >
              <PhoneIcon className="h-5 w-5" />
            </a>

            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              className="grid h-10 w-10 place-items-center rounded-lg border border-hairline text-brand-900 xl:hidden"
            >
              {menuOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {menuOpen && (
          <div
            id="mobile-nav"
            className="border-t border-hairline bg-white xl:hidden"
          >
            <nav aria-label="Mobile" className="container-page flex flex-col py-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="border-b border-hairline py-3 text-sm font-medium text-brand-900 last:border-0"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-3 flex flex-col gap-2 pb-2">
                <Button href="/contact">Get a Quote</Button>
                <Button href={whatsappHref} variant="secondary">
                  <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
                  Chat on WhatsApp
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
