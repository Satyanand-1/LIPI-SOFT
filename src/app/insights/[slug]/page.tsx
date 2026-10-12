import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Breadcrumbs, CtaBand, JsonLd } from "@/components/ui/primitives";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { articles, formatDate, getArticle } from "@/content/insights";
import { site } from "@/content/site";
import { absoluteUrl, pageMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/insights/${article.slug}`,
    type: "article",
    publishedTime: article.published,
  });
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const index = articles.findIndex((a) => a.slug === article.slug);
  const next = articles.length > 1 ? articles[(index + 1) % articles.length] : undefined;
  const path = `/insights/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.published,
    mainEntityOfPage: absoluteUrl(path),
    author: { "@type": "Organization", name: site.name, url: site.url },
    publisher: { "@type": "Organization", name: site.name, url: site.url },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <article>
        <header className="shell pb-10 pt-28 md:pb-14 md:pt-36">
          <div className="animate-fade-up">
            <Breadcrumbs
              crumbs={[
                { name: "Insights", path: "/insights" },
                { name: article.title, path },
              ]}
            />
          </div>
          <div className="rule-top mt-6 grid gap-x-10 gap-y-6 pt-6 lg:grid-cols-12">
            <div className="animate-fade-up lg:col-span-3">
              <p className="type-label text-accent-ink">{article.topic}</p>
              <p className="type-label mt-2 text-ink-faint">
                <time dateTime={article.published}>{formatDate(article.published)}</time>
              </p>
              <p className="type-label mt-2 text-ink-faint">{article.readingMinutes} min read</p>
            </div>
            <div className="lg:col-span-9">
              <SplitHeading as="h1" trigger="mount" text={article.title} className="type-h1 max-w-[18ch]" />
              <p className="type-lead mt-7 max-w-2xl animate-fade-up" style={{ animationDelay: "0.3s" }}>
                {article.excerpt}
              </p>
            </div>
          </div>
        </header>

        <div className="shell pb-20 md:pb-28">
          <div className="grid gap-x-10 border-t border-line pt-10 lg:grid-cols-12">
            <div className="prose-lipi max-w-[44rem] lg:col-span-8 lg:col-start-4">
              {article.body.map((block, i) => {
                if (block.type === "h2") return <h2 key={i}>{block.text}</h2>;
                if (block.type === "ul")
                  return (
                    <ul key={i}>
                      {block.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  );
                return <p key={i}>{block.text}</p>;
              })}
              <p className="!mt-12 border-t border-line pt-6 !text-[0.92rem] !text-ink-faint">Written by the {site.name} team.</p>
            </div>
          </div>
        </div>
      </article>

      <nav aria-label="More articles" className="shell pb-16 md:pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          <Link href="/insights" className="group border-t-2 border-ink pt-6">
            <span className="type-label block text-ink-faint">Back</span>
            <span className="mt-3 flex items-center gap-3">
              <ArrowLeft aria-hidden="true" className="size-6 shrink-0 transition-transform duration-500 ease-expo group-hover:-translate-x-1.5" strokeWidth={1.5} />
              <span className="type-h3 transition-colors group-hover:text-accent-ink">All insights</span>
            </span>
          </Link>
          {next ? (
            <Link href={`/insights/${next.slug}`} className="group border-t-2 border-ink pt-6">
              <span className="type-label block text-ink-faint">Next article</span>
              <span className="mt-3 flex items-end justify-between gap-4">
                <span className="type-h3 transition-colors group-hover:text-accent-ink">{next.title}</span>
                <ArrowRight aria-hidden="true" className="size-6 shrink-0 transition-transform duration-500 ease-expo group-hover:translate-x-1.5" strokeWidth={1.5} />
              </span>
            </Link>
          ) : null}
        </div>
      </nav>

      <CtaBand />
    </>
  );
}
