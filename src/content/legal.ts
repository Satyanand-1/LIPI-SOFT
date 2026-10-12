import { site, orPlaceholder } from "./site";

/**
 * Legal page templates.
 *
 * IMPORTANT: this text is a structured starting draft, not legal advice. It
 * must be reviewed by a qualified professional for the jurisdictions LIPI SOFT
 * operates in before publication. Text in [square brackets] is rendered as a
 * highlighted placeholder and marks information that still has to be supplied.
 * After review, set `site.legal.reviewed = true` to remove the draft notice.
 */

export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  list?: string[];
  after?: string[];
};

const entity = orPlaceholder(site.legal.entityName, "Registered legal entity name");
const privacyEmail = orPlaceholder(site.legal.privacyEmail ?? site.contact.email, "Privacy contact email");
const contactEmail = orPlaceholder(site.contact.email, "Contact email");
const postal = site.contact.address ? site.contact.address.join(", ") : "[Registered postal address]";
const jurisdiction = orPlaceholder(site.legal.jurisdiction, "Governing jurisdiction");

export const effectiveDate = orPlaceholder(site.legal.effectiveDate, "Effective date");

export const privacySections: LegalSection[] = [
  {
    id: "who-we-are",
    title: "Who we are",
    paragraphs: [
      `This website is operated by ${entity} ("LIPI SOFT", "we", "us"). This policy explains what personal information we collect through this website, why we collect it and what choices you have.`,
      "It covers this website only. Information handled in the course of client projects is governed by the agreement for that project.",
    ],
  },
  {
    id: "information-collected",
    title: "Information we collect",
    paragraphs: ["We collect only the information needed to respond to you and to keep the website secure."],
    list: [
      "Information you give us: the details you enter in the contact form, described below.",
      "Technical information: our hosting provider may record standard server logs, such as IP address, browser type, pages requested and time of request. [Confirm with hosting provider what is logged and for how long.]",
      "Abuse prevention: when the contact form is submitted, the sender's IP address is held briefly in memory to limit repeated submissions. It is not written to a database by this website.",
    ],
  },
  {
    id: "purpose",
    title: "Why we collect it",
    list: [
      "To reply to enquiries and discuss potential work with you.",
      "To prepare proposals or quotations you have asked for.",
      "To protect the website against spam and misuse.",
      "To meet legal obligations that apply to us.",
    ],
    after: [
      "We do not sell personal information, and we do not use contact form submissions for marketing lists unless you have separately asked to receive updates.",
      "[Legal bases for processing, where applicable law requires them to be stated (for example consent, legitimate interests, steps prior to a contract), to be confirmed on legal review.]",
    ],
  },
  {
    id: "contact-form",
    title: "Contact form information",
    paragraphs: [
      "The contact form asks for your name, business email, company name and a description of what you need. You may also choose to give a phone number, a service of interest, a budget range and a timeline. Optional fields are clearly marked.",
      "When you submit the form, its contents are sent to our team by email or to our internal enquiry system so that we can respond. The website itself does not keep a database of submissions.",
      "Please do not include sensitive personal information, confidential business data or credentials in the message field.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and analytics",
    paragraphs: [
      "This website does not currently set cookies and does not use analytics, advertising or tracking technologies. No consent banner is shown because there is nothing non-essential to consent to.",
      "If this changes, we will update this policy and our Cookie Policy, and ask for your consent where the law requires it before any non-essential technology is loaded.",
    ],
  },
  {
    id: "processors",
    title: "Third-party processors",
    paragraphs: ["We rely on a small number of service providers to run this website and handle enquiries. They process information on our behalf and under our instructions."],
    list: [
      "Website hosting: [Hosting provider name and location].",
      "Email delivery for contact form submissions: [Email or messaging provider name and location].",
      "[Any further processors, such as a CRM or helpdesk used to manage enquiries.]",
    ],
    after: ["[If personal information is transferred to another country, describe the safeguards used. To be confirmed on legal review.]"],
  },
  {
    id: "retention",
    title: "Data retention",
    paragraphs: [
      "We keep enquiry information for as long as needed to deal with your request and any follow-up conversation, and afterwards only for as long as we have a legitimate business or legal reason to do so.",
      "[Specific retention periods for enquiries, proposals and server logs to be confirmed.]",
    ],
  },
  {
    id: "security",
    title: "Data security",
    paragraphs: [
      "We take reasonable technical and organisational measures to protect personal information, including encrypted connections to this website, restricted access to enquiry mailboxes and validation of submitted data.",
      "No method of transmission or storage is completely secure, and we cannot guarantee absolute security. If you believe your information has been compromised in connection with this website, please contact us.",
    ],
  },
  {
    id: "your-rights",
    title: "Your rights",
    paragraphs: ["Depending on where you live, you may have rights over your personal information, which can include the right to:"],
    list: [
      "ask what information we hold about you and receive a copy;",
      "ask us to correct information that is inaccurate;",
      "ask us to delete your information;",
      "object to or restrict certain uses of it;",
      "withdraw consent you have given;",
      "complain to the data protection authority in your country.",
    ],
    after: [
      "[The specific rights, response times and supervisory authority depend on the laws that apply to LIPI SOFT and its visitors (for example India's Digital Personal Data Protection Act, the EU or UK GDPR, or US state privacy laws). This section must be tailored on legal review.]",
    ],
  },
  {
    id: "privacy-contact",
    title: "Contact for privacy requests",
    paragraphs: [
      `To make a request or ask a question about this policy, contact us at ${privacyEmail} or write to ${entity}, ${postal}.`,
      "We may need to confirm your identity before acting on a request.",
    ],
  },
  {
    id: "updates",
    title: "Policy updates",
    paragraphs: [
      "We may update this policy when our practices or legal requirements change. The effective date at the top of the page shows when it was last revised. Significant changes will be made clear on this page.",
    ],
  },
];

export const termsSections: LegalSection[] = [
  {
    id: "about-these-terms",
    title: "About these terms",
    paragraphs: [
      `These terms apply to your use of this website, which is operated by ${entity} ("LIPI SOFT", "we", "us"). By using the website you agree to them. If you do not agree, please do not use the website.`,
      "These terms cover the website only. Any services we provide are governed by a separate written agreement between us and the client.",
    ],
  },
  {
    id: "website-use",
    title: "Website use",
    paragraphs: [
      "You may view and use this website for lawful purposes, including to learn about our services and to contact us. We may change, suspend or withdraw any part of the website without notice.",
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual property",
    paragraphs: [
      "Unless stated otherwise, the content of this website, including text, graphics, illustrations, logos and code, belongs to LIPI SOFT or its licensors and is protected by intellectual property laws.",
      "You may share links to the website and quote short passages with attribution. You may not copy, republish or exploit substantial parts of the content commercially without our written permission.",
      "[Trade mark status of the LIPI SOFT name and logo to be confirmed.]",
    ],
  },
  {
    id: "acceptable-use",
    title: "Acceptable use",
    paragraphs: ["When using this website you must not:"],
    list: [
      "break any applicable law or regulation;",
      "attempt to gain unauthorised access to the website, its server or any connected system;",
      "introduce malicious code or interfere with the website's operation;",
      "send unsolicited or automated messages through the contact form;",
      "scrape or harvest content or data in a way that burdens the website or infringes our rights.",
    ],
  },
  {
    id: "service-descriptions",
    title: "Service descriptions",
    paragraphs: [
      "The website describes the kinds of services we offer in general terms. Descriptions are for information only and are not an offer or a commitment to provide a particular service, result or timeline.",
      "Projects labelled as demonstrations are illustrative scenarios and do not describe work carried out for a client. The scope, deliverables, price and terms of any actual engagement are set out in a written agreement.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-party links",
    paragraphs: [
      "The website may link to sites we do not operate. We provide these links for convenience, do not control their content and are not responsible for them. Their own terms and privacy policies apply.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    paragraphs: [
      "We aim to keep the information on this website accurate and current, but it is provided on an \"as is\" basis without warranties of any kind, to the extent the law allows. Articles and guidance are general in nature and are not professional advice for your particular circumstances.",
      "We do not guarantee that the website will be uninterrupted, secure or free of errors.",
    ],
  },
  {
    id: "liability",
    title: "Limitation of liability",
    paragraphs: [
      "To the extent permitted by law, LIPI SOFT is not liable for any loss or damage arising from your use of, or inability to use, this website or from reliance on its content.",
      "Nothing in these terms excludes or limits liability that cannot be excluded or limited under applicable law.",
      "[The wording and extent of liability limitations depend on the governing law and must be confirmed on legal review.]",
    ],
  },
  {
    id: "governing-law",
    title: "Governing law and jurisdiction",
    paragraphs: [
      `These terms are governed by the laws of ${jurisdiction}. Disputes relating to the website are subject to the jurisdiction of the courts of ${jurisdiction}.`,
      "[Governing law, court venue and any dispute-resolution process to be confirmed on legal review.]",
    ],
  },
  {
    id: "changes",
    title: "Changes to these terms",
    paragraphs: ["We may revise these terms from time to time. The effective date at the top of the page shows the latest version. Continued use of the website after a change means you accept the revised terms."],
  },
  {
    id: "contact",
    title: "Contact information",
    paragraphs: [`Questions about these terms can be sent to ${contactEmail} or by post to ${entity}, ${postal}.`],
  },
];

export const cookieSections: LegalSection[] = [
  {
    id: "summary",
    title: "The short version",
    paragraphs: [
      "This website does not currently set any cookies, and it does not load analytics, advertising or social media tracking scripts. Because nothing non-essential is used, you will not see a cookie banner and there are no preferences to manage.",
    ],
  },
  {
    id: "what-are-cookies",
    title: "What cookies are",
    paragraphs: [
      "Cookies are small text files a website can store in your browser. Similar technologies include local storage and tracking pixels. They are commonly grouped as follows:",
    ],
    list: [
      "Strictly necessary: required for a site to function, such as keeping you signed in or remembering a security setting.",
      "Preferences: remember choices such as language or region.",
      "Analytics: measure how a site is used.",
      "Marketing: track visitors across sites to show relevant advertising.",
    ],
  },
  {
    id: "what-we-use",
    title: "What this website uses",
    list: [
      "Strictly necessary: none set by this website. [Confirm whether the hosting provider or a security service sets any, and list them here.]",
      "Preferences: none.",
      "Analytics: none.",
      "Marketing: none.",
    ],
    after: ["Fonts are served from this website's own domain, so loading a page does not send a request to a third-party font service."],
  },
  {
    id: "contact-form",
    title: "The contact form",
    paragraphs: [
      "Submitting the contact form does not set a cookie. The information you enter is sent to us so that we can reply, as described in our Privacy Policy.",
    ],
  },
  {
    id: "if-this-changes",
    title: "If this changes",
    paragraphs: [
      "If we introduce analytics or any other non-essential technology, we will update this page first, add a way for you to give, refuse and later withdraw consent, and make sure nothing non-essential loads until you have chosen.",
    ],
  },
  {
    id: "browser-controls",
    title: "Your browser controls",
    paragraphs: [
      "Whatever a website does, your browser lets you view, block and delete cookies. Look for the privacy or site-data section in its settings.",
    ],
  },
  {
    id: "contact",
    title: "Questions",
    paragraphs: [`If you have questions about this policy, contact us at ${privacyEmail}.`],
  },
];
