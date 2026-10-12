import "server-only";
import nodemailer from "nodemailer";
import { site } from "@/content/site";
import { budgetOptions, labelFor, serviceOptions, timelineOptions, type ContactInput } from "./schema";

/**
 * Delivers a validated contact submission.
 *
 * Channels are enabled purely by environment variables (see .env.example):
 *   - SMTP    : SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS (+ CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL)
 *   - Resend  : RESEND_API_KEY (+ CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL)
 *   - Webhook : CONTACT_WEBHOOK_URL (+ optional CONTACT_WEBHOOK_SECRET)
 *
 * Every configured channel is attempted. The submission counts as accepted
 * only if at least one channel confirms delivery. With nothing configured the
 * result is "not_configured" and the form tells the visitor plainly.
 */

export type DeliveryResult =
  | { ok: true; channels: string[] }
  | { ok: false; reason: "not_configured" | "failed" };

const TIMEOUT_MS = 10_000;

const env = (name: string): string | undefined => {
  const v = process.env[name]?.trim();
  return v ? v : undefined;
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Removes line breaks so user input can never inject email headers. */
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

function summarise(data: ContactInput) {
  const phone = data.phone ? `${data.phoneCode} ${data.phone}`.trim() : "";
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Email", data.email],
    ["Company", data.company],
    ["Phone", phone || "Not provided"],
    ["Service of interest", labelFor(serviceOptions, data.service)],
    ["Budget range", labelFor(budgetOptions, data.budget) || "Not provided"],
    ["Timeline", labelFor(timelineOptions, data.timeline) || "Not provided"],
  ];
  const subject = oneLine(`New enquiry from ${data.name} (${data.company})`).slice(0, 180);
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMessage:\n${data.message}\n\nSent from the ${site.name} website contact form.`;
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="color:#62666f;vertical-align:top">${escapeHtml(k)}</td><td>${escapeHtml(v)}</td></tr>`)
    .join("")}</table><p style="font-family:Arial,sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(data.message)}</p><p style="font-family:Arial,sans-serif;font-size:12px;color:#62666f">Sent from the ${escapeHtml(site.name)} website contact form.</p>`;
  return { subject, text, html, phone };
}

type Channel = { name: string; send: () => Promise<void> };

function configuredChannels(data: ContactInput): Channel[] {
  const channels: Channel[] = [];
  const { subject, text, html, phone } = summarise(data);
  const to = env("CONTACT_TO_EMAIL");
  const from = env("CONTACT_FROM_EMAIL");

  const smtpHost = env("SMTP_HOST");
  if (smtpHost && to && from) {
    channels.push({
      name: "smtp",
      send: async () => {
        const port = Number(env("SMTP_PORT") ?? 587);
        const user = env("SMTP_USER");
        const pass = env("SMTP_PASS");
        const transport = nodemailer.createTransport({
          host: smtpHost,
          port,
          secure: env("SMTP_SECURE") ? env("SMTP_SECURE") === "true" : port === 465,
          auth: user && pass ? { user, pass } : undefined,
          connectionTimeout: TIMEOUT_MS,
          socketTimeout: TIMEOUT_MS,
        });
        await transport.sendMail({ from, to, replyTo: data.email, subject, text, html });
      },
    });
  }

  const resendKey = env("RESEND_API_KEY");
  if (resendKey && to && from) {
    channels.push({
      name: "resend",
      send: async () => {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
          body: JSON.stringify({ from, to: [to], reply_to: data.email, subject, text, html }),
          signal: AbortSignal.timeout(TIMEOUT_MS),
        });
        if (!res.ok) throw new Error(`Resend responded with ${res.status}`);
      },
    });
  }

  const webhookUrl = env("CONTACT_WEBHOOK_URL");
  if (webhookUrl) {
    channels.push({
      name: "webhook",
      send: async () => {
        const secret = env("CONTACT_WEBHOOK_SECRET");
        const res = await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...(secret ? { "X-Webhook-Secret": secret } : {}) },
          body: JSON.stringify({
            source: "website-contact-form",
            submittedAt: new Date().toISOString(),
            name: data.name,
            email: data.email,
            company: data.company,
            phone: phone || null,
            service: data.service,
            serviceLabel: labelFor(serviceOptions, data.service),
            budget: data.budget || null,
            timeline: data.timeline || null,
            message: data.message,
          }),
          signal: AbortSignal.timeout(TIMEOUT_MS),
        });
        if (!res.ok) throw new Error(`Webhook responded with ${res.status}`);
      },
    });
  }

  return channels;
}

export async function deliverContact(data: ContactInput): Promise<DeliveryResult> {
  const channels = configuredChannels(data);
  if (channels.length === 0) return { ok: false, reason: "not_configured" };

  const settled = await Promise.allSettled(channels.map((c) => c.send()));
  const delivered: string[] = [];

  settled.forEach((result, i) => {
    const name = channels[i]?.name ?? "unknown";
    if (result.status === "fulfilled") {
      delivered.push(name);
    } else {
      // Log the channel and error message only; never the submission itself.
      const reason = result.reason instanceof Error ? result.reason.message : "unknown error";
      console.error(`[contact] delivery via ${name} failed: ${reason}`);
    }
  });

  return delivered.length > 0 ? { ok: true, channels: delivered } : { ok: false, reason: "failed" };
}
