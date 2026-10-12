import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { ButtonLink } from "@/components/ui/Button";
import { CtaBand, DraftTag, PageHero, SectionHeader } from "@/components/ui/primitives";
import { approach, engineering, milestones, mission, team, values, vision } from "@/content/company";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "LIPI SOFT is a technology company building practical software, AI automation, CRM and infrastructure. Our mission, values and approach to solving business problems.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "About", path: "/about" }]}
        label="About LIPI SOFT"
        title="We build technology that earns its place in the *working day.*"
        lead="LIPI SOFT is a software and technology solutions company. We help businesses run more smoothly by connecting their systems, automating repetitive work and building software around the way they operate."
      />

      {/* Introduction */}
      <section className="shell pb-20 md:pb-28" aria-label="Introduction">
        <div className="grid gap-x-10 gap-y-8 border-t border-line pt-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6 lg:col-start-4">
            <div className="space-y-5 text-[1.12rem] leading-relaxed text-ink-soft">
              <p>
                Technology projects tend to go wrong for ordinary reasons: the problem was never properly understood, the new system did
                not fit the old ones, or nobody planned for what happens after launch.
              </p>
              <p>
                We set up LIPI SOFT to work differently. We begin with how your business runs today, recommend only what will make a
                real difference, and stay involved once it is in use. Our work spans AI automation, custom software, CRM, and networking
                and IT infrastructure, because real business problems rarely respect the boundaries between them.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Mission and vision */}
      <section aria-label="Mission and vision" className="shell pb-20 md:pb-28">
        <div className="grid lg:grid-cols-2">
          <Reveal className="border border-line bg-paper-raised p-8 md:p-12">
            <p className="type-label text-accent-ink">Mission</p>
            <h2 className="sr-only">Our mission</h2>
            <p className="mt-6 font-display text-[clamp(1.35rem,1.1rem+1.1vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em]">{mission}</p>
          </Reveal>
          <Reveal delay={0.1} className="on-ink bg-ink p-8 text-paper md:p-12">
            <p className="type-label text-accent-bright">Vision</p>
            <h2 className="sr-only">Our vision</h2>
            <p className="mt-6 font-display text-[clamp(1.35rem,1.1rem+1.1vw,2rem)] font-medium leading-[1.2] tracking-[-0.02em]">{vision}</p>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="shell pb-20 md:pb-28" aria-labelledby="values-heading">
        <SectionHeader id="values-heading" label="Core values" title="What we hold ourselves to." className="mb-10 md:mb-14" />
        <Stagger as="ol" className="border-b border-line">
          {values.map((value, i) => (
            <StaggerItem as="li" key={value.title} className="grid gap-x-10 gap-y-3 border-t border-line py-7 lg:grid-cols-12 lg:py-9">
              <p className="type-label text-ink-faint lg:col-span-3 lg:pt-2">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="type-h3 lg:col-span-4">{value.title}</h3>
              <p className="text-[1.02rem] leading-relaxed text-ink-soft lg:col-span-5">{value.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Approach */}
      <section className="bg-paper-sunk" aria-labelledby="approach-heading">
        <div className="shell section-y">
          <div className="grid gap-x-10 gap-y-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="rule-top pt-6 lg:sticky lg:top-28">
                <p className="type-label text-ink-faint">Our approach</p>
                <SplitHeading id="approach-heading" text="How we solve business problems." className="type-h2 mt-5" />
              </div>
            </div>
            <Stagger as="ol" className="lg:col-span-7 lg:col-start-6">
              {approach.map((item, i) => (
                <StaggerItem as="li" key={item.title} className="grid grid-cols-[3rem_1fr] gap-x-4 border-t border-line-strong py-8 first:border-t-0 first:pt-0">
                  <span aria-hidden="true" className="font-display text-3xl font-semibold leading-none text-accent-ink">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="type-h3">{item.title}</h3>
                    <p className="mt-3 max-w-xl text-[1.02rem] leading-relaxed text-ink-soft">{item.body}</p>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>

      {/* Engineering philosophy */}
      <section className="shell section-y" aria-labelledby="engineering-heading">
        <SectionHeader
          id="engineering-heading"
          label="Engineering and delivery"
          title="Careful work, shown *early* and often."
          lead="Good engineering is mostly discipline: small steps, honest reviews and a habit of leaving things clearer than we found them."
          className="mb-12 md:mb-16"
        />
        <Stagger className="grid border-l border-line sm:grid-cols-2 lg:grid-cols-4">
          {engineering.map((item) => (
            <StaggerItem key={item.title} className="border-b border-r border-line p-6 first:border-t sm:[&:nth-child(-n+2)]:border-t lg:border-t lg:p-8">
              <span aria-hidden="true" className="block h-1 w-8 bg-ink" />
              <h3 className="mt-6 font-display text-xl font-semibold leading-tight tracking-[-0.015em]">{item.title}</h3>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-soft">{item.body}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Team: rendered from content/company.ts. Shows a labelled placeholder until profiles are supplied. */}
      {team.length > 0 ? (
        <section className="shell pb-20 md:pb-28" aria-labelledby="team-heading">
          <SectionHeader id="team-heading" label="Team" title="The people you will work with." className="mb-10 md:mb-14" />
          <Stagger as="ul" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((person) => (
              <StaggerItem as="li" key={person.name}>
                {person.photo ? (
                  <Image src={person.photo} alt={`Portrait of ${person.name}`} width={640} height={720} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw" className="aspect-[8/9] w-full bg-paper-sunk object-cover" />
                ) : (
                  <div aria-hidden="true" className="grid aspect-[8/9] w-full place-items-center bg-paper-sunk font-display text-6xl font-semibold text-ink/20">
                    {person.name.charAt(0)}
                  </div>
                )}
                <h3 className="type-h3 mt-5">{person.name}</h3>
                <p className="type-label mt-2 text-accent-ink">{person.role}</p>
                <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-soft">{person.bio}</p>
                {person.linkedin ? (
                  <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="link-inline mt-3 inline-block py-1 text-[0.95rem]">
                    LinkedIn<span className="sr-only"> profile of {person.name} (opens in a new tab)</span>
                  </a>
                ) : null}
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      ) : site.flags.showDraftLabels ? (
        <section className="shell pb-20 md:pb-28" aria-labelledby="team-heading">
          <div className="grid gap-x-10 gap-y-6 border border-dashed border-line-strong p-8 md:p-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <DraftTag>Awaiting content</DraftTag>
              <h2 id="team-heading" className="type-h3 mt-5">
                Team
              </h2>
            </div>
            <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-soft lg:col-span-8">
              Team profiles will appear here once they are supplied. We would rather leave this space empty than fill it with invented
              names and stock photographs.
            </p>
          </div>
        </section>
      ) : null}

      {/* Milestones: only rendered when real entries exist. */}
      {milestones.length > 0 ? (
        <section className="shell pb-20 md:pb-28" aria-labelledby="journey-heading">
          <SectionHeader id="journey-heading" label="Our journey" title="Milestones so far." className="mb-10 md:mb-14" />
          <Stagger as="ol" className="border-b border-line">
            {milestones.map((milestone) => (
              <StaggerItem as="li" key={`${milestone.year}-${milestone.title}`} className="grid gap-x-10 gap-y-2 border-t border-line py-7 lg:grid-cols-12">
                <p className="font-display text-3xl font-semibold text-accent-ink lg:col-span-3">{milestone.year}</p>
                <h3 className="type-h3 lg:col-span-4">{milestone.title}</h3>
                <p className="text-[1.02rem] leading-relaxed text-ink-soft lg:col-span-5">{milestone.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      ) : null}

      <section className="shell pb-20 md:pb-28" aria-label="Next steps">
        <Reveal className="flex flex-wrap items-center justify-between gap-6 border-t-2 border-ink pt-8">
          <p className="max-w-xl font-display text-2xl font-semibold leading-tight tracking-[-0.02em]">Want to see how this works in practice?</p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/how-we-work" variant="secondary">
              How we work
            </ButtonLink>
            <ButtonLink href="/services">Our services</ButtonLink>
          </div>
        </Reveal>
      </section>

      <CtaBand title="Let’s discuss your *project.*" />
    </>
  );
}
