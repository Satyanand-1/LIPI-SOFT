import { LegalDocument } from "@/components/legal/LegalDocument";
import { privacySections } from "@/content/legal";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: "How LIPI SOFT collects, uses and protects personal information submitted through this website, and the choices available to you.",
  path: "/privacy-policy",
  // Kept out of search results until the draft has been legally reviewed.
  noIndex: !site.legal.reviewed,
});

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      crumb={{ name: "Privacy Policy", path: "/privacy-policy" }}
      title="Privacy Policy"
      lead="What we collect through this website, why, and what you can ask us to do about it."
      sections={privacySections}
    />
  );
}
