export type ProcessStep = {
  index: string;
  title: string;
  short: string;
  description: string;
  activities: string[];
  deliverables: string[];
  yourRole: string;
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Discovery and requirements",
    short: "Discover",
    description:
      "We start by understanding the business, the people who will use the system and the problem behind the request. The aim is a shared, written definition of what success looks like.",
    activities: ["Stakeholder conversations", "Review of current systems and data", "Process walkthroughs"],
    deliverables: ["Requirements summary", "Scope and priorities", "Known risks and open questions"],
    yourRole: "Give us access to the people who do the work and the systems they use today.",
  },
  {
    index: "02",
    title: "Solution design and planning",
    short: "Design",
    description:
      "We turn requirements into a concrete plan: how the system is structured, how it looks and behaves, how it connects to what you already have, and in what order it gets built.",
    activities: ["Architecture and data design", "Interface design and prototypes", "Estimation and scheduling"],
    deliverables: ["Solution design document", "Clickable prototype or wireframes", "Delivery plan with milestones"],
    yourRole: "Review the design and confirm it before development begins.",
  },
  {
    index: "03",
    title: "Development and implementation",
    short: "Build",
    description:
      "Work proceeds in short cycles with something to see at the end of each one. You get regular demonstrations, so changes in direction are caught early and cost little.",
    activities: ["Iterative development", "Integration with existing systems", "Regular progress demonstrations"],
    deliverables: ["Working increments", "Progress updates", "Updated backlog"],
    yourRole: "Attend demonstrations and tell us plainly what works and what doesn't.",
  },
  {
    index: "04",
    title: "Testing and quality assurance",
    short: "Test",
    description:
      "Testing runs throughout development and intensifies before release. We check that the system does what was agreed, behaves sensibly when things go wrong and holds up under realistic use.",
    activities: ["Automated and manual testing", "Security and performance checks", "User acceptance testing"],
    deliverables: ["Test results", "Resolved defect list", "Acceptance sign-off"],
    yourRole: "Run through real scenarios with your team during acceptance testing.",
  },
  {
    index: "05",
    title: "Deployment and handover",
    short: "Launch",
    description:
      "We release to production in a planned, reversible way, migrate any data and make sure your team can operate what has been built.",
    activities: ["Production release", "Data migration", "Training sessions"],
    deliverables: ["Live system", "Source code and credentials", "Technical and user documentation"],
    yourRole: "Nominate the people who will own and administer the system.",
  },
  {
    index: "06",
    title: "Ongoing support and optimization",
    short: "Support",
    description:
      "Software and infrastructure need attention after launch. We agree a support arrangement up front and use what we learn from real use to guide improvements.",
    activities: ["Monitoring and maintenance", "Fixes and updates", "Periodic reviews"],
    deliverables: ["Support arrangement", "Maintenance reports", "Improvement recommendations"],
    yourRole: "Share feedback from users so the next round of work targets real needs.",
  },
];
