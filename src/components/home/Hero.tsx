import { SplitHeading } from "@/components/motion/SplitHeading";
import { ButtonLink } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-clip" aria-labelledby="hero-heading">
      <div className="shell grid items-center gap-x-10 gap-y-14 pb-16 pt-28 sm:pt-32 lg:min-h-[min(100svh,58rem)] lg:grid-cols-12 lg:pb-24 lg:pt-28">
        <div className="lg:col-span-7">
          <p className="type-label flex animate-fade-up gap-3 text-ink-faint">
            <span className="mt-[0.45em] h-0.5 w-8 shrink-0 bg-accent" aria-hidden="true" />
            Software, AI automation, CRM and infrastructure
          </p>

          <SplitHeading
            as="h1"
            id="hero-heading"
            trigger="mount"
            delay={0.12}
            text="Technology, *written* for the way you work."
            className="type-display mt-6 max-w-[11ch]"
          />

          <p className="type-lead mt-8 max-w-xl animate-fade-up" style={{ animationDelay: "0.55s" }}>
            From intelligent automation to custom software and connected infrastructure, LIPI SOFT builds practical systems that take
            repetitive work off your team and keep the business moving.
          </p>

          <div className="mt-10 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "0.7s" }}>
            <ButtonLink href="/services">Explore Our Solutions</ButtonLink>
            <ButtonLink href="/contact" variant="secondary" arrow={false}>
              Let’s Talk
            </ButtonLink>
          </div>
        </div>

        <div className="lg:col-span-5">
          <HeroVisual />
        </div>
      </div>

      <div className="shell pointer-events-none absolute inset-x-0 bottom-8 hidden lg:block">
        <a href="#intro" className="type-label pointer-events-auto inline-flex items-center gap-3 py-2 text-ink-faint transition-colors hover:text-ink">
          <span aria-hidden="true" className="scroll-cue relative block h-10 w-px overflow-hidden bg-line-strong" />
          Scroll
        </a>
      </div>
    </section>
  );
}
