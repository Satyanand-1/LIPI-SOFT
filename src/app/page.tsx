import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { Hero } from "@/components/home/Hero";
import { ProcessRail } from "@/components/home/ProcessRail";
import { ScrollStatement } from "@/components/home/ScrollStatement";
import { ServiceExplorer } from "@/components/home/ServiceExplorer";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Accordion } from "@/components/ui/Accordion";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand, SectionHeader } from "@/components/ui/primitives";
import { CaseList } from "@/components/work/CaseList";
import { featuredFaqs } from "@/content/faqs";
import { challenges, integrationLayers, reasons, statement } from "@/content/home";
import { services, serviceHref } from "@/content/services";
import { site } from "@/content/site";
import { caseStudies } from "@/content/work";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `${site.name} | Software, AI Automation, CRM and IT Infrastructure`,
  description: site.description,
  path: "/",
});

function TextLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="group inline-flex items-center gap-2 py-2 text-[0.97rem] font-semibold">
      <span className="link-draw">{children}</span>
      <ArrowRight aria-hidden="true" className="size-4 transition-transform duration-500 ease-expo group-hover:translate-x-1" />
    </Link>
  );
}

export default function HomePage() {
  const additional = services.find((s) => s.id === "more");

  return (
    <>
      <Hero />

      {/* Introduction */}
      <section id="intro" className="shell section-y" aria-label="Introduction">
        <div className="rule-top grid gap-x-10 gap-y-8 pt-6 lg:grid-cols-12">
          <p className="type-label text-ink-faint lg:col-span-3">Who we are</p>
          <div className="lg:col-span-9">
            <ScrollStatement
              text={statement}
              className="font-display text-[clamp(1.6rem,1.1rem+2.4vw,3.1rem)] font-medium leading-[1.14] tracking-[-0.025em]"
            />
            <Reveal className="mt-10">
              <TextLink href="/about">About LIPI SOFT</TextLink>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="shell pb-20 md:pb-28" aria-labelledby="capabilities-heading">
        <SectionHeader
          id="capabilities-heading"
          label="What we do"
          title="Four disciplines, planned as one system."
          lead="Each can stand alone. Most projects draw on more than one, which is why we keep them under the same roof."
          className="mb-12 md:mb-16"
        />
        <ServiceExplorer />
        {additional ? (
          <Reveal className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="max-w-xl text-[0.97rem] text-ink-soft">
              Also available: cloud and DevOps, system integration, data engineering, consulting and ongoing technical support.
            </p>
            <TextLink href={serviceHref(additional)}>Additional technology services</TextLink>
          </Reveal>
        ) : null}
      </section>

      {/* Challenges and responses */}
      <section className="defer-render bg-paper-sunk" aria-labelledby="challenges-heading">
        <div className="shell section-y">
          <SectionHeader
            id="challenges-heading"
            label="Problems we solve"
            title="If any of this sounds *familiar,* we should talk."
            className="mb-10 md:mb-14"
          />
          <Stagger as="ol" className="border-b border-line-strong">
            {challenges.map((c, i) => {
              const service = services.find((s) => s.id === c.service);
              return (
                <StaggerItem as="li" key={c.quote} className="group grid gap-x-10 gap-y-4 border-t border-line-strong py-8 lg:grid-cols-12 lg:py-10">
                  <p className="type-label text-ink-faint lg:col-span-1 lg:pt-2">{String(i + 1).padStart(2, "0")}</p>
                  <p className="font-display text-[clamp(1.4rem,1.1rem+1.3vw,2.15rem)] font-semibold leading-[1.12] tracking-[-0.02em] lg:col-span-6">
                    <span aria-hidden="true" className="text-accent">“</span>
                    {c.quote}
                    <span aria-hidden="true" className="text-accent">”</span>
                  </p>
                  <div className="lg:col-span-5">
                    <p className="text-[1.02rem] leading-relaxed text-ink-soft">{c.response}</p>
                    {service ? (
                      <p className="mt-3">
                        <TextLink href={serviceHref(service)}>{c.link}</TextLink>
                      </p>
                    ) : null}
                  </div>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      {/* Technology and integration */}
      <section className="defer-render shell section-y" aria-labelledby="integration-heading">
        <div className="grid gap-x-10 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="type-label text-ink-faint">Technology and integration</p>
            <SplitHeading id="integration-heading" text="We work with what you already have." className="type-h2 mt-5 max-w-[14ch]" />
          </div>
          <Reveal className="lg:col-span-6 lg:col-start-7 lg:pt-10">
            <p className="type-lead">
              New technology has to live alongside existing systems, data and habits. We design across every layer, and choose specific
              tools to suit your environment instead of forcing a favourite stack onto it.
            </p>
          </Reveal>
        </div>

        {/* Layers hang from one shared rule, the same way the hero diagram does. */}
        <Stagger as="ul" gap={0.06} className="mt-14 grid border-t-[6px] border-ink sm:grid-cols-2 lg:grid-cols-6">
          {integrationLayers.map((layer, i) => (
            <StaggerItem
              as="li"
              key={layer.title}
              className="group relative border-b border-line px-0 pb-8 pt-9 transition-colors duration-500 hover:bg-paper-raised sm:px-5 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:first:pl-0"
            >
              <span aria-hidden="true" className="absolute left-0 top-0 h-6 w-px bg-ink sm:left-5 lg:group-first:left-0" />
              <p className="type-label text-accent-ink">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-2 font-display text-lg font-semibold leading-tight">{layer.title}</h3>
              <ul className="mt-4 space-y-1.5">
                {layer.items.map((item) => (
                  <li key={item} className="font-mono text-[0.78rem] leading-snug text-ink-soft">
                    {item}
                  </li>
                ))}
              </ul>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Process */}
      <section className="shell pb-20 md:pb-28 xl:pb-36" aria-labelledby="process-heading">
        <SectionHeader
          id="process-heading"
          label="How we work"
          title="A clear path from first conversation to *long-term* support."
          className="mb-12 md:mb-16"
        />
        <ProcessRail />
        <Reveal className="mt-12">
          <ButtonLink href="/how-we-work" variant="secondary">
            See the full process
          </ButtonLink>
        </Reveal>
      </section>

      {/* Selected work */}
      <section className="defer-render bg-paper-raised" aria-labelledby="work-heading">
        <div className="shell section-y">
          <SectionHeader
            id="work-heading"
            label="Selected work"
            title="How we would approach it."
            lead="These are demonstration projects: realistic scenarios that show our thinking and method. They are not client engagements, and we will add real case studies as clients approve them."
            className="mb-10 md:mb-14"
          />
          <CaseList items={caseStudies.slice(0, 3)} />
          <Reveal className="mt-10">
            <TextLink href="/work">All projects</TextLink>
          </Reveal>
        </div>
      </section>

      {/* Why LIPI SOFT */}
      <section className="defer-render on-ink bg-ink text-paper" aria-labelledby="why-heading">
        <div className="shell section-y">
          <div className="rule-top grid gap-x-10 gap-y-5 pt-6 lg:grid-cols-12">
            <p className="type-label text-paper/60 lg:col-span-3">Why LIPI SOFT</p>
            <div className="lg:col-span-9">
              <SplitHeading id="why-heading" text="Straightforward people to build technology with." className="type-h2 max-w-[18ch]" />
            </div>
          </div>
          <Stagger as="ol" className="mt-14 grid gap-x-10 md:grid-cols-2 lg:mt-20">
            {reasons.map((reason, i) => (
              <StaggerItem as="li" key={reason.title} className="grid grid-cols-[3.5rem_1fr] gap-x-4 border-t border-paper/20 py-8 md:py-10">
                <span aria-hidden="true" className="font-display text-4xl font-semibold leading-none text-accent-bright">
                  {i + 1}
                </span>
                <div>
                  <h3 className="type-h3">{reason.title}</h3>
                  <p className="mt-3 max-w-md leading-relaxed text-paper/70">{reason.body}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* FAQ */}
      <section className="shell section-y" aria-labelledby="faq-heading">
        <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="rule-top pt-6 lg:sticky lg:top-28">
              <p className="type-label text-ink-faint">Questions</p>
              <SplitHeading id="faq-heading" text="Asked before most projects begin." className="type-h2 mt-5" />
              <Reveal className="mt-8">
                <TextLink href="/faq">All frequently asked questions</TextLink>
              </Reveal>
            </div>
          </div>
          <Reveal className="lg:col-span-8">
            <Accordion items={featuredFaqs} />
          </Reveal>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
