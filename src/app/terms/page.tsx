import { LegalDocument } from "@/components/legal/LegalDocument";
import { termsSections } from "@/content/legal";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Terms and Conditions",
  description: "The terms that apply to your use of the LIPI SOFT website, including acceptable use, intellectual property and limitations of liability.",
  path: "/terms",
  // Kept out of search results until the draft has been legally reviewed.
  noIndex: !site.legal.reviewed,
});

export default function TermsPage() {
  return (
    <LegalDocument
      crumb={{ name: "Terms and Conditions", path: "/terms" }}
      title="Terms and Conditions"
      lead="The rules for using this website. Client work is covered by separate written agreements."
      sections={termsSections}
    />
  );
}
