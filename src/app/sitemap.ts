import type { MetadataRoute } from "next";
import { isIndexable, routeGroups } from "@/lib/routes";
import { absoluteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  for (const link of [...routeGroups().flatMap((g) => g.links), { label: "Sitemap", href: "/sitemap" }]) {
    if (seen.has(link.href) || !isIndexable(link.href)) continue;
    seen.add(link.href);
    const depth = link.href === "/" ? 0 : link.href.split("/").length - 1;
    entries.push({
      url: absoluteUrl(link.href),
      changeFrequency: depth <= 1 ? "monthly" : "yearly",
      priority: depth === 0 ? 1 : depth === 1 ? 0.8 : 0.6,
    });
  }

  return entries;
}
