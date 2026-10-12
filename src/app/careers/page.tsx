import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero, SectionHeader, Tag } from "@/components/ui/primitives";
import { jobs, workingHere } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Careers",
  description: "Careers at LIPI SOFT. See current openings in engineering, automation, CRM and infrastructure, or introduce yourself for future roles.",
  path: "/careers",
});

export default function CareersPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Careers", path: "/careers" }]}
        label="Careers"
        title="Do careful work on problems that *matter* to someone."
        lead="We are a technology company that cares about getting the ordinary things right. If that sounds like how you like to work, read on."
      />

      <section className="shell pb-20 md:pb-28" aria-labelledby="working-heading">
        <SectionHeader id="working-heading" label="Working here" title="What the work is like." className="mb-10 md:mb-14" />
        <Stagger as="ul" className="grid border-l border-t border-line md:grid-cols-3">
          {workingHere.map((item) => (
            <StaggerItem as="li" key={item.title} className="border-b border-r border-line p-7 md:p-9">
              <span aria-hidden="true" className="block h-1 w-8 bg-accent" />
              <h3 className="type-h3 mt-6">{item.title}</h3>
              <p className="mt-3 leading-relaxed text-ink-soft">{item.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <section className="bg-paper-sunk" aria-labelledby="roles-heading">
        <div className="shell section-y">
          <SectionHeader id="roles-heading" label="Open roles" title={jobs.length > 0 ? "Current opportunities." : "No open roles right now."} className="mb-10 md:mb-14" />

          {jobs.length > 0 ? (
            <Stagger as="ul" className="border-b border-line-strong">
              {jobs.map((job) => (
                <StaggerItem as="li" key={job.slug} className="border-t border-line-strong">
                  <Link href={`/careers/${job.slug}`} className="group grid gap-x-10 gap-y-3 py-7 lg:grid-cols-12 lg:py-9">
                    <h3 className="type-h3 transition-colors group-hover:text-accent-ink lg:col-span-5">{job.title}</h3>
                    <p className="text-ink-soft lg:col-span-4">{job.summary}</p>
                    <div className="flex flex-wrap items-center gap-2 lg:col-span-3 lg:justify-end">
                      <Tag>{job.location}</Tag>
                      <Tag>{job.type}</Tag>
                      <ArrowUpRight aria-hidden="true" className="ml-1 size-5 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </Link>
                </StaggerItem>
              ))}
            </Stagger>
          ) : (
            <Reveal className="grid gap-x-10 gap-y-6 border border-dashed border-line-strong bg-paper p-8 md:p-12 lg:grid-cols-12">
              <p className="font-display text-2xl font-semibold leading-tight tracking-[-0.02em] lg:col-span-5">
                We are not advertising any positions at the moment.
              </p>
              <div className="lg:col-span-6 lg:col-start-7">
                <p className="text-[1.02rem] leading-relaxed text-ink-soft">
                  Openings will be listed on this page when they arise. If you would like to introduce yourself in the meantime, send us a
                  note about what you do and the kind of work you are looking for.
                </p>
                <div className="mt-7">
                  <ButtonLink href="/contact" variant="secondary">
                    Introduce yourself
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
    </>
  );
}
