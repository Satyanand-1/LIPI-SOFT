import Link from "next/link";
import { PageHero } from "@/components/ui/primitives";
import { routeGroups } from "@/lib/routes";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sitemap",
  description: "A complete list of pages on the LIPI SOFT website.",
  path: "/sitemap",
});

export default function SitemapPage() {
  return (
    <>
      <PageHero crumbs={[{ name: "Sitemap", path: "/sitemap" }]} label="Sitemap" title="Every page, in one place." />
      <section className="shell pb-20 md:pb-28" aria-label="All pages">
        <div className="grid gap-x-10 gap-y-12 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {routeGroups().map((group) => (
            <section key={group.title} aria-labelledby={`sitemap-${group.title.toLowerCase().replace(/\s+/g, "-")}`} className="rule-top pt-5">
              <h2 id={`sitemap-${group.title.toLowerCase().replace(/\s+/g, "-")}`} className="type-h3">
                {group.title}
              </h2>
              <ul className="mt-4">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="link-draw inline-block py-1.5 text-[0.98rem] text-ink-soft hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </>
  );
}
