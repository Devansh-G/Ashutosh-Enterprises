import Link from "next/link";
import type { ReactNode } from "react";

/** Small uppercase label that sits above a section heading. */
export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-brand-600">
      {children}
    </p>
  );
}

/** Section heading with consistent type scale across the page. */
export function SectionTitle({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-3xl font-bold tracking-tight text-brand-900 sm:text-4xl ${className}`}
    >
      {children}
    </h2>
  );
}

export function SectionBody({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`text-base leading-relaxed text-[color:var(--color-muted)] sm:text-lg ${className}`}>
      {children}
    </p>
  );
}

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "inverse";
  size?: "md" | "lg";
  className?: string;
};

// Padding and font-size deliberately live in buttonSizes, NOT in buttonBase.
// While they were baked into the base string, callers passing
// className="px-6 py-3.5 text-base" got a silently half-applied button:
// py-3.5 won over py-3 but text-base LOST to text-sm, because Tailwind resolves
// same-property collisions by stylesheet order and emits .text-base before
// .text-sm. Sizing is a prop so there is nothing left to collide with.
const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200";

const buttonSizes: Record<NonNullable<ButtonProps["size"]>, string> = {
  md: "px-5 py-3 text-sm",
  lg: "px-6 py-3.5 text-base",
};

const buttonVariants: Record<NonNullable<ButtonProps["variant"]>, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary:
    "border border-hairline bg-white text-brand-900 hover:border-brand-300 hover:bg-brand-50",
  ghost: "border border-white/30 text-white hover:bg-white/10",
  // For use on dark backgrounds. Exists as a variant rather than a className
  // override because Tailwind resolves conflicting utilities by stylesheet
  // order, not by the order they appear in the class string.
  inverse: "bg-white text-brand-900 hover:bg-brand-50",
};

export function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  className = "",
}: ButtonProps) {
  const isInternal = href.startsWith("/") || href.startsWith("#");
  const classes = `${buttonBase} ${buttonSizes[size]} ${buttonVariants[variant]} ${className}`;

  if (isInternal) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  // External links (tel:, https://wa.me/, mailto:) get a plain anchor.
  const isHttp = href.startsWith("http");
  return (
    <a
      href={href}
      className={classes}
      {...(isHttp ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

/** Elevated white card used by the industries / why-us / product grids. */
export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-hairline bg-white p-6 shadow-card transition-shadow duration-200 hover:shadow-card-hover ${className}`}
    >
      {children}
    </div>
  );
}

/** Wraps each homepage band with consistent vertical rhythm. */
export function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}
