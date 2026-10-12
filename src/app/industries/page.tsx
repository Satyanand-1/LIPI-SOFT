import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand, PageHero } from "@/components/ui/primitives";
import { industries } from "@/content/industries";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Industries",
  description:
    "How LIPI SOFT applies software, AI automation, CRM and infrastructure to healthcare, finance, retail, manufacturing, professional services and startups.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Industries", path: "/industries" }]}
        label="Industries"
        title="The same disciplines, shaped by the *sector* they serve."
        lead="Every industry has its own pressures, vocabulary and rules. Below is how we think about the sectors where our services are most often useful."
      />

      <section className="shell pb-20 md:pb-28" aria-label="Industries we work with">
        <Stagger as="ul" gap={0.06} className="border-b-2 border-ink">
          {industries.map((industry, i) => (
            <StaggerItem as="li" key={industry.slug} className="border-t-2 border-ink">
              <Link href={`/industries/${industry.slug}`} className="group relative isolate grid gap-x-10 gap-y-3 overflow-hidden py-8 md:py-11 lg:grid-cols-12">
                <span aria-hidden="true" className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-paper-raised transition-transform duration-700 ease-expo group-hover:scale-y-100 group-focus-visible:scale-y-100" />
                <span className="type-label text-ink-faint lg:col-span-1 lg:pt-3">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="type-h2 transition-transform duration-700 ease-expo lg:col-span-5 lg:group-hover:translate-x-3">{industry.name}</h2>
                <span className="lg:col-span-5">
                  <span className="block font-display text-xl font-semibold leading-snug tracking-[-0.01em]">{industry.headline}</span>
                  <span className="mt-2 block text-[1.02rem] leading-relaxed text-ink-soft">{industry.summary}</span>
                </span>
                <span aria-hidden="true" className="hidden justify-self-end lg:col-span-1 lg:block lg:pt-2">
                  <ArrowUpRight className="size-7 transition-transform duration-500 ease-expo group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent-ink" strokeWidth={1.25} />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal className="mt-10 max-w-3xl border-l-4 border-accent bg-paper-raised p-6 md:p-8">
          <p className="leading-relaxed text-ink-soft">
            <strong className="font-semibold text-ink">A note on what this page claims.</strong> These pages describe how our services apply to
            each sector. They do not imply existing clients in a sector, industry certifications or specialist regulatory accreditation.
            Compliance requirements are identified and addressed project by project.
          </p>
        </Reveal>
      </section>

      <CtaBand title="Don’t see your *industry?*" body="The list is a guide, not a boundary. If your business has processes that could run better, we would like to hear about them." />
    </>
  );
}
