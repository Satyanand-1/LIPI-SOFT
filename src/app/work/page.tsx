import { Reveal } from "@/components/motion/Reveal";
import { CtaBand, PageHero } from "@/components/ui/primitives";
import { CaseList } from "@/components/work/CaseList";
import { caseStudies } from "@/content/work";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Work",
  description:
    "Demonstration projects showing how LIPI SOFT approaches AI automation, custom software, CRM and network infrastructure work, from challenge to implementation.",
  path: "/work",
});

export default function WorkPage() {
  const hasDemonstrations = caseStudies.some((c) => c.kind === "demonstration");
  const hasClientWork = caseStudies.some((c) => c.kind === "client");

  return (
    <>
      <PageHero
        crumbs={[{ name: "Our Work", path: "/work" }]}
        label="Our Work"
        title="Projects, and the *thinking* behind them."
        lead="Each project sets out the challenge, the requirements, how we would solve it and what we would measure."
      />

      <section className="shell pb-20 md:pb-28" aria-label="Projects">
        {hasDemonstrations ? (
          <Reveal className="mb-10 max-w-3xl border-l-4 border-accent bg-paper-raised p-6 md:p-8">
            <p className="leading-relaxed text-ink-soft">
              <strong className="font-semibold text-ink">About these projects.</strong> Projects marked “Demonstration project” are
              illustrative scenarios written to show our approach. They do not describe work done for a client, and they report no
              results.{" "}
              {hasClientWork
                ? "Projects marked “Client project” are real engagements published with the client’s approval."
                : "Real case studies will be published here, with verified outcomes, as clients approve them."}
            </p>
          </Reveal>
        ) : null}

        {caseStudies.length > 0 ? (
          <CaseList items={caseStudies} headingLevel="h2" />
        ) : (
          <div className="border border-dashed border-line-strong p-10 text-center">
            <h2 className="type-h3">Case studies are on their way</h2>
            <p className="mx-auto mt-3 max-w-md text-ink-soft">We publish project write-ups once clients have approved them. Check back soon.</p>
          </div>
        )}
      </section>

      <CtaBand title="Have a project of your *own?*" />
    </>
  );
}
