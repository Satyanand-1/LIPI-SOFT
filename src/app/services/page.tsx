import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand, DraftTag, PageHero } from "@/components/ui/primitives";
import { ServiceGlyph } from "@/components/visuals/ServiceGlyph";
import { coreServices, serviceHref, services } from "@/content/services";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "AI automation, custom software development, networking and IT infrastructure, CRM solutions and supporting technology services from LIPI SOFT.",
  path: "/services",
});

export default function ServicesPage() {
  const additional = services.find((s) => s.id === "more");

  return (
    <>
      <PageHero
        crumbs={[{ name: "Services", path: "/services" }]}
        label="Services"
        title="Practical technology, from the network *up.*"
        lead="Four core disciplines and a set of supporting services. Engage us for one, or let us plan across all of them so the pieces fit."
      >
        <nav aria-label="Services on this page">
          <ul className="flex flex-wrap gap-x-6 gap-y-1">
            {services.map((s) => (
              <li key={s.id}>
                <a href={`#${s.slug}`} className="link-draw inline-block py-2 text-[0.95rem] font-medium">
                  <span className="type-label mr-2 text-ink-faint">{s.index}</span>
                  {s.shortName}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {coreServices.map((service, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={service.id} id={service.slug} aria-labelledby={`${service.slug}-heading`} className={cn(i % 2 === 1 && "bg-paper-sunk")}>
            <div className="shell section-y">
              <div className="rule-top grid gap-x-10 gap-y-10 pt-6 lg:grid-cols-12">
                <div className={cn("lg:col-span-7", flip && "lg:order-2 lg:col-start-6")}>
                  <p className="type-label text-accent-ink">
                    {service.index} <span className="text-ink-faint">/ {service.name}</span>
                  </p>
                  <SplitHeading id={`${service.slug}-heading`} text={service.headline} className="type-h2 mt-5 max-w-[20ch]" />
                  <Reveal delay={0.1}>
                    <p className="type-lead mt-6 max-w-xl">{service.summary}</p>
                    <ul className="mt-9 grid max-w-2xl gap-x-8 sm:grid-cols-2">
                      {service.capabilities.map((c) => (
                        <li key={c.title} className="flex gap-3 border-t border-line py-3 text-[0.97rem] leading-snug">
                          <span aria-hidden="true" className="mt-[0.55em] h-0.5 w-3 shrink-0 bg-accent" />
                          {c.title}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-9">
                      <ButtonLink href={serviceHref(service)}>
                        Explore {service.shortName}
                      </ButtonLink>
                    </div>
                  </Reveal>
                </div>
                <div className={cn("lg:col-span-4", flip ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
                  <div className={cn("mx-auto max-w-[22rem] border border-line p-6 lg:sticky lg:top-28 lg:p-8", i % 2 === 1 ? "bg-paper" : "bg-paper-raised")}>
                    <ServiceGlyph id={service.id} className="block aspect-square w-full" />
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {additional ? (
        <section id={additional.slug} aria-labelledby={`${additional.slug}-heading`} className="shell section-y">
          <div className="rule-top grid gap-x-10 gap-y-8 pt-6 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="type-label text-accent-ink">
                {additional.index} <span className="text-ink-faint">/ {additional.name}</span>
              </p>
              <SplitHeading id={`${additional.slug}-heading`} text={additional.headline} className="type-h2 mt-5" />
              {!additional.confirmed ? <DraftTag className="mt-6">Portfolio to be confirmed</DraftTag> : null}
              <Reveal className="mt-6">
                <p className="text-[1.02rem] leading-relaxed text-ink-soft">{additional.summary}</p>
                <Link href={serviceHref(additional)} className="group mt-6 inline-flex items-center gap-2 py-2 text-[0.97rem] font-semibold">
                  <span className="link-draw">View these services</span>
                  <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-500 ease-expo group-hover:translate-x-1" />
                </Link>
              </Reveal>
            </div>
            <Reveal className="lg:col-span-7 lg:col-start-6">
              <ul className="grid border-l border-t border-line sm:grid-cols-2">
                {additional.capabilities.map((c) => (
                  <li key={c.title} className="border-b border-r border-line p-6">
                    <h3 className="font-display text-lg font-semibold leading-tight">{c.title}</h3>
                    <p className="mt-2 text-[0.94rem] leading-relaxed text-ink-soft">{c.summary}</p>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>
      ) : null}

      <CtaBand title="Not sure which service *fits?*" body="Describe the problem in your own words. We will work out which disciplines it needs and tell you what we would recommend." />
    </>
  );
}
