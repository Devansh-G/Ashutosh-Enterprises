import { company, finalCta, whatsappHref } from "@/lib/site-config";
import { ArrowRightIcon, PhoneIcon, WhatsAppIcon } from "./icons";
import { Button } from "./ui";

export default function CtaSection() {
  return (
    <section id="contact" className="relative overflow-hidden bg-brand-900 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_85%_0%,rgba(47,128,237,0.30),transparent_65%)]"
      />

      <div className="container-page relative py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:gap-16">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {finalCta.title}
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-brand-100">
              {finalCta.body}
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button
              href={finalCta.primary.href}
              variant="inverse"
              size="lg"
              className="w-full"
            >
              {finalCta.primary.label}
              <ArrowRightIcon className="h-4 w-4" />
            </Button>
            <Button
              href={company.phoneHref}
              variant="ghost"
              size="lg"
              className="w-full"
            >
              <PhoneIcon className="h-4 w-4" />
              {company.phone}
            </Button>
            <Button
              href={whatsappHref}
              variant="ghost"
              size="lg"
              className="w-full"
            >
              <WhatsAppIcon className="h-4 w-4 text-[#25D366]" />
              Chat on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
