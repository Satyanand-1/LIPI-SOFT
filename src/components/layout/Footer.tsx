import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { footerNav } from "@/content/navigation";
import { site } from "@/content/site";
import { LogoMark } from "@/components/ui/Logo";
import { CurrentYear } from "./CurrentYear";

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <nav aria-label={title}>
      <h2 className="type-label font-mono text-paper/55">{title}</h2>
      <ul className="mt-4 space-y-1">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="link-draw inline-block py-1.5 text-[0.97rem] text-paper/85 hover:text-paper">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export function Footer() {
  const { email, phone, address, hours } = site.contact;
  const hasDetails = Boolean(email || phone || address || hours);

  return (
    <footer className="defer-render on-ink bg-ink text-paper">
      <div className="shell">
        <div className="grid gap-x-10 gap-y-12 border-t border-paper/15 py-14 md:py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Link href="/" aria-label="LIPI SOFT, home" className="inline-flex items-center gap-3">
              <LogoMark className="size-9" />
              <span className="font-display text-xl tracking-[0.14em]">
                <span className="font-bold">LIPI</span> SOFT
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.97rem] leading-relaxed text-paper/70">{site.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 lg:col-span-8">
            <FooterColumn title="Services" links={footerNav.services} />
            <FooterColumn title="Company" links={footerNav.company} />

            <div className="col-span-2 sm:col-span-1">
              <h2 className="type-label font-mono text-paper/55">Contact</h2>
              <div className="mt-4 space-y-2 text-[0.97rem] text-paper/85">
                {email ? (
                  <p>
                    <a href={`mailto:${email}`} className="link-draw inline-block py-1">
                      {email}
                    </a>
                  </p>
                ) : null}
                {phone ? (
                  <p>
                    <a href={`tel:${phone.replace(/[^\d+]/g, "")}`} className="link-draw inline-block py-1">
                      {phone}
                    </a>
                  </p>
                ) : null}
                {address ? (
                  <address className="not-italic leading-relaxed text-paper/70">
                    {address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                ) : null}
                {hours ? <p className="text-paper/70">{hours}</p> : null}
                {!hasDetails ? <p className="leading-relaxed text-paper/70">The quickest way to reach us is the project enquiry form.</p> : null}
                <p className="pt-1">
                  <Link href="/contact" className="group inline-flex items-center gap-1.5 py-1 font-semibold text-paper">
                    <span className="link-draw">Start a project</span>
                    <ArrowUpRight aria-hidden="true" className="size-4 transition-transform duration-300 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </p>
              </div>

              {site.social.length > 0 ? (
                <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-1">
                  {site.social.map((s) => (
                    <li key={s.href}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="link-draw inline-block py-1.5 text-[0.97rem] text-paper/85">
                        {s.label}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-paper/15 py-7 text-[0.86rem] text-paper/60 md:flex-row md:items-center md:justify-between">
          <p>
            © <CurrentYear /> {site.legal.entityName ?? site.name}. All rights reserved.
          </p>
          <nav aria-label="Legal">
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {footerNav.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-draw inline-block py-1.5 hover:text-paper">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
