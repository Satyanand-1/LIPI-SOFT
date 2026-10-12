export type Faq = { q: string; a: string; featured?: boolean };
export type FaqGroup = { id: string; title: string; items: Faq[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "services",
    title: "Services",
    items: [
      {
        q: "What does LIPI SOFT do?",
        a: "We design, build and support business technology: AI automation, custom software, CRM systems, and networking and IT infrastructure. Many projects combine more than one of these, because the problem rarely sits neatly inside a single discipline.",
        featured: true,
      },
      {
        q: "Do you only take on large projects?",
        a: "No. Some engagements are a single workflow or integration, others are complete systems. We would rather begin with a small, well-defined piece of work that proves its value than a large programme with vague goals.",
      },
      {
        q: "Can you work alongside our existing team or vendor?",
        a: "Yes. We can take responsibility for a whole project or for a defined part of one, and we are used to working with in-house staff and other suppliers. Responsibilities are written down at the start so nothing falls between teams.",
      },
    ],
  },
  {
    id: "engagement",
    title: "Project engagement",
    items: [
      {
        q: "How does a project start?",
        a: "With a conversation about the problem. If it looks like a fit, we run a discovery phase to understand your process, systems and constraints, then give you a written scope, approach and estimate before you commit to the build.",
        featured: true,
      },
      {
        q: "How involved do we need to be?",
        a: "Enough to keep the work pointed in the right direction. We need someone who can make decisions, access to the people who will use the system, and your attention at regular demonstrations. We keep those sessions short and focused.",
      },
      {
        q: "What if our requirements change part-way through?",
        a: "They usually do. Work is delivered in short cycles so that changes can be absorbed at the next planning point. If a change affects cost or timeline, we tell you before starting it.",
      },
    ],
  },
  {
    id: "timelines",
    title: "Timelines",
    items: [
      {
        q: "How long does a typical project take?",
        a: "It depends on scope, the number of systems involved and how quickly decisions can be made. We give a timeline with milestones after discovery, when it can be based on real information, and we do not quote durations before then.",
        featured: true,
      },
      {
        q: "Can you work to a fixed deadline?",
        a: "Often, yes. When a date is fixed we agree which parts of the scope are essential for that date and which can follow, so the deadline is met with something complete and usable.",
      },
    ],
  },
  {
    id: "pricing",
    title: "Pricing",
    items: [
      {
        q: "How do you price your work?",
        a: "Pricing follows the nature of the work. Well-defined projects can be quoted at a fixed price for an agreed scope. Open-ended or evolving work is usually better suited to time-based billing with regular reporting. We recommend a model after discovery and explain why.",
        featured: true,
      },
      {
        q: "Why is a budget range on the contact form?",
        a: "It is optional. A rough range helps us suggest an approach that fits, since the same problem can often be solved at different levels of investment. Leaving it blank does not affect how we respond.",
      },
      {
        q: "Are there ongoing costs after launch?",
        a: "Usually. Most systems have running costs such as hosting, licences or third-party services, and most benefit from a maintenance arrangement. We set these out before the project starts so there are no surprises.",
      },
    ],
  },
  {
    id: "support",
    title: "Support and maintenance",
    items: [
      {
        q: "Do you provide support after a project goes live?",
        a: "Yes. Support and maintenance arrangements are agreed per project and cover matters such as fixes, updates, monitoring and response expectations. The terms are written into the agreement instead of left to assumption.",
      },
      {
        q: "Can you maintain software or infrastructure you did not build?",
        a: "In many cases. We begin with an assessment to understand its condition and any risks, then tell you honestly whether it makes sense for us to take it on.",
      },
    ],
  },
  {
    id: "integrations",
    title: "Existing system integrations",
    items: [
      {
        q: "Will new systems work with the software we already use?",
        a: "Integration is a normal part of our work. If your existing software offers an API or another supported way to exchange data, we connect to it. If not, we look at alternatives such as file exchange or database-level integration and explain the trade-offs.",
        featured: true,
      },
      {
        q: "Do we have to replace our current systems?",
        a: "Not necessarily. Replacing a working system is expensive and disruptive, so we look first at whether it can be extended or connected. We recommend replacement only when the existing system is holding the business back.",
      },
    ],
  },
  {
    id: "ai",
    title: "AI automation",
    items: [
      {
        q: "Is AI automation reliable enough for business use?",
        a: "It can be, when designed with its limits in mind. AI models make mistakes, so we use them for the steps they suit, validate their output with rules, and keep people in the approval loop for anything consequential. We do not describe any automation as error-free.",
        featured: true,
      },
      {
        q: "What happens to our data when AI models are used?",
        a: "That depends on the model and provider chosen, and it is a design decision we make with you. Options range from commercial APIs with contractual data-handling terms to privately hosted models. We document where data goes before anything is built.",
      },
      {
        q: "How do we know if a process is a good candidate for automation?",
        a: "Good candidates are frequent, follow recognisable patterns and have a clear definition of a correct result. During discovery we look at volume, variability and the cost of errors to decide whether automation is worthwhile and how much human review it needs.",
      },
    ],
  },
  {
    id: "ownership",
    title: "Project ownership and handover",
    items: [
      {
        q: "Who owns the code and the work when the project is finished?",
        a: "Ownership is set out in the project agreement. Our standard intention is that you own the custom work you have paid for, and that you receive the source code, documentation and access you need to run it. Any third-party or open-source components keep their own licences, which we list for you.",
        featured: true,
      },
      {
        q: "What do we receive at handover?",
        a: "Source code, deployment and configuration details, credentials for accounts created on your behalf, technical documentation and user guidance. We also hold a handover session with the people who will run the system.",
      },
      {
        q: "Are we tied to LIPI SOFT afterwards?",
        a: "No. We build with widely used technologies and document our work so that another competent team could take it over. We would like to keep working with you because it goes well, not because you have no alternative.",
      },
    ],
  },
];

export const featuredFaqs: Faq[] = faqGroups.flatMap((g) => g.items.filter((i) => i.featured)).slice(0, 6);
