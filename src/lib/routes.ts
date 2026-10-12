import { jobs } from "@/content/company";
import { industries } from "@/content/industries";
import { articles } from "@/content/insights";
import { serviceHref, services } from "@/content/services";
import { site } from "@/content/site";
import { caseStudies } from "@/content/work";

export type RouteGroup = { title: string; links: { label: string; href: string }[] };

/** Every public page, grouped. Feeds both the HTML sitemap and sitemap.xml. */
export function routeGroups(): RouteGroup[] {
  const groups: RouteGroup[] = [
    {
      title: "Company",
      links: [
        { label: "Home", href: "/" },
        { label: "About", href: "/about" },
        { label: "How We Work", href: "/how-we-work" },
        { label: "Careers", href: "/careers" },
        ...jobs.map((j) => ({ label: j.title, href: `/careers/${j.slug}` })),
        { label: "FAQ", href: "/faq" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [{ label: "All services", href: "/services" }, ...services.map((s) => ({ label: s.name, href: serviceHref(s) }))],
    },
    {
      title: "Industries",
      links: [{ label: "All industries", href: "/industries" }, ...industries.map((i) => ({ label: i.name, href: `/industries/${i.slug}` }))],
    },
    {
      title: "Our Work",
      links: [{ label: "All projects", href: "/work" }, ...caseStudies.map((c) => ({ label: c.title, href: `/work/${c.slug}` }))],
    },
    {
      title: "Insights",
      links: [{ label: "All insights", href: "/insights" }, ...articles.map((a) => ({ label: a.title, href: `/insights/${a.slug}` }))],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms and Conditions", href: "/terms" },
        { label: "Cookie Policy", href: "/cookie-policy" },
      ],
    },
  ];
  return groups;
}

/** Paths excluded from sitemap.xml: draft legal pages are noindex until reviewed. */
export function isIndexable(href: string): boolean {
  const legal = ["/privacy-policy", "/terms", "/cookie-policy"];
  return site.legal.reviewed || !legal.includes(href);
}
