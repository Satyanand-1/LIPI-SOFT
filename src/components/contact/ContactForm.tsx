"use client";

import Link from "next/link";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Check, LoaderCircle, TriangleAlert } from "lucide-react";
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  budgetOptions,
  contactSchema,
  HONEYPOT_FIELD,
  serviceOptions,
  timelineOptions,
  toFieldErrors,
  type ContactField,
  type ContactResponse,
  type FieldErrors,
} from "@/lib/contact/schema";
import { cn } from "@/lib/cn";
import { EASE } from "@/components/motion/MotionProvider";

type Status = { state: "idle" } | { state: "submitting" } | { state: "success" } | { state: "error"; message: string; unconfigured?: boolean };

const FIELD_ORDER: ContactField[] = ["name", "email", "company", "phoneCode", "phone", "service", "budget", "timeline", "message", "consent"];
const DIAL_CODES = ["+1", "+44", "+91", "+61", "+65", "+971", "+49", "+33", "+81", "+86", "+27", "+234", "+55", "+52", "+966", "+974", "+60", "+62", "+63", "+94", "+880", "+977"];

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
  className,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-3 text-[0.92rem] font-semibold">
        <span>{label}</span>
        {optional ? <span className="type-label font-normal text-ink-faint">Optional</span> : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-2 text-[0.85rem] text-ink-faint">
          {hint}
        </p>
      ) : null}
      <FieldError id={`${id}-error`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message ? (
        <m.p
          id={id}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: EASE }}
          className="overflow-hidden text-[0.88rem] font-medium text-accent-ink"
        >
          <span className="flex items-start gap-1.5 pt-2">
            <TriangleAlert aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
            {message}
          </span>
        </m.p>
      ) : null}
    </AnimatePresence>
  );
}

