import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import { ProcessRail } from "@/components/home/ProcessRail";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand, DraftTag, PageHero, RuleList, SectionHeader } from "@/components/ui/primitives";
import { ServiceGlyph } from "@/components/visuals/ServiceGlyph";
import { getService, serviceHref, services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({ title: service.name, description: service.summary, path: serviceHref(service) });
}

export default async function ServicePage({ params }: Params) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const detailed = service.capabilities.some((c) => c.problem);
  const others = services.filter((s) => s.id !== service.id);
  const contactHref = `/contact?service=${service.slug}`;

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Services", path: "/services" },
          { name: service.name, path: serviceHref(service) },
        ]}
        label={`${service.index} / ${service.name}`}
        title={service.headline}
        lead={service.summary}
        aside={
          <div className="mx-auto max-w-[20rem] border border-line bg-paper-raised p-6 lg:ml-auto lg:mr-0">
            <ServiceGlyph id={service.id} trigger="mount" className="block aspect-square w-full" />
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          <ButtonLink href={contactHref}>Discuss this service</ButtonLink>
          <ButtonLink href="#capabilities" variant="secondary" arrow={false}>
            See what is included
          </ButtonLink>
        </div>
        {!service.confirmed ? <DraftTag className="mt-6">Portfolio to be confirmed</DraftTag> : null}
      </PageHero>

      {/* Context */}
      <section className="shell pb-20 md:pb-28" aria-label="Overview">
        <div className="grid gap-x-10 gap-y-8 border-t border-line pt-10 lg:grid-cols-12">
          <p className="type-label text-ink-faint lg:col-span-3">The situation</p>
          <Reveal className="space-y-5 text-[1.12rem] leading-relaxed text-ink-soft lg:col-span-7">
            {service.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Capabilities */}
      <section id="capabilities" className="bg-paper-sunk" aria-labelledby="capabilities-heading">
        <div className="shell section-y">
          <SectionHeader
            id="capabilities-heading"
            label="Capabilities"
            title={detailed ? "The problem, our approach, and where it applies." : "What this service covers."}
            className="mb-10 md:mb-14"
          />

          {detailed ? (
            <ol className="border-b border-line-strong">
              {service.capabilities.map((c, i) => (
                <li key={c.title} className="border-t border-line-strong py-10 md:py-12">
                  <Reveal className="grid gap-x-10 gap-y-6 lg:grid-cols-12">
                    <div className="lg:col-span-4">
                      <p className="type-label text-accent-ink">{String(i + 1).padStart(2, "0")}</p>
                      <h3 className="type-h3 mt-3 max-w-[16ch]">{c.title}</h3>
                    </div>
                    <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:col-span-8">
                      <div>
                        <h4 className="type-label font-mono text-ink-faint">The problem</h4>
                        <p className="mt-3 leading-relaxed text-ink-soft">{c.problem}</p>
                      </div>
                      <div>
                        <h4 className="type-label font-mono text-ink-faint">Our approach</h4>
                        <p className="mt-3 leading-relaxed text-ink">{c.solution}</p>
                      </div>
                      {c.useCases ? (
                        <div>
                          <h4 className="type-label font-mono text-ink-faint">Typical use cases</h4>
                          <RuleList items={c.useCases} className="mt-3" />
                        </div>
                      ) : null}
                      {c.benefits ? (
                        <div>
                          <h4 className="type-label font-mono text-ink-faint">Potential benefits</h4>
                          <RuleList items={c.benefits} className="mt-3" />
                        </div>
                      ) : null}
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          ) : (
            <Stagger as="ul" gap={0.05} className="grid border-l border-t border-line-strong md:grid-cols-2">
              {service.capabilities.map((c, i) => (
                <StaggerItem as="li" key={c.title} className="border-b border-r border-line-strong bg-paper-sunk p-7 transition-colors duration-500 hover:bg-paper md:p-9">
                  <p className="type-label text-accent-ink">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="type-h3 mt-3">{c.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink-soft">{c.summary}</p>
                  {c.includes ? <RuleList items={c.includes} className="mt-5" /> : null}
                </StaggerItem>
              ))}
            </Stagger>
          )}

          {service.note ? (
            <Reveal className="mt-12 grid gap-x-10 gap-y-3 border-l-4 border-accent bg-paper p-7 md:p-9 lg:grid-cols-12">
              <h3 className="type-h3 lg:col-span-4">{service.note.title}</h3>
              <p className="leading-relaxed text-ink-soft lg:col-span-8">{service.note.body}</p>
            </Reveal>
          ) : null}
        </div>
      </section>

      {/* Delivery process */}
      <section className="shell section-y" aria-labelledby="delivery-heading">
        <SectionHeader
          id="delivery-heading"
          label="Delivery"
          title="From discovery through deployment and support."
          lead="Every engagement follows the same six stages, scaled to the size of the work."
          className="mb-12 md:mb-16"
        />
        <ProcessRail />
        <Reveal className="mt-12 grid gap-x-10 gap-y-8 border-t border-line pt-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h3 className="type-h3">What you leave with</h3>
          </div>
          <div className="lg:col-span-5">
            <RuleList items={service.outcomes} />
          </div>
          <div className="lg:col-span-3 lg:text-right">
            <ButtonLink href="/how-we-work" variant="secondary" size="sm">
              Full process
            </ButtonLink>
          </div>
        </Reveal>
      </section>

      {/* Other services */}
      <section className="shell pb-20 md:pb-28" aria-labelledby="other-services-heading">
        <h2 id="other-services-heading" className="type-label rule-top pt-6 font-mono text-ink-faint">
          Other services
        </h2>
        <ul className="mt-6 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {others.map((s) => (
            <li key={s.id} className="border-b border-r border-line">
              <Link href={serviceHref(s)} className="group flex h-full flex-col justify-between gap-8 p-6 transition-colors duration-300 hover:bg-paper-raised">
                <span className="type-label text-ink-faint">{s.index}</span>
                <span className="flex items-end justify-between gap-3">
                  <span className="font-display text-xl font-semibold leading-tight group-hover:text-accent-ink">{s.name}</span>
                  <ArrowUpRight aria-hidden="true" className="size-5 shrink-0 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <CtaBand
        title={service.id === "more" ? "Need something that is *not* listed?" : `Talk to us about *${service.shortName.replace(" ", "* ")}${service.shortName.includes(" ") ? "" : "*"}.`}
        body="Tell us where things stand today and what you would like to change. We will reply with questions, ideas and an honest view of fit."
        primary={{ label: "Let’s Talk", href: contactHref }}
      />
    </>
  );
}
