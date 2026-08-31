import Link from "next/link";
import {
  brands,
  certifications,
  company,
  headOffice,
  navLinks,
} from "@/lib/site-config";
import { Logo } from "./Header";
import { MailIcon, PhoneIcon, PinIcon } from "./icons";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-brand-950 text-brand-100">
      <div className="container-page py-14 sm:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {/* Brand + address */}
          <div className="lg:col-span-1">
            <Logo inverted />
            <address className="mt-6 space-y-3 text-sm not-italic leading-relaxed">
              <p className="flex items-start gap-2.5">
                <PinIcon className="mt-0.5 h-4 w-4 flex-none text-brand-400" />
                <span>
                  {headOffice.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="block">India</span>
                </span>
              </p>
              <p>
                <a
                  href={company.phoneHref}
                  className="flex items-center gap-2.5 hover:text-white"
                >
                  <PhoneIcon className="h-4 w-4 flex-none text-brand-400" />
                  {company.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${company.email}`}
                  className="flex items-center gap-2.5 hover:text-white"
                >
                  <MailIcon className="h-4 w-4 flex-none text-brand-400" />
                  {company.email}
                </a>
              </p>
            </address>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Quick Links
            </h2>
            <ul className="mt-5 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-white">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Brands, split across two columns to keep the footer balanced */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Brands We Carry
            </h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 text-sm sm:grid-cols-3">
              {brands.map((brand) => (
                <li key={brand.name}>
                  <Link href="/products" className="hover:text-white">
                    {brand.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h2 className="mt-8 text-sm font-semibold uppercase tracking-[0.12em] text-white">
              Certifications
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <li
                  key={cert}
                  className="rounded border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium"
                >
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-brand-300 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {company.name}. All rights reserved.
          </p>
          <p>GSTIN {company.gst}</p>
        </div>
      </div>
    </footer>
  );
}