export function ContactForm({ fallbackEmail }: { fallbackEmail: string | null }) {
  const uid = useId();
  const id = (name: string) => `${uid}-${name}`;
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const alertRef = useRef<HTMLDivElement>(null);
  const startedAt = useRef<number>(0);

  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [messageLength, setMessageLength] = useState(0);

  useEffect(() => {
    startedAt.current = Date.now();
    // Service links elsewhere on the site arrive as /contact?service=<slug>.
    // Applied after mount so the form itself can be statically rendered.
    const requested = new URLSearchParams(window.location.search).get("service") ?? "";
    const select = formRef.current?.querySelector<HTMLSelectElement>('select[name="service"]');
    if (select && select.value === "" && serviceOptions.some((o) => o.value === requested)) select.value = requested;
  }, []);

  useEffect(() => {
    if (status.state === "success") successRef.current?.focus();
    if (status.state === "error") alertRef.current?.focus();
  }, [status]);

  const focusFirstError = (fieldErrors: FieldErrors) => {
    const first = FIELD_ORDER.find((f) => fieldErrors[f]);
    if (first) formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
  };

  const clearError = (field: ContactField) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.state === "submitting") return;

    const data = new FormData(e.currentTarget);
    const text = (name: string) => String(data.get(name) ?? "");
    const values = {
      name: text("name"),
      email: text("email"),
      company: text("company"),
      phoneCode: text("phoneCode"),
      phone: text("phone"),
      service: text("service"),
      budget: text("budget"),
      timeline: text("timeline"),
      message: text("message"),
      consent: data.get("consent") === "on",
    };

    const parsed = contactSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors = toFieldErrors(parsed.error);
      setErrors(fieldErrors);
      setStatus({ state: "idle" });
      focusFirstError(fieldErrors);
      return;
    }

    setErrors({});
    setStatus({ state: "submitting" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, [HONEYPOT_FIELD]: text(HONEYPOT_FIELD), elapsedMs: Date.now() - startedAt.current }),
      });
      const body = (await res.json().catch(() => null)) as ContactResponse | null;

      // Success is shown only when the server confirms it accepted the message.
      if (res.ok && body?.ok) {
        setStatus({ state: "success" });
        return;
      }
      if (body && !body.ok) {
        if (body.code === "validation" && body.fieldErrors) {
          setErrors(body.fieldErrors);
          setStatus({ state: "idle" });
          focusFirstError(body.fieldErrors);
          return;
        }
        setStatus({ state: "error", message: body.message, unconfigured: body.code === "not_configured" });
        return;
      }
      setStatus({ state: "error", message: "Something went wrong while sending your message. Please try again." });
    } catch {
      setStatus({ state: "error", message: "We could not reach the server. Check your connection and try again." });
    }
  }

  if (status.state === "success") {
    return (
      <m.div
        ref={successRef}
        tabIndex={-1}
        role="status"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="border border-pine/40 bg-pine-soft p-8 outline-none md:p-12"
      >
        <span className="grid size-12 place-items-center bg-pine text-paper">
          <Check aria-hidden="true" className="size-6" strokeWidth={2.25} />
        </span>
        <h2 className="type-h2 mt-7">Message received.</h2>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-ink-soft">
          Thank you. Your enquiry has been delivered to our team, and we will reply to the email address you gave us.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/how-we-work" className="btn btn-primary">
            <span>See what happens next</span>
          </Link>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              startedAt.current = Date.now();
              setMessageLength(0);
              setStatus({ state: "idle" });
            }}
          >
            <span>Send another message</span>
          </button>
        </div>
      </m.div>
    );
  }

  const submitting = status.state === "submitting";
  const described = (name: ContactField, hasHint = false) =>
    errors[name] ? id(`${name}-error`) : hasHint ? id(`${name}-hint`) : undefined;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate aria-busy={submitting} aria-labelledby={id("title")}>
      <h2 id={id("title")} className="sr-only">
        Project enquiry form
      </h2>
      <p className="mb-8 text-[0.92rem] text-ink-faint">Fields are required unless marked optional.</p>

      <div className="grid gap-x-6 gap-y-7 sm:grid-cols-2">
        <Field id={id("name")} label="Name" error={errors.name}>
          <input id={id("name")} name="name" type="text" autoComplete="name" required maxLength={100} className="field" aria-invalid={Boolean(errors.name)} aria-describedby={described("name")} onChange={() => clearError("name")} />
        </Field>

        <Field id={id("email")} label="Business email" error={errors.email}>
          <input id={id("email")} name="email" type="email" inputMode="email" autoComplete="email" required maxLength={254} className="field" aria-invalid={Boolean(errors.email)} aria-describedby={described("email")} onChange={() => clearError("email")} />
        </Field>

        <Field id={id("company")} label="Company name" error={errors.company}>
          <input id={id("company")} name="company" type="text" autoComplete="organization" required maxLength={120} className="field" aria-invalid={Boolean(errors.company)} aria-describedby={described("company")} onChange={() => clearError("company")} />
        </Field>

        <fieldset>
          <legend className="mb-2 flex w-full items-baseline justify-between gap-3 text-[0.92rem] font-semibold">
            <span>Phone number</span>
            <span className="type-label font-normal text-ink-faint">Optional</span>
          </legend>
          <div className="grid grid-cols-[6.25rem_1fr] gap-2">
            <div>
              <label htmlFor={id("phoneCode")} className="sr-only">
                Country code
              </label>
              <input id={id("phoneCode")} name="phoneCode" type="text" inputMode="tel" autoComplete="tel-country-code" placeholder="+91" list={id("dial-codes")} maxLength={5} className="field" aria-invalid={Boolean(errors.phoneCode)} aria-describedby={described("phoneCode")} onChange={() => clearError("phoneCode")} />
              <datalist id={id("dial-codes")}>
                {DIAL_CODES.map((code) => (
                  <option key={code} value={code} />
                ))}
              </datalist>
            </div>
            <div>
              <label htmlFor={id("phone")} className="sr-only">
                Phone number without country code
              </label>
              <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel-national" maxLength={24} className="field" aria-invalid={Boolean(errors.phone)} aria-describedby={described("phone")} onChange={() => clearError("phone")} />
            </div>
          </div>
          <FieldError id={id("phoneCode-error")} message={errors.phoneCode} />
          <FieldError id={id("phone-error")} message={errors.phone} />
        </fieldset>

        <Field id={id("service")} label="Service of interest" error={errors.service} className="sm:col-span-2">
          <select id={id("service")} name="service" required defaultValue="" className="field" aria-invalid={Boolean(errors.service)} aria-describedby={described("service")} onChange={() => clearError("service")}>
            <option value="" disabled>
              Select a service
            </option>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id={id("budget")} label="Project budget range" optional error={errors.budget}>
          <select id={id("budget")} name="budget" defaultValue="" className="field" aria-invalid={Boolean(errors.budget)} aria-describedby={described("budget")} onChange={() => clearError("budget")}>
            <option value="">Prefer not to say</option>
            {budgetOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id={id("timeline")} label="Expected timeline" optional error={errors.timeline}>
          <select id={id("timeline")} name="timeline" defaultValue="" className="field" aria-invalid={Boolean(errors.timeline)} aria-describedby={described("timeline")} onChange={() => clearError("timeline")}>
            <option value="">Prefer not to say</option>
            {timelineOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>

        <Field id={id("message")} label="Project requirements or message" error={errors.message} hint="What are you trying to achieve, and what is in the way? Please do not include passwords or confidential data." className="sm:col-span-2">
          <textarea
            id={id("message")}
            name="message"
            required
            rows={7}
            maxLength={5000}
            className="field resize-y leading-relaxed"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={described("message", true)}
            onChange={(e) => {
              setMessageLength(e.target.value.length);
              clearError("message");
            }}
          />
          <p aria-hidden="true" className={cn("mt-1 text-right font-mono text-[0.72rem]", messageLength > 4800 ? "text-accent-ink" : "text-ink-faint")}>
            {messageLength.toLocaleString("en")} / 5,000
          </p>
        </Field>
      </div>

      {/* Honeypot: hidden from people and assistive technology; bots tend to fill it. */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 size-px overflow-hidden opacity-0 [clip-path:inset(50%)]">
        <label htmlFor={id("hp")}>Leave this field empty</label>
        <input id={id("hp")} name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="mt-8">
        <div className="flex items-start gap-3">
          <input
            id={id("consent")}
            name="consent"
            type="checkbox"
            required
            className="mt-0.5 size-5 shrink-0 cursor-pointer appearance-none border border-line-strong bg-paper-raised bg-center bg-no-repeat transition-colors checked:border-ink checked:bg-ink checked:bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2210%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M1%205l3.5%203.5L11%201.5%22%20stroke%3D%22%23f4f1ea%22%20stroke-width%3D%222%22%2F%3E%3C%2Fsvg%3E')] hover:border-ink aria-[invalid=true]:border-accent-ink"
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={described("consent")}
            onChange={() => clearError("consent")}
          />
          <label htmlFor={id("consent")} className="text-[0.95rem] leading-snug text-ink-soft">
            I agree to LIPI SOFT using the details above to respond to my enquiry, as described in the{" "}
            <Link href="/privacy-policy" className="link-inline font-medium text-ink">
              Privacy Policy
            </Link>
            .
          </label>
        </div>
        <FieldError id={id("consent-error")} message={errors.consent} />
      </div>

      <AnimatePresence initial={false}>
        {status.state === "error" ? (
          <m.div
            ref={alertRef}
            tabIndex={-1}
            role="alert"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-8 flex gap-3 border border-accent-ink/50 bg-accent-soft p-5 outline-none"
          >
            <TriangleAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-accent-ink" />
            <div className="text-[0.97rem] leading-relaxed">
              <p className="font-semibold">Your message was not sent.</p>
              <p className="mt-1 text-ink-soft">{status.message}</p>
              {status.unconfigured ? (
                <p className="mt-2 text-ink-soft">
                  {fallbackEmail ? (
                    <>
                      Please email us directly at{" "}
                      <a href={`mailto:${fallbackEmail}`} className="link-inline font-medium text-ink">
                        {fallbackEmail}
                      </a>{" "}
                      instead.
                    </>
                  ) : (
                    "We are sorry for the inconvenience. Please try again later."
                  )}
                </p>
              ) : null}
            </div>
          </m.div>
        ) : null}
      </AnimatePresence>

      <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="submit" disabled={submitting} className="btn btn-primary min-w-[12.5rem] disabled:opacity-80">
          {submitting ? (
            <>
              <LoaderCircle aria-hidden="true" className="size-4 animate-spin" />
              <span>Sending…</span>
            </>
          ) : (
            <span>Send enquiry</span>
          )}
        </button>
        <p aria-live="polite" className="text-[0.9rem] text-ink-faint">
          {submitting ? "Sending your message…" : Object.values(errors).some(Boolean) ? "Please correct the highlighted fields." : ""}
        </p>
      </div>
    </form>
  );
}
