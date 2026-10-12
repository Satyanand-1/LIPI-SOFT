import type { ServiceId } from "./services";

export type Industry = {
  slug: string;
  name: string;
  headline: string;
  summary: string;
  context: string;
  challenges: { title: string; body: string }[];
  help: { title: string; body: string; service: ServiceId }[];
  /** Honest statement of what is and is not being claimed for this sector. */
  consideration: string;
};

export const industries: Industry[] = [
  {
    slug: "healthcare",
    name: "Healthcare",
    headline: "Less administration around the work of caring for people.",
    summary: "Scheduling, records workflows and internal tools for clinics, practices and healthcare service providers.",
    context:
      "Healthcare organisations carry a heavy administrative load: appointments, records, billing and coordination between departments. Technology should lighten that load without getting between staff and patients.",
    challenges: [
      { title: "Paper and manual entry", body: "Forms and referrals re-typed into several systems, with every re-entry a chance for error." },
      { title: "Disconnected systems", body: "Scheduling, billing and records held in tools that do not share information." },
      { title: "Sensitive data", body: "Personal health information that demands careful access control and handling." },
    ],
    help: [
      { title: "Document intake workflows", body: "Extracting details from forms and referrals, with staff review before anything is filed.", service: "ai" },
      { title: "Scheduling and operations tools", body: "Custom applications for appointments, rosters and internal coordination.", service: "software" },
      { title: "Reliable, segmented networks", body: "Infrastructure that keeps clinical and guest traffic apart and stays available.", service: "network" },
    ],
    consideration:
      "Healthcare is closely regulated, and the rules differ by country and by type of provider. We identify the requirements that apply to your project during discovery and design to them with your compliance advisers. LIPI SOFT does not claim any healthcare-specific certification on this site.",
  },
  {
    slug: "financial-services",
    name: "Financial Services",
    headline: "Careful automation for work where accuracy is the whole point.",
    summary: "Document processing, client workflows and internal systems for advisers, lenders, insurers and finance teams.",
    context:
      "Financial work is document-heavy and review-heavy. The opportunity is rarely to remove people from the loop. It is to give them prepared, checked information so their time goes on decisions.",
    challenges: [
      { title: "High document volume", body: "Applications, statements and supporting documents that must be read, checked and recorded." },
      { title: "Review and approval chains", body: "Multi-step sign-offs tracked by email and spreadsheet." },
      { title: "Audit expectations", body: "A need to show who did what, when and on what basis." },
    ],
    help: [
      { title: "Document processing with review", body: "Extraction and validation pipelines that route exceptions to a person.", service: "ai" },
      { title: "Client lifecycle management", body: "CRM workflows for onboarding, renewals and periodic reviews.", service: "crm" },
      { title: "Workflow applications", body: "Custom systems with approval steps and a complete activity history.", service: "software" },
    ],
    consideration:
      "Financial services are subject to regulatory, security and record-keeping obligations that vary by jurisdiction and licence type. We work to the requirements you and your advisers specify. LIPI SOFT does not claim regulatory accreditation or compliance certification on this site.",
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    headline: "Orders, stock and customers, seen in one place.",
    summary: "Order operations, inventory integrations and customer systems for shops selling online, in store or both.",
    context:
      "Retail runs on many small transactions across channels. When the storefront, stock system and accounts disagree, customers feel it first.",
    challenges: [
      { title: "Channel sprawl", body: "Orders arriving from a website, marketplaces and physical stores, each with its own back office." },
      { title: "Stock accuracy", body: "Inventory figures that drift between systems and lead to overselling." },
      { title: "Repeat custom", body: "Little visibility of who your customers are once the sale is complete." },
    ],
    help: [
      { title: "Order and inventory integration", body: "Connecting storefronts, stock and accounting so figures agree.", service: "software" },
      { title: "Customer and loyalty workflows", body: "A CRM view of purchase history with timely, relevant follow-up.", service: "crm" },
      { title: "Support automation", body: "Assistants that answer order questions from your own data and hand over to staff when needed.", service: "ai" },
    ],
    consideration:
      "Payment handling and consumer-protection rules apply to most retail systems. We typically integrate established payment providers instead of handling card data directly, and confirm the requirements for your market during discovery.",
  },
  {
    slug: "manufacturing-logistics",
    name: "Manufacturing & Logistics",
    headline: "Clear information from the shop floor to the dispatch bay.",
    summary: "Operational software, tracking tools and site infrastructure for producers, warehouses and distributors.",
    context:
      "Physical operations generate a great deal of information, such as orders, batches, movements and exceptions, and much of it is still recorded on paper or in isolated spreadsheets.",
    challenges: [
      { title: "Limited visibility", body: "Difficulty answering simple questions about order status, stock or capacity without phoning someone." },
      { title: "Paper-based tracking", body: "Job sheets, delivery notes and checklists that are filled in by hand and filed." },
      { title: "Connectivity on site", body: "Warehouses and plants where wireless coverage and network reliability are an afterthought." },
    ],
    help: [
      { title: "Operations and tracking systems", body: "Applications for orders, jobs, stock movement and dispatch.", service: "software" },
      { title: "Site networks", body: "Wired and wireless coverage designed for large, awkward spaces.", service: "network" },
      { title: "Paperwork automation", body: "Reading delivery notes, purchase orders and invoices into your systems.", service: "ai" },
    ],
    consideration:
      "Integration with specific machinery, control systems or ERP platforms depends on what those systems expose. We assess feasibility for your equipment before committing to an approach.",
  },
  {
    slug: "professional-services",
    name: "Professional Services",
    headline: "More of the working week on client work.",
    summary: "Client management, knowledge tools and workflow automation for consultancies, agencies, legal and accounting firms.",
    context:
      "Professional firms sell expertise and time. Hours lost to administration, searching for past work and chasing information are hours that cannot be billed or spent on clients.",
    challenges: [
      { title: "Knowledge locked in files", body: "Past work and precedents that are hard to find when they are needed." },
      { title: "Manual client administration", body: "Onboarding, engagement paperwork and follow-ups handled case by case." },
      { title: "Uneven pipeline", body: "Enquiries and referrals tracked informally, with no shared view." },
    ],
    help: [
      { title: "Internal knowledge assistants", body: "Search and question answering across your own documents, respecting access permissions.", service: "ai" },
      { title: "CRM for client relationships", body: "Enquiries, engagements and follow-ups organised in one system.", service: "crm" },
      { title: "Client portals and internal tools", body: "Secure places to exchange documents and track engagement status.", service: "software" },
    ],
    consideration:
      "Client confidentiality and professional conduct rules shape how these systems must handle data. We design access controls and data handling around the obligations you identify.",
  },
  {
    slug: "startups-growing-businesses",
    name: "Startups & Growing Businesses",
    headline: "A first version worth building on, and systems that keep pace with growth.",
    summary: "Product development, foundational systems and practical automation for young and fast-growing companies.",
    context:
      "Early-stage companies need to learn quickly without building something they will have to throw away. Growing companies find that what worked for ten people breaks at fifty.",
    challenges: [
      { title: "Limited runway", body: "Pressure to ship a usable product without over-engineering it." },
      { title: "Outgrown tools", body: "Spreadsheets and ad-hoc processes that no longer cope with volume." },
      { title: "No in-house IT", body: "Nobody whose job it is to look after systems and infrastructure." },
    ],
    help: [
      { title: "Product and MVP development", body: "A focused first release on foundations that can carry later growth.", service: "software" },
      { title: "Early CRM and sales process", body: "A simple pipeline set up properly before bad habits form.", service: "crm" },
      { title: "Infrastructure essentials", body: "Sensible network, access and backup arrangements for a growing team.", service: "network" },
    ],
    consideration:
      "We scope early-stage work to what the business needs now, and say so when a simpler or existing tool would serve better than custom development.",
  },
];

export function getIndustry(slug: string): Industry | undefined {
  return industries.find((i) => i.slug === slug);
}
