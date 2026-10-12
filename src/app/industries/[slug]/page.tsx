import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui/primitives";
import { getIndustry, industries } from "@/content/industries";
import { serviceHref, services } from "@/content/services";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  return pageMetadata({ title: `${industry.name} Technology Solutions`, description: industry.summary, path: `/industries/${industry.slug}` });
}

export default async function IndustryPage({ params }: Params) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const index = industries.findIndex((i) => i.slug === industry.slug);
  const next = industries[(index + 1) % industries.length];

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Industries", path: "/industries" },
          { name: industry.name, path: `/industries/${industry.slug}` },
        ]}
        label={`Industries / ${industry.name}`}
        title={industry.headline}
        lead={industry.context}
      >
        <ButtonLink href="/contact">Discuss your project</ButtonLink>
      </PageHero>

      {/* Challenges */}
      <section className="shell pb-20 md:pb-28" aria-labelledby="challenges-heading">
        <SectionHeader id="challenges-heading" label="Common challenges" title="What we tend to hear." className="mb-10 md:mb-14" />
        <Stagger as="ul" className="grid border-l border-t border-line md:grid-cols-3">
          {industry.challenges.map((c, i) => (
            <StaggerItem as="li" key={c.title} className="border-b border-r border-line p-7 md:p-9">
              <span aria-hidden="true" className="font-display text-5xl font-semibold leading-none text-ink/15">
                {i + 1}
              </span>
              <h3 className="type-h3 mt-6">{c.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{c.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* How we help */}
      <section className="bg-paper-sunk" aria-labelledby="help-heading">
        <div className="shell section-y">
          <SectionHeader id="help-heading" label="How we can help" title="Where our services *apply.*" className="mb-10 md:mb-14" />
          <Stagger as="ul" className="border-b border-line-strong">
            {industry.help.map((h) => {
              const service = services.find((s) => s.id === h.service);
              return (
                <StaggerItem as="li" key={h.title} className="grid gap-x-10 gap-y-3 border-t border-line-strong py-8 lg:grid-cols-12 lg:py-10">
                  <h3 className="type-h3 lg:col-span-5">{h.title}</h3>
                  <p className="text-[1.02rem] leading-relaxed text-ink-soft lg:col-span-4">{h.body}</p>
                  {service ? (
                    <p className="lg:col-span-3 lg:text-right">
                      <Link href={serviceHref(service)} className="group inline-flex items-center gap-2 py-2 text-[0.95rem] font-semibold">
                        <span className="link-draw">{service.name}</span>
                        <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </Link>
                    </p>
                  ) : null}
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal className="mt-12 grid gap-x-10 gap-y-3 border-l-4 border-accent bg-paper p-7 md:p-9 lg:grid-cols-12">
            <h3 className="type-h3 lg:col-span-4">Regulation and scope</h3>
            <p className="leading-relaxed text-ink-soft lg:col-span-8">{industry.consideration}</p>
          </Reveal>
        </div>
      </section>

      {next ? (
        <section className="shell py-14 md:py-20" aria-label="Next industry">
          <Link href={`/industries/${next.slug}`} className="group flex flex-wrap items-end justify-between gap-6 border-t-2 border-ink pt-6">
            <span>
              <span className="type-label block text-ink-faint">Next industry</span>
              <span className="type-h2 mt-3 block transition-colors group-hover:text-accent-ink">{next.name}</span>
            </span>
            <ArrowRight aria-hidden="true" className="size-9 transition-transform duration-500 ease-expo group-hover:translate-x-2" strokeWidth={1.25} />
          </Link>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
