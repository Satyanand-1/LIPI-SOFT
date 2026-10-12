import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero, RuleList, Tag } from "@/components/ui/primitives";
import { getJob, jobs } from "@/content/company";
import { pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

// Only roles listed in content/company.ts exist. With none open, every
// /careers/<slug> address correctly returns the 404 page.
export const dynamicParams = false;

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};
  return pageMetadata({ title: `${job.title} | Careers`, description: job.summary, path: `/careers/${job.slug}` });
}

export default async function JobPage({ params }: Params) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const groups = [
    { title: "What you will do", items: job.responsibilities },
    { title: "What we are looking for", items: job.requirements },
    ...(job.niceToHave?.length ? [{ title: "Nice to have", items: job.niceToHave }] : []),
  ];

  return (
    <>
      <PageHero
        crumbs={[
          { name: "Careers", path: "/careers" },
          { name: job.title, path: `/careers/${job.slug}` },
        ]}
        label={`Careers / ${job.team}`}
        title={job.title}
        lead={job.summary}
      >
        <div className="flex flex-wrap items-center gap-2">
          <Tag>{job.location}</Tag>
          <Tag>{job.type}</Tag>
        </div>
      </PageHero>

      <section className="shell pb-20 md:pb-28" aria-label="Role details">
        <div className="border-t border-line">
          {groups.map((group) => (
            <Reveal key={group.title} className="grid gap-x-10 gap-y-4 border-b border-line py-10 lg:grid-cols-12">
              <h2 className="type-h3 lg:col-span-4">{group.title}</h2>
              <RuleList items={group.items} className="lg:col-span-7 lg:col-start-6" />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12 flex flex-wrap items-center justify-between gap-6">
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-soft">
            To apply, send us a message that mentions this role, with a short note about your experience and a link to your CV or profile.
          </p>
          <ButtonLink href="/contact">Apply for this role</ButtonLink>
        </Reveal>
      </section>
    </>
  );
}
