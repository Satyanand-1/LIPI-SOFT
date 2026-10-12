import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { ProcessTimeline } from "@/components/process/ProcessTimeline";
import { CtaBand, PageHero, SectionHeader } from "@/components/ui/primitives";
import { processSteps } from "@/content/process";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "How We Work",
  description:
    "The LIPI SOFT engagement process in six stages, from discovery and design through development, testing, deployment and ongoing support.",
  path: "/how-we-work",
});

const expectations = [
  { title: "A written scope", body: "You know what is included, what is not, and what it depends on, before work starts." },
  { title: "One point of contact", body: "A named person who knows your project and answers your questions." },
  { title: "Regular demonstrations", body: "Working results at the end of each cycle, not a reveal at the end." },
  { title: "Early warning", body: "If something affects cost, scope or timing, you hear about it when we do." },
];

export default function HowWeWorkPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "How We Work", path: "/how-we-work" }]}
        label="How We Work"
        title="Six stages. No *surprises.*"
        lead="Every engagement follows the same path, whether it lasts three weeks or a year. The stages scale with the work, but none of them is skipped."
      >
        <nav aria-label="Process stages">
          <ol className="flex flex-wrap gap-x-5 gap-y-1">
            {processSteps.map((s) => (
              <li key={s.index}>
                <a href={`#step-${s.index}`} className="link-draw inline-block py-2 text-[0.95rem] font-medium">
                  <span className="type-label mr-2 text-ink-faint">{s.index}</span>
                  {s.short}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </PageHero>

      <section className="shell pb-20 md:pb-28" aria-label="Engagement process">
        <div className="border-t border-line pt-12 md:pt-16">
          <ProcessTimeline />
        </div>
      </section>

      <section className="bg-paper-sunk" aria-labelledby="expect-heading">
        <div className="shell section-y">
          <SectionHeader
            id="expect-heading"
            label="Working with us"
            title="What you can expect *throughout.*"
            className="mb-10 md:mb-14"
          />
          <Stagger as="ul" className="grid border-l border-t border-line-strong sm:grid-cols-2 lg:grid-cols-4">
            {expectations.map((e) => (
              <StaggerItem as="li" key={e.title} className="border-b border-r border-line-strong p-6 lg:p-8">
                <span aria-hidden="true" className="block h-1 w-8 bg-accent" />
                <h3 className="mt-6 font-display text-xl font-semibold leading-tight tracking-[-0.015em]">{e.title}</h3>
                <p className="mt-3 text-[0.97rem] leading-relaxed text-ink-soft">{e.body}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal className="mt-10">
            <p className="max-w-2xl text-[0.97rem] leading-relaxed text-ink-soft">
              Timelines, pricing and support terms are specific to each project and are set out in a written proposal after discovery.
            </p>
          </Reveal>
        </div>
      </section>

      <CtaBand title="Start with a *conversation.*" body="Discovery begins with a simple call about the problem you want solved. There is no obligation, and you will leave with a clearer picture either way." secondary={{ label: "Read the FAQ", href: "/faq" }} />
    </>
  );
}
