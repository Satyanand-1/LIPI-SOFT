import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { CtaBand, PageHero } from "@/components/ui/primitives";
import { articles, formatDate } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Insights",
  description: "Practical notes from LIPI SOFT on automation, custom software, CRM and running business technology well.",
  path: "/insights",
});

export default function InsightsPage() {
  const [lead, ...rest] = articles;

  return (
    <>
      <PageHero
        crumbs={[{ name: "Insights", path: "/insights" }]}
        label="Insights"
        title="Practical notes on making technology *work.*"
        lead="Short, plain-spoken articles for people deciding what to build, buy or automate."
      />

      <section className="shell pb-20 md:pb-28" aria-label="Articles">
        {!lead ? (
          <div className="border border-dashed border-line-strong p-10 text-center md:p-16">
            <h2 className="type-h3">Nothing published yet</h2>
            <p className="mx-auto mt-3 max-w-md text-ink-soft">We are working on our first articles. Please check back soon.</p>
          </div>
        ) : (
          <>
            <Link href={`/insights/${lead.slug}`} className="group grid gap-x-10 gap-y-6 border-t-2 border-ink py-10 lg:grid-cols-12 lg:py-14">
              <div className="lg:col-span-3">
                <p className="type-label text-accent-ink">{lead.topic}</p>
                <p className="type-label mt-2 text-ink-faint">
                  <time dateTime={lead.published}>{formatDate(lead.published)}</time> · {lead.readingMinutes} min read
                </p>
              </div>
              <div className="lg:col-span-8">
                <h2 className="type-h1 max-w-[18ch] transition-colors duration-300 group-hover:text-accent-ink">{lead.title}</h2>
                <p className="type-lead mt-6 max-w-2xl">{lead.excerpt}</p>
                <span className="mt-7 inline-flex items-center gap-2 font-semibold">
                  <span className="link-draw">Read article</span>
                  <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>

            {rest.length > 0 ? (
              <Stagger as="ul" className="grid border-l border-t border-line md:grid-cols-2">
                {rest.map((article) => (
                  <StaggerItem as="li" key={article.slug} className="border-b border-r border-line">
                    <Link href={`/insights/${article.slug}`} className="group flex h-full flex-col p-7 transition-colors duration-500 hover:bg-paper-raised md:p-10">
                      <p className="type-label text-accent-ink">{article.topic}</p>
                      <h2 className="type-h3 mt-5 max-w-[22ch] transition-colors group-hover:text-accent-ink">{article.title}</h2>
                      <p className="mt-3 leading-relaxed text-ink-soft">{article.excerpt}</p>
                      <p className="type-label mt-auto flex items-center justify-between gap-4 pt-8 text-ink-faint">
                        <span>
                          <time dateTime={article.published}>{formatDate(article.published)}</time> · {article.readingMinutes} min read
                        </span>
                        <ArrowUpRight aria-hidden="true" className="size-5 text-ink transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </p>
                    </Link>
                  </StaggerItem>
                ))}
              </Stagger>
            ) : null}
          </>
        )}
      </section>

      <CtaBand />
    </>
  );
}
