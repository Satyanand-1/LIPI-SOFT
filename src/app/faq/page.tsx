import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { CtaBand, JsonLd, PageHero } from "@/components/ui/primitives";
import { faqGroups } from "@/content/faqs";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Frequently Asked Questions",
  description:
    "Answers about LIPI SOFT services, how projects start, timelines, pricing, support, system integrations, AI automation, and ownership of the finished work.",
  path: "/faq",
});

export default function FaqPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqGroups.flatMap((g) =>
      g.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    ),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />
      <PageHero
        crumbs={[{ name: "FAQ", path: "/faq" }]}
        label="Frequently asked questions"
        title="Plain answers to *common* questions."
        lead="If yours is not here, ask us directly. We would rather answer a question than leave you guessing."
      />

      <section className="shell pb-20 md:pb-28" aria-label="Questions by topic">
        <div className="grid gap-x-12 gap-y-10 border-t border-line pt-10 lg:grid-cols-12">
          <nav aria-label="FAQ topics" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="type-label text-ink-faint">Topics</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 lg:block">
                {faqGroups.map((g) => (
                  <li key={g.id}>
                    <a href={`#${g.id}`} className="link-draw inline-block py-2 text-[0.97rem] font-medium">
                      {g.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="space-y-16 lg:col-span-8 lg:col-start-5">
            {faqGroups.map((group) => (
              <Reveal key={group.id}>
                <section id={group.id} aria-labelledby={`${group.id}-heading`} className="scroll-mt-28">
                  <h2 id={`${group.id}-heading`} className="type-h3 mb-5">
                    {group.title}
                  </h2>
                  <Accordion items={group.items} headingLevel="h3" />
                </section>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Still have a *question?*" body="Send it over. A real person will read it and reply." primary={{ label: "Ask us", href: "/contact" }} />
    </>
  );
}
