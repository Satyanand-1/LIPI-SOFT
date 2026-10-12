import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you were looking for could not be found.",
  robots: { index: false, follow: true },
};

const suggestions = [
  { label: "Services", href: "/services" },
  { label: "Our Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "Sitemap", href: "/sitemap" },
];

export default function NotFound() {
  return (
    <section className="shell flex min-h-[80svh] flex-col justify-center pb-20 pt-32" aria-labelledby="nf-heading">
      <div className="rule-top grid gap-x-10 gap-y-8 pt-6 lg:grid-cols-12">
        <p className="type-label text-accent-ink lg:col-span-3">Error 404</p>
        <div className="lg:col-span-9">
          {/* The missing page, drawn as a gap in the line. */}
          <svg viewBox="0 0 520 120" className="mb-10 h-auto w-full max-w-xl" aria-hidden="true" fill="none">
            <path d="M0 10H200M320 10H520" className="stroke-ink" strokeWidth="10" />
            <path d="M60 15V70M150 15V52M370 15V60M460 15V84" className="stroke-ink" strokeWidth="1.5" />
            <rect x="46" y="70" width="28" height="28" className="fill-paper-raised stroke-ink" strokeWidth="1.5" />
            <circle cx="150" cy="64" r="12" className="fill-paper-raised stroke-ink" strokeWidth="1.5" />
            <path d="M370 60l14 14-14 14-14-14z" className="fill-paper-raised stroke-ink" strokeWidth="1.5" />
            <rect x="446" y="84" width="28" height="28" className="fill-ink" />
            <path d="M260 4V60" className="stroke-accent" strokeWidth="1.5" strokeDasharray="3 6" />
            <rect x="250" y="60" width="20" height="20" className="fill-accent" />
          </svg>
          <h1 id="nf-heading" className="type-h1 max-w-[14ch]">
            This page is missing from the line.
          </h1>
          <p className="type-lead mt-6 max-w-xl">The address may be mistyped, or the page may have moved. Nothing is broken on your side.</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href="/">Back to home</ButtonLink>
            <ButtonLink href="/contact" variant="secondary" arrow={false}>
              Contact us
            </ButtonLink>
          </div>
          <nav aria-label="Suggested pages" className="mt-12 border-t border-line pt-5">
            <ul className="flex flex-wrap gap-x-7 gap-y-1">
              {suggestions.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="link-draw inline-block py-2 text-[0.97rem] font-medium">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
