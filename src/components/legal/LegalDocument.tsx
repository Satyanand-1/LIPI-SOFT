import type { ReactNode } from "react";
import { PageHero } from "@/components/ui/primitives";
import { effectiveDate, type LegalSection } from "@/content/legal";
import { site } from "@/content/site";
import type { Crumb } from "@/lib/seo";

/** Highlights [bracketed placeholders] so missing details are impossible to overlook. */
function withPlaceholders(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\])/g).map((part, i) =>
    part.startsWith("[") && part.endsWith("]") ? (
      <mark key={i} className="placeholder-mark">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

type Props = {
  crumb: Crumb;
  title: string;
  lead: string;
  sections: LegalSection[];
};

export function LegalDocument({ crumb, title, lead, sections }: Props) {
  return (
    <>
      <PageHero crumbs={[crumb]} label="Legal" title={title} lead={lead}>
        <p className="type-label text-ink-faint">Effective date: {withPlaceholders(effectiveDate)}</p>
      </PageHero>

      <div className="shell pb-20 md:pb-28">
        {!site.legal.reviewed ? (
          <div role="note" className="mb-12 max-w-3xl border-l-4 border-accent bg-accent-soft p-6 md:p-7">
            <p className="font-display text-lg font-semibold">Draft pending legal review</p>
            <p className="mt-2 text-[0.97rem] leading-relaxed text-ink-soft">
              This page is a working draft and has not been reviewed by a legal professional. It is not legal advice. Highlighted text in
              square brackets marks company-specific or jurisdiction-dependent details that must be confirmed before publication.
            </p>
          </div>
        ) : null}

        <div className="grid gap-x-12 gap-y-10 border-t border-line pt-10 lg:grid-cols-12">
          <nav aria-label="On this page" className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="type-label text-ink-faint">On this page</p>
              <ol className="mt-3">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a href={`#${s.id}`} className="group flex gap-3 py-1.5 text-[0.93rem] text-ink-soft transition-colors hover:text-ink">
                      <span className="font-mono text-[0.72rem] leading-6 text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                      <span className="link-draw">{s.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <article className="lg:col-span-8 lg:col-start-5">
            {sections.map((s, i) => (
              <section key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} className="prose-lipi scroll-mt-28 border-t border-line py-9 first:border-t-0 first:pt-0">
                <h2 id={`${s.id}-heading`} className="!mt-0">
                  <span className="mr-3 font-mono text-[0.8rem] font-normal tracking-wider text-accent-ink">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.paragraphs?.map((p) => <p key={p}>{withPlaceholders(p)}</p>)}
                {s.list ? (
                  <ul>
                    {s.list.map((item) => (
                      <li key={item}>{withPlaceholders(item)}</li>
                    ))}
                  </ul>
                ) : null}
                {s.after?.map((p) => <p key={p}>{withPlaceholders(p)}</p>)}
              </section>
            ))}
          </article>
        </div>
      </div>
    </>
  );
}
