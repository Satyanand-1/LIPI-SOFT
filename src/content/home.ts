import type { ServiceId } from "./services";

export const statement =
  "Most businesses do not need more technology. They need the systems they already have to work together, the repetitive work to take care of itself, and software that fits the way they operate. That is the work we do.";

export const challenges: { quote: string; response: string; service: ServiceId; link: string }[] = [
  {
    quote: "We type the same information into three different systems.",
    response: "We connect those systems and automate the hand-offs, so data is entered once and arrives everywhere it is needed.",
    service: "ai",
    link: "See AI automation",
  },
  {
    quote: "Our software no longer fits the way we work.",
    response: "We build applications around your real process, or modernise the system you have in stages, without stopping the business.",
    service: "software",
    link: "See software development",
  },
  {
    quote: "Leads go cold because nobody follows up.",
    response: "We set up a CRM your team will use, with routing, reminders and a pipeline everyone can see.",
    service: "crm",
    link: "See CRM solutions",
  },
  {
    quote: "The network is slow and nobody can say why.",
    response: "We survey, redesign and monitor your infrastructure so problems are visible and connectivity is dependable.",
    service: "network",
    link: "See networking and IT",
  },
  {
    quote: "Everything we know lives in someone’s head or inbox.",
    response: "We build knowledge assistants that answer from your own documents, with sources shown and access permissions respected.",
    service: "ai",
    link: "See AI automation",
  },
];

/** Capability areas, described generically. Add named platforms only once confirmed. */
export const integrationLayers: { title: string; items: string[] }[] = [
  { title: "Interfaces", items: ["Web applications", "Customer portals", "Internal dashboards", "Mobile-friendly tools"] },
  { title: "Applications & APIs", items: ["REST APIs", "Webhooks and events", "Authentication", "Background jobs"] },
  { title: "Data", items: ["Relational databases", "Document search", "Reporting", "Data migration"] },
  { title: "AI", items: ["Language model APIs", "Document extraction", "Retrieval (RAG)", "Human review queues"] },
  { title: "Business systems", items: ["CRM platforms", "Accounting and ERP", "Email and telephony", "E-commerce"] },
  { title: "Infrastructure", items: ["Cloud hosting", "On-premises servers", "Networks and VPN", "Monitoring"] },
];

export const reasons: { title: string; body: string }[] = [
  {
    title: "We tell you what we would actually do",
    body: "Including when the answer is a simpler tool, a smaller project, or nothing at all. You get a recommendation, not a sales pitch.",
  },
  {
    title: "One team across the stack",
    body: "Software, automation, CRM and infrastructure are planned together, so you are not left coordinating between suppliers.",
  },
  {
    title: "People stay in the loop",
    body: "We design automation with review steps and clear logs. Your team keeps control of the decisions that matter.",
  },
  {
    title: "Built to be yours",
    body: "You receive the source code, documentation and access. The system is built so another team could run it.",
  },
];
