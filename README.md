# LIPI SOFT website

Marketing website for LIPI SOFT: software development, AI automation, CRM, and networking and IT infrastructure.

Built with Next.js (App Router), TypeScript, Tailwind CSS v4 and Motion. Every page is statically generated; the only server code is the contact form endpoint.

## Requirements

- Node.js 20.9 or newer
- npm

## Commands

```bash
npm install          # install dependencies
npm run dev          # local development at http://localhost:3000
npm run build        # production build
npm run start        # serve the production build
npm run lint         # ESLint
npm run typecheck    # TypeScript, no emit
```

## Configuration

Copy `.env.example` to `.env.local` and fill it in. Nothing secret is ever sent to the browser; only `NEXT_PUBLIC_SITE_URL` is public.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes, in production | Public origin, no trailing slash. Drives canonical URLs, sitemap, robots.txt, structured data and social previews. It is read at build time, so rebuild after changing it. |
| `CONTACT_TO_EMAIL` | For email delivery | Inbox that receives enquiries. |
| `CONTACT_FROM_EMAIL` | For email delivery | Sender address. Must be on a domain your provider allows you to send from. |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_SECURE` | Option A | Send through any SMTP server. |
| `RESEND_API_KEY` | Option B | Send through the Resend HTTP API. |
| `CONTACT_WEBHOOK_URL`, `CONTACT_WEBHOOK_SECRET` | Option C | POST each enquiry as JSON to a CRM, automation tool or your own service. The secret is sent as the `X-Webhook-Secret` header. |

### Contact form

The form posts to `POST /api/contact` ([src/app/api/contact/route.ts](src/app/api/contact/route.ts)).

- Input is validated in the browser and again on the server with the same Zod schema ([src/lib/contact/schema.ts](src/lib/contact/schema.ts)).
- Delivery is handled in [src/lib/contact/delivery.ts](src/lib/contact/delivery.ts). Every configured channel is attempted; the submission counts as accepted only when at least one confirms.
- **If no channel is configured the endpoint returns 503 and the form tells the visitor their message was not sent.** It never shows a false success. Configure at least one channel before launch.
- Spam protection: a honeypot field, a minimum time-to-submit, a same-origin check, a request size limit, and an in-memory rate limit of 5 accepted submissions per 10 minutes per IP address.
- The rate limiter lives in process memory ([src/lib/contact/rate-limit.ts](src/lib/contact/rate-limit.ts)). On serverless or multi-instance hosting each instance counts separately. If the form attracts sustained abuse, add a shared store or a CAPTCHA such as Cloudflare Turnstile.
- Submissions are not stored by the website.

Webhook payload:

```json
{
  "source": "website-contact-form",
  "submittedAt": "2026-01-01T00:00:00.000Z",
  "name": "", "email": "", "company": "",
  "phone": "+91 98765 43210",
  "service": "crm-solutions", "serviceLabel": "CRM Solutions",
  "budget": "5k-15k", "timeline": "1-3-months",
  "message": ""
}
```

## Editing content

All copy and company details live in [src/content](src/content). Page components read from these files, so most updates need no changes elsewhere.

| File | Contains |
| --- | --- |
| [site.ts](src/content/site.ts) | Company name, contact details, social links, legal entity, draft-label switch. `null` and empty values are not rendered anywhere. |
| [services.ts](src/content/services.ts) | The five service categories and their capabilities. Set `confirmed: true` once an offering is confirmed. |
| [industries.ts](src/content/industries.ts) | Industry pages. |
| [work.ts](src/content/work.ts) | Case studies. `kind: "demonstration"` entries are always labelled as such. Use `kind: "client"` and fill `results` only for approved, verified work. |
| [process.ts](src/content/process.ts) | The six engagement stages. |
| [faqs.ts](src/content/faqs.ts) | FAQ groups. `featured: true` puts a question on the homepage. |
| [insights.ts](src/content/insights.ts) | Articles. `isPublished: false` hides one everywhere, including the sitemap. |
| [company.ts](src/content/company.ts) | Mission, vision, values, team, milestones, job openings. Team, milestones and jobs are empty until real entries are added. |
| [legal.ts](src/content/legal.ts) | Privacy Policy, Terms and Cookie Policy text. |
| [home.ts](src/content/home.ts) | Homepage statement, challenges, integration layers and reasons. |
| [navigation.ts](src/content/navigation.ts) | Header and footer links. |

Budget and timeline options for the form are in [src/lib/contact/schema.ts](src/lib/contact/schema.ts).

### Draft and placeholder labels

- Legal pages show a "Draft pending legal review" notice, highlight `[bracketed placeholders]`, and are `noindex` and left out of `sitemap.xml` until `site.legal.reviewed` is set to `true`.
- Services with `confirmed: false` carry a "Portfolio to be confirmed" label.
- The About page shows an "Awaiting content" block where team profiles will go.
- `site.flags.showDraftLabels = false` hides the last two kinds of label at once. Demonstration-project labels and the legal draft notice are not affected by that switch.

## Project structure

```
src/
  app/                    Routes (App Router)
    api/contact/          Contact form endpoint
    services/[slug]/      Service detail pages
    industries/[slug]/    Industry detail pages
    work/[slug]/          Case study pages
    insights/[slug]/      Article pages
    careers/[slug]/       Job pages (generated only for open roles)
    layout.tsx            Fonts, metadata defaults, header, footer
    template.tsx          Page entrance transition
    globals.css           Design tokens and base styles
    sitemap.ts robots.ts manifest.ts opengraph-image.tsx icon.svg
    not-found.tsx error.tsx global-error.tsx
  components/
    layout/               Header (dropdown, mobile menu), Footer
    home/                 Hero, hero illustration, homepage sections
    motion/               Motion provider, Reveal, SplitHeading
    ui/                   Button, Accordion, Logo, shared primitives
    visuals/              Service illustrations
    contact/ legal/ process/ work/
  content/                All editable copy and company data
  lib/                    SEO helpers, routes, contact schema and delivery
