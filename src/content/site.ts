/**
 * Single source of truth for company details.
 *
 * Anything set to `null` (or an empty array) is NOT rendered anywhere on the
 * site, so unconfirmed details never appear as fake information.
 * Fill these in as real information is confirmed.
 */

export type SocialLink = { label: string; href: string };

export const site = {
  name: "LIPI SOFT",
  shortName: "LIPI SOFT",
  tagline: "Technology, written for the way you work.",
  description:
    "LIPI SOFT designs and builds custom software, AI automation, CRM systems and connected infrastructure for businesses that want their technology to work together.",

  /** Canonical production origin. Set NEXT_PUBLIC_SITE_URL in the environment. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),

  contact: {
    /** Public enquiry address, e.g. "hello@yourdomain.com". */
    email: null as string | null,
    /** Display format with country code, e.g. "+91 00000 00000". */
    phone: null as string | null,
    /** Postal address lines. */
    address: null as string[] | null,
    /** e.g. "Monday to Friday, 9:30am – 6:30pm IST". */
    hours: null as string | null,
  },

  /** e.g. { label: "LinkedIn", href: "https://www.linkedin.com/company/..." } */
  social: [] as SocialLink[],

  legal: {
    /** Registered legal entity name. Shown as a highlighted placeholder until set. */
    entityName: null as string | null,
    /** Governing-law jurisdiction for the Terms. */
    jurisdiction: null as string | null,
    /** Address that privacy requests should be sent to. */
    privacyEmail: null as string | null,
    /** ISO date the legal pages take effect. */
    effectiveDate: null as string | null,
    /** Set to true once a qualified professional has reviewed the legal pages. */
    reviewed: false,
  },

  flags: {
    /**
     * While true, unconfirmed content carries a visible label ("Demonstration
     * project", "Portfolio to be confirmed", legal draft notices).
     * Individual items are controlled by their own `confirmed` fields; this
     * switch only exists to hide every label at once and should stay true
     * until the underlying content has actually been confirmed.
     */
    showDraftLabels: true,
  },
} as const;

/** Wraps a missing value so legal templates can render a visible placeholder. */
export function orPlaceholder(value: string | null | undefined, label: string): string {
  return value ?? `[${label}]`;
}
