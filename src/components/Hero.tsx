import { certifications, hero } from "@/lib/site-config";
import { ArrowRightIcon, BoltIcon } from "./icons";
import { Button } from "./ui";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-950 text-white">
      {/* Layered background: radial glow + faint technical grid, pure CSS. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_0%,rgba(47,128,237,0.35),transparent_60%),radial-gradient(60%_50%_at_100%_100%,rgba(245,158,11,0.14),transparent_60%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] [background-size:56px_56px]"
      />

      <div className="container-page relative py-20 sm:py-28 lg:py-32">
        <div className="max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-brand-100">
            <BoltIcon className="h-3.5 w-3.5 text-volt-400" />
            {hero.eyebrow}
          </p>

          <h1 className="mt-6 text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-brand-100 sm:text-xl">
            {hero.subtitle}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href={hero.primaryCta.href} size="lg">
              {hero.primaryCta.label}
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Button
              href={hero.secondaryCta.href}
              variant="ghost"
              size="lg"
            >
              {hero.secondaryCta.label}
            </Button>
          </div>
        </div>

        {/* Stat band */}
        <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-white/12 pt-10 sm:mt-20 lg:grid-cols-4">
          {hero.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="order-2 mt-1 text-sm text-brand-200">{stat.label}</dt>
              <dd className="order-1 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Certification strip */}
        <div className="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2">
          <span className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-300">
            Registered &amp; certified
          </span>
          {certifications.map((cert) => (
            <span
              key={cert}
              className="rounded border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-brand-100"
            >
              {cert}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
