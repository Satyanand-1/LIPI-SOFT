import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMeta = {
  title: string;
  description: string;
  /** Path beginning with "/", used for the canonical URL. */
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

export function absoluteUrl(path = "/"): string {
  return `${site.url}${path === "/" ? "" : path}`;
}

/** Builds consistent per-page metadata: title, canonical, Open Graph, Twitter. */
export function pageMetadata({ title, description, path, type = "website", publishedTime, noIndex }: PageMeta): Metadata {
  const fullTitle = path === "/" ? title : `${title} | ${site.name}`;
  return {
    title: path === "/" ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    robots: noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      locale: "en",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: `${site.name}: ${site.tagline}` }],
      ...(type === "article" && publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: ["/opengraph-image"],
    },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: absoluteUrl("/icon.svg"),
    description: site.description,
    ...(site.contact.email ? { email: site.contact.email } : {}),
    ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
    ...(site.social.length ? { sameAs: site.social.map((s) => s.href) } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    description: site.description,
    inLanguage: "en",
  };
}
