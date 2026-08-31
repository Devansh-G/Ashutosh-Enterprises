import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Compact hero for inner pages. Deliberately shorter and flatter than the
 * homepage <Hero> so inner pages don't compete with the landing page.
 */
export default function PageHero({
  title,
  subtitle,
  breadcrumb,
  children,
}: {
  title: string;
  subtitle?: string;
  /** Current page name; "Home" is prepended automatically. */
  breadcrumb: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(75%_60%_at_10%_0%,rgba(47,128,237,0.30),transparent_62%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <div className="container-page relative py-14 sm:py-18 lg:py-20">
        <nav aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-xs font-medium text-brand-300">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-brand-100">{breadcrumb}</li>
          </ol>
        </nav>

        <h1 className="mt-5 max-w-4xl text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-5xl">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-brand-100 sm:text-lg">
            {subtitle}
          </p>
        )}

        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
