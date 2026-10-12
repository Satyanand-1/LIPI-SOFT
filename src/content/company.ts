/**
 * About-page content, team profiles, milestones and careers.
 * Empty arrays hide the corresponding section on the public site.
 */

export const mission =
  "To build practical technology that removes friction from everyday work, so the people in a business can spend their time on what they are good at.";

export const vision =
  "A working world in which business systems are understandable, connected and dependable, and where adopting new technology feels like relief, not disruption.";

export const values = [
  {
    title: "Clarity before code",
    body: "We make sure we understand the problem, and can explain it back to you, before we propose anything. A clear brief is the cheapest part of a project to get right.",
  },
  {
    title: "Honest scope",
    body: "We say what we will do, what we will not, and what we do not know yet. If a simpler or cheaper route exists, including one that does not involve us, we point to it.",
  },
  {
    title: "Built to be handed over",
    body: "We document as we go and choose widely used technologies, so the system can be run and extended by your team or anyone you appoint.",
  },
  {
    title: "People stay in charge",
    body: "Automation should support judgement, not replace accountability. We design systems so that a person can always see what happened and step in.",
  },
  {
    title: "Steady, visible progress",
    body: "We work in short cycles and show real results at the end of each. You should never have to wonder what is being done or how far along it is.",
  },
];

export const approach = [
  {
    title: "Start with the work, not the tool",
    body: "We watch how the process runs today and talk to the people doing it. Technology choices come after that, and follow from it.",
  },
  {
    title: "Solve the smallest useful problem first",
    body: "A narrow first release that people actually use teaches more than a broad specification. We grow the system from something that already works.",
  },
  {
    title: "Connect before replacing",
    body: "Existing systems hold years of data and habit. We look for ways to integrate and extend before recommending anything is thrown away.",
  },
  {
    title: "Measure, then improve",
    body: "We agree what to track at the outset, so decisions about what to build next rest on evidence.",
  },
];

export const engineering = [
  { title: "Readable over clever", body: "Code is read far more often than it is written. We favour straightforward solutions that the next engineer can follow." },
  { title: "Tested where it matters", body: "Automated tests cover the logic the business depends on, and releases run through a repeatable pipeline." },
  { title: "Secure by default", body: "Least-privilege access, validated input and managed secrets are starting assumptions, not later additions." },
  { title: "Documented as built", body: "Architecture notes, setup instructions and decisions are recorded alongside the code, and kept current." },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  /** Path under /public, e.g. "/team/name.jpg". Optional. */
  photo?: string;
  linkedin?: string;
};

/** Add real team members here. The section stays hidden while this is empty. */
export const team: TeamMember[] = [];

export type Milestone = { year: string; title: string; body: string };

/** Add real company milestones here. The section stays hidden while this is empty. */
export const milestones: Milestone[] = [];

export type Job = {
  slug: string;
  title: string;
  team: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  isOpen: boolean;
};

/**
 * Add real openings here. With no open roles the Careers page shows an
 * honest empty state and no job-detail routes are generated.
 *
 * Example:
 * {
 *   slug: "frontend-engineer",
 *   title: "Frontend Engineer",
 *   team: "Engineering",
 *   location: "City / Remote",
 *   type: "Full-time",
 *   summary: "...",
 *   responsibilities: ["..."],
 *   requirements: ["..."],
 *   isOpen: true,
 * }
 */
const allJobs: Job[] = [];

export const jobs: Job[] = allJobs.filter((j) => j.isOpen);

export function getJob(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug);
}

export const workingHere = [
  { title: "Real problems", body: "Our work is judged by whether it makes someone's working day easier. That keeps it grounded." },
  { title: "Room to do it properly", body: "We would rather do fewer things well than rush many. Quality is part of the estimate." },
  { title: "Range", body: "Projects span AI, software, CRM and infrastructure, so there is always something new to learn from a colleague." },
];
