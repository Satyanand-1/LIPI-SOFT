import { NextResponse, type NextRequest } from "next/server";
import { deliverContact } from "@/lib/contact/delivery";
import { rateLimit } from "@/lib/contact/rate-limit";
import { contactSchema, toFieldErrors, HONEYPOT_FIELD, MIN_FILL_MS, type ContactResponse } from "@/lib/contact/schema";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 20_000;

const json = (body: ContactResponse, status: number, headers?: Record<string, string>) =>
  NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });

function clientKey(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || req.headers.get("x-real-ip") || "unknown";
}

/** Rejects cross-site posts: when an Origin header is sent it must match this host. */
function sameOrigin(req: NextRequest): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return true;
  const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  const badRequest = (message = "The request could not be processed.") => json({ ok: false, code: "bad_request", message }, 400);

  if (!sameOrigin(req)) return badRequest();
  if (!req.headers.get("content-type")?.includes("application/json")) return badRequest();

  let raw: string;
  try {
    raw = await req.text();
  } catch {
    return badRequest();
  }
  if (raw.length > MAX_BODY_BYTES) return badRequest("The message is too large.");

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return badRequest();
  }
  if (typeof body !== "object" || body === null || Array.isArray(body)) return badRequest();
  const payload = body as Record<string, unknown>;

  // Spam heuristics: a hidden field real visitors never fill, and a minimum
  // time on the form. Rejected plainly; success is never faked.
  const honeypot = payload[HONEYPOT_FIELD];
  const elapsed = typeof payload.elapsedMs === "number" ? payload.elapsedMs : 0;
  if ((typeof honeypot === "string" && honeypot.trim() !== "") || elapsed < MIN_FILL_MS) {
    return badRequest("Your message could not be verified. Please wait a moment and try again.");
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json(
      { ok: false, code: "validation", message: "Please check the highlighted fields.", fieldErrors: toFieldErrors(parsed.error) },
      422,
    );
  }

  // Only well-formed submissions count towards the limit, so a visitor who
  // corrects a validation error is not locked out.
  const limit = rateLimit(clientKey(req));
  if (!limit.allowed) {
    return json(
      { ok: false, code: "rate_limited", message: "Too many messages have been sent from this connection. Please try again in a few minutes." },
      429,
      { "Retry-After": String(limit.retryAfterSeconds) },
    );
  }

  const result = await deliverContact(parsed.data);

  if (result.ok) return json({ ok: true }, 200);

  if (result.reason === "not_configured") {
    console.warn("[contact] submission received but no delivery channel is configured. See .env.example.");
    return json(
      { ok: false, code: "not_configured", message: "This form is not connected to our inbox yet, so your message was not sent." },
      503,
    );
  }

  return json(
    { ok: false, code: "delivery_failed", message: "We could not deliver your message just now. Please try again shortly." },
    502,
  );
}
