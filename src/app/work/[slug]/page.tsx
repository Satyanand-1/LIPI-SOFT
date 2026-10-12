import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand, PageHero, RuleList, SectionHeader, Tag } from "@/components/ui/primitives";
import { ServiceGlyph } from "@/components/visuals/ServiceGlyph";
import { serviceHref, services } from "@/content/services";
import { caseStudies, getCaseStudy } from "@/content/work";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return {};
  return pageMetadata({
    title: `${study.title}${study.kind === "demonstration" ? " (Demonstration)" : ""}`,
    description: study.summary,
    path: `/work/${study.slug}`,
  });
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const service = services.find((s) => s.id === study.service);
  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies.length > 1 ? caseStudies[(index + 1) % caseStudies.length] : undefined;
  const isDemo = study.kind === "demonstration";

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Our Work", path: "/work" },
          { name: study.title, path: `/work/${study.slug}` },
        ]}
        label={isDemo ? "Demonstration project" : "Client project"}
        title={study.title}
        lead={study.summary}
        aside={
          <div className="mx-auto max-w-[20rem] border border-line bg-paper-raised p-6 lg:ml-auto lg:mr-0">
            <ServiceGlyph id={study.service} trigger="mount" className="block aspect-square w-full" />
          </div>
        }
      >
        <div className="flex flex-wrap gap-2">
          <Tag tone={isDemo ? "accent" : "pine"}>{isDemo ? "Demonstration project" : "Client project"}</Tag>
          <Tag>{study.sector}</Tag>
          {service ? <Tag>{service.name}</Tag> : null}
        </div>
      </PageHero>

      {isDemo ? (
        <div className="shell pb-10">
          <p className="max-w-3xl border-l-4 border-accent bg-paper-raised p-5 text-[0.97rem] leading-relaxed text-ink-soft md:p-6">
            <strong className="font-semibold text-ink">This is not client work.</strong> It is an illustrative scenario showing how we would
            approach a problem of this kind. The business described is hypothetical and no results are claimed.
          </p>
        </div>
      ) : null}

      {/* Challenge and requirements */}
      <section className="shell pb-20 md:pb-28" aria-label="Challenge and requirements">
        <div className="grid gap-x-10 gap-y-12 border-t border-line pt-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <h2 className="type-label font-mono text-accent-ink">The challenge</h2>
            <div className="mt-5 space-y-5 text-[1.12rem] leading-relaxed text-ink-soft">
              {study.challenge.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <h2 className="type-label font-mono text-accent-ink">Business requirements</h2>
            <ul className="mt-5 border-b border-line">
              {study.requirements.map((r, i) => (
                <li key={r} className="grid grid-cols-[2.25rem_1fr] border-t border-line py-3.5 text-[0.99rem] leading-snug">
                  <span className="type-label pt-1 text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                  {r}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Solution approach */}
      <section className="bg-paper-sunk" aria-labelledby="approach-heading">
        <div className="shell section-y">
          <SectionHeader id="approach-heading" label="Solution approach" title={isDemo ? "How we would solve it." : "How we solved it."} className="mb-10 md:mb-14" />
          <Stagger as="ol" className="grid border-l border-t border-line-strong md:grid-cols-2">
            {study.approach.map((step, i) => (
              <StaggerItem as="li" key={step.title} className="border-b border-r border-line-strong p-7 md:p-9">
                <p className="type-label text-accent-ink">Step {i + 1}</p>
                <h3 className="type-h3 mt-3">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">{step.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Technologies and implementation */}
      <section className="shell section-y" aria-label="Technologies and implementation">
        <div className="grid gap-x-10 gap-y-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="rule-top pt-6">
              <h2 className="type-h3">Technologies used</h2>
              <ul className="mt-6 flex flex-wrap gap-2">
                {study.technologies.map((t) => (
                  <li key={t} className="border border-line-strong px-3 py-1.5 font-mono text-[0.78rem] text-ink-soft">
                    {t}
                  </li>
                ))}
              </ul>
              {isDemo ? (
                <p className="mt-5 text-[0.9rem] leading-relaxed text-ink-faint">
                  Described by type. Specific products are chosen to suit each client’s environment.
                </p>
              ) : null}
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:col-start-6">
            <div className="rule-top pt-6">
              <h2 className="type-h3">Implementation overview</h2>
              <ol className="mt-6">
                {study.implementation.map((phase, i) => (
                  <li key={phase.phase} className="relative grid grid-cols-[2.5rem_1fr] pb-8 last:pb-0">
                    {i < study.implementation.length - 1 ? <span aria-hidden="true" className="absolute left-[0.4375rem] top-4 bottom-0 w-px bg-line-strong" /> : null}
                    <span aria-hidden="true" className="relative mt-1.5 size-[0.9375rem] border-2 border-ink bg-paper" />
                    <div>
                      <h3 className="font-display text-xl font-semibold leading-tight">{phase.phase}</h3>
                      <p className="mt-2 leading-relaxed text-ink-soft">{phase.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Outcomes */}
      <section className="on-ink bg-ink text-paper" aria-labelledby="outcomes-heading">
        <div className="shell section-y">
          <div className="rule-top grid gap-x-10 gap-y-8 pt-6 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="type-label text-paper/60">Outcomes</p>
              <h2 id="outcomes-heading" className="type-h2 mt-5">
                {study.results.length > 0 ? "Verified results." : "What we would measure."}
              </h2>
            </div>
            <Reveal className="lg:col-span-6 lg:col-start-7">
              {study.results.length > 0 ? (
                <dl className="grid gap-8 sm:grid-cols-2">
                  {study.results.map((r) => (
                    <div key={r.label} className="border-t border-paper/25 pt-4">
                      <dt className="text-paper/70">{r.label}</dt>
                      <dd className="mt-1 font-display text-5xl font-semibold tracking-[-0.03em] text-accent-bright">{r.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <>
                  <p className="max-w-xl text-lg leading-relaxed text-paper/75">
                    {isDemo
                      ? "Because this is a demonstration, there are no results to report. In a real engagement we would record a baseline before starting and track:"
                      : "Results for this project have not yet been verified for publication. The engagement tracks:"}
                  </p>
                  <RuleList items={study.measures} className="mt-6 [&_li]:text-paper/90" />
                </>
              )}
            </Reveal>
          </div>
        </div>
      </section>

      <section className="shell py-14 md:py-20" aria-label="More">
        <div className="grid gap-8 md:grid-cols-2">
          {service ? (
            <Link href={serviceHref(service)} className="group border-t-2 border-ink pt-6">
              <span className="type-label block text-ink-faint">Related service</span>
              <span className="mt-3 flex items-end justify-between gap-4">
                <span className="type-h3 transition-colors group-hover:text-accent-ink">{service.name}</span>
                <ArrowRight aria-hidden="true" className="size-6 shrink-0 transition-transform duration-500 ease-expo group-hover:translate-x-1.5" strokeWidth={1.5} />
              </span>
            </Link>
          ) : null}
          {next ? (
            <Link href={`/work/${next.slug}`} className="group border-t-2 border-ink pt-6">
              <span className="type-label block text-ink-faint">Next project</span>
              <span className="mt-3 flex items-end justify-between gap-4">
                <span className="type-h3 transition-colors group-hover:text-accent-ink">{next.title}</span>
                <ArrowRight aria-hidden="true" className="size-6 shrink-0 transition-transform duration-500 ease-expo group-hover:translate-x-1.5" strokeWidth={1.5} />
              </span>
            </Link>
          ) : null}
        </div>
      </section>

      <CtaBand title="Facing something *similar?*" />
    </>
  );
}
