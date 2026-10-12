import { z } from "zod";
import { services } from "@/content/services";

// Zod's fast path compiles validators with `new Function`, which this site's
// Content Security Policy forbids. Opt out so no CSP violation is ever logged.
z.config({ jitless: true });

/**
 * Contact form options and validation.
 * This schema is the single definition used by both the browser form and the
 * server endpoint, so the two can never drift apart.
 */

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.name })),
  { value: "not-sure", label: "Not sure yet" },
] as const;

/** Budget ranges are indicative. Currency and bands should be confirmed by the business. */
export const budgetOptions = [
  { value: "under-5k", label: "Under US$5,000" },
  { value: "5k-15k", label: "US$5,000 – 15,000" },
  { value: "15k-50k", label: "US$15,000 – 50,000" },
  { value: "over-50k", label: "Over US$50,000" },
  { value: "undecided", label: "Not decided yet" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3-months", label: "Within 1–3 months" },
  { value: "3-6-months", label: "Within 3–6 months" },
  { value: "exploring", label: "Just exploring" },
] as const;

const values = <T extends readonly { value: string }[]>(opts: T) => opts.map((o) => o.value) as [string, ...string[]];

const optionalChoice = (opts: readonly { value: string }[]) =>
  z
    .string()
    .trim()
    .refine((v) => v === "" || values(opts).includes(v), "Choose one of the listed options");

export const contactSchema = z
  .object({
    name: z.string().trim().min(2, "Enter your name").max(100, "Name is too long"),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .min(1, "Enter your business email")
      .max(254, "Email is too long")
      .pipe(z.email("Enter a valid email address")),
    company: z.string().trim().min(2, "Enter your company name").max(120, "Company name is too long"),
    phoneCode: z
      .string()
      .trim()
      .refine((v) => v === "" || /^\+\d{1,4}$/.test(v), "Use a code such as +91"),
    phone: z
      .string()
      .trim()
      .refine((v) => v === "" || (/^[\d\s().-]+$/.test(v) && v.replace(/\D/g, "").length >= 5 && v.replace(/\D/g, "").length <= 15), "Enter a valid phone number"),
    service: z.string().trim().refine((v) => values(serviceOptions).includes(v), "Choose a service"),
    budget: optionalChoice(budgetOptions),
    timeline: optionalChoice(timelineOptions),
    message: z
      .string()
      .trim()
      .min(20, "Tell us a little more (at least 20 characters)")
      .max(5000, "Message is too long (5,000 characters maximum)"),
    consent: z.boolean().refine((v) => v === true, "Please confirm you have read the Privacy Policy"),
  })
  .superRefine((data, ctx) => {
    if (data.phone !== "" && data.phoneCode === "") {
      ctx.addIssue({ code: "custom", path: ["phoneCode"], message: "Add a country code" });
    }
  });

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactField = keyof ContactInput;
export type FieldErrors = Partial<Record<ContactField, string>>;

/** Flattens Zod issues into one message per field. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const out: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !(key in out)) {
      out[key as ContactField] = issue.message;
    }
  }
  return out;
}

export function labelFor(opts: readonly { value: string; label: string }[], value: string): string {
  return opts.find((o) => o.value === value)?.label ?? "";
}

/** Shape of every response from POST /api/contact. */
export type ContactResponse =
  | { ok: true }
  | {
      ok: false;
      code: "validation" | "rate_limited" | "not_configured" | "delivery_failed" | "bad_request";
      message: string;
      fieldErrors?: FieldErrors;
    };

/** Bot heuristics sent alongside the form fields. */
export const MIN_FILL_MS = 2500;
export const HONEYPOT_FIELD = "website";
