import { LegalDocument } from "@/components/legal/LegalDocument";
import { cookieSections } from "@/content/legal";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cookie Policy",
  description: "The LIPI SOFT website does not currently set cookies or use tracking technologies. This page explains what that means and what happens if it changes.",
  path: "/cookie-policy",
  // Kept out of search results until the draft has been legally reviewed.
  noIndex: !site.legal.reviewed,
});

/**
 * No consent banner or preference centre is shipped because the site loads no
 * non-essential cookies or trackers. If analytics are ever added, build the
 * consent controls first and gate the scripts behind them.
 */
export default function CookiePolicyPage() {
  return (
    <LegalDocument
      crumb={{ name: "Cookie Policy", path: "/cookie-policy" }}
      title="Cookie Policy"
      lead="This website sets no cookies and runs no trackers. Here is the detail."
      sections={cookieSections}
    />
  );
}
