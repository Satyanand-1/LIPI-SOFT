import { services, serviceHref } from "./services";

export type NavItem = { label: string; href: string; children?: { label: string; href: string; description?: string }[] };

export const primaryNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({ label: s.name, href: serviceHref(s), description: s.summary })),
  },
  { label: "Industries", href: "/industries" },
  { label: "Our Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = {
  services: services.map((s) => ({ label: s.name, href: serviceHref(s) })),
  company: [
    { label: "About", href: "/about" },
    { label: "How We Work", href: "/how-we-work" },
    { label: "Industries", href: "/industries" },
    { label: "Our Work", href: "/work" },
    { label: "Insights", href: "/insights" },
    { label: "Careers", href: "/careers" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Sitemap", href: "/sitemap" },
  ],
};
