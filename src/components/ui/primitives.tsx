import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/content/site";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";
import { cn } from "@/lib/cn";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "./Button";

/** Inline JSON-LD structured data. Content is always generated server-side. */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function Tag({ children, tone = "neutral", className }: { children: ReactNode; tone?: "neutral" | "accent" | "pine"; className?: string }) {
  return (
    <span
      className={cn(
        "type-label inline-flex items-center gap-2 px-2.5 py-1.5",
        tone === "accent" && "bg-accent-soft text-ink",
        tone === "pine" && "bg-pine-soft text-ink",
        tone === "neutral" && "border border-line-strong text-ink-soft",
        className,
      )}
    >
      <span aria-hidden="true" className={cn("size-1.5", tone === "pine" ? "bg-pine" : tone === "accent" ? "bg-accent" : "bg-ink-faint")} />
      {children}
    </span>
  );
}

/** Label for content awaiting confirmation. Hidden when draft labels are switched off. */
export function DraftTag({ children, className }: { children: ReactNode; className?: string }) {
  if (!site.flags.showDraftLabels) return null;
  return (
    <Tag tone="accent" className={className}>
      {children}
    </Tag>
  );
}

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const trail: Crumb[] = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <>
      <JsonLd data={breadcrumbJsonLd(trail)} />
      <nav aria-label="Breadcrumb" className="type-label text-ink-faint">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
          {trail.map((c, i) => {
            const last = i === trail.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-2">
                {last ? (
                  <span aria-current="page" className="text-ink">
                    {c.name}
                  </span>
                ) : (
                  <>
                    <Link href={c.path} className="py-2 transition-colors hover:text-ink">
                      {c.name}
                    </Link>
                    <span aria-hidden="true">/</span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}

type PageHeroProps = {
  crumbs: Crumb[];
  label: string;
  title: string;
  lead?: string;
  children?: ReactNode;
  aside?: ReactNode;
};

/** Opening block shared by every inner page. */
export function PageHero({ crumbs, label, title, lead, children, aside }: PageHeroProps) {
  return (
    <section className="shell pt-28 pb-14 md:pt-36 md:pb-20">
      <div className="animate-fade-up">
        <Breadcrumbs crumbs={crumbs} />
      </div>
      <div className="rule-top mt-6 grid gap-x-10 gap-y-10 pt-6 lg:grid-cols-12">
        <div className={aside ? "lg:col-span-8" : "lg:col-span-10"}>
          <p className="type-label animate-fade-up text-accent-ink">{label}</p>
          <SplitHeading as="h1" trigger="mount" delay={0.05} text={title} className="type-h1 mt-5 max-w-[18ch]" />
          {lead ? (
            <p className="type-lead mt-7 max-w-2xl animate-fade-up" style={{ animationDelay: "0.35s" }}>
              {lead}
            </p>
          ) : null}
          {children ? (
            <div className="mt-9 animate-fade-up" style={{ animationDelay: "0.45s" }}>
              {children}
            </div>
          ) : null}
        </div>
        {aside ? (
          <div className="animate-fade-up lg:col-span-4" style={{ animationDelay: "0.3s" }}>
            {aside}
          </div>
        ) : null}
      </div>
    </section>
  );
}

type SectionHeaderProps = {
  label: string;
  title: string;
  lead?: string;
  id?: string;
  className?: string;
  children?: ReactNode;
};

/** Section opener: a rule, a label hanging from it on the left, the headline on the right. */
export function SectionHeader({ label, title, lead, id, className, children }: SectionHeaderProps) {
  return (
    <div className={cn("rule-top grid gap-x-10 gap-y-5 pt-6 lg:grid-cols-12", className)}>
      <p className="type-label text-ink-faint lg:col-span-3">{label}</p>
      <div className="lg:col-span-9">
        <SplitHeading id={id} text={title} className="type-h2 max-w-[22ch]" />
        {lead ? (
          <Reveal delay={0.1}>
            <p className="type-lead mt-6 max-w-2xl">{lead}</p>
          </Reveal>
        ) : null}
        {children}
      </div>
    </div>
  );
}

type CtaBandProps = {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

/** Closing call to action used at the foot of most pages. */
export function CtaBand({
  title = "Have a process that should be *easier?*",
  body = "Tell us what is slowing your team down. We will come back with an honest view of what could help, and whether we are the right people to build it.",
  primary = { label: "Let’s Talk", href: "/contact" },
  secondary = { label: "See how we work", href: "/how-we-work" },
}: CtaBandProps) {
  return (
    <section className="defer-render on-ink bg-ink text-paper" aria-labelledby="cta-heading">
      <div className="shell section-y">
        <div className="rule-top grid gap-10 pt-6 lg:grid-cols-12">
          <p className="type-label text-paper/60 lg:col-span-3">Start a conversation</p>
          <div className="lg:col-span-9">
            <SplitHeading id="cta-heading" text={title} className="type-h1 max-w-[16ch] [&_.text-accent-ink]:text-accent-bright" />
            <Reveal delay={0.15}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-paper/75">{body}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <ButtonLink href={primary.href} variant="light">
                  {primary.label}
                </ButtonLink>
                <ButtonLink href={secondary.href} variant="outline-light" arrow={false}>
                  {secondary.label}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Small list with rule markers, used for scope and deliverable lists. */
export function RuleList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-[0.97rem] leading-snug text-ink-soft">
          <span aria-hidden="true" className="mt-[0.6em] h-0.5 w-3 shrink-0 bg-accent" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