```

## Design system

Tokens are defined once in [src/app/globals.css](src/app/globals.css) under `@theme`: paper and ink neutrals, a single vermilion accent, and a pine green reserved for diagrams and confirmations. Type is Bricolage Grotesque (display), Hanken Grotesk (text) and JetBrains Mono (labels), self-hosted through `next/font`.

The recurring motif is a strong horizontal rule with content hanging from it. It appears in the logo, the hero diagram, section openers and the service illustrations.

Motion is split by job, to keep hydration light:

- **CSS animation** drives page entrance, headline reveals and scroll reveals. `Reveal`, `Stagger` and `SplitHeading` ([src/components/motion](src/components/motion)) only mark elements as in view, using one shared `IntersectionObserver`.
- **The `motion` package** (loaded through `LazyMotion`) drives the interactive pieces: the hero diagram, service illustrations, header dropdown and mobile menu, scroll-linked process rails, the service explorer and form feedback.

All motion respects `prefers-reduced-motion`, nothing hijacks scrolling, and content remains visible with JavaScript disabled.

## SEO

- Per-page titles, descriptions, canonical URLs, Open Graph and Twitter metadata via `pageMetadata()` in [src/lib/seo.ts](src/lib/seo.ts).
- `sitemap.xml`, `robots.txt` and a web manifest are generated from the content files.
- JSON-LD: Organization and WebSite site-wide, BreadcrumbList on inner pages, FAQPage on the FAQ, BlogPosting on articles.
- A social sharing image is generated at build time by [src/app/opengraph-image.tsx](src/app/opengraph-image.tsx).

## Security

- Security headers, including a Content Security Policy, are set in [next.config.ts](next.config.ts). The CSP allows no third-party origins. It includes `'unsafe-inline'` for scripts because Next.js needs it for hydration on statically rendered pages.
- No analytics, trackers or third-party scripts are loaded, and the site sets no cookies, so there is no cookie banner. If analytics are added later, build consent controls first and extend the CSP.

## Deployment

The site runs anywhere that supports Next.js with a Node.js server.

**Vercel or a similar platform:** import the repository, add the environment variables, deploy.

**Your own server:**

```bash
npm ci
npm run build
npm run start   # serves on port 3000; put a reverse proxy with HTTPS in front
```

The reverse proxy should pass the visitor's address in `X-Forwarded-For` so rate limiting works per visitor.

Before going live:

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain and rebuild.
2. Configure a contact delivery channel and send a test enquiry.
3. Fill in `src/content/site.ts`.
4. Have the legal pages reviewed, complete the placeholders, then set `site.legal.reviewed = true`.
5. Confirm the service portfolio and the copy that describes how the company works.
