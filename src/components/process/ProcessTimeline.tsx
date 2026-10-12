"use client";

import { useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { useRef } from "react";
import { processSteps } from "@/content/process";
import { Reveal } from "@/components/motion/Reveal";
import { RuleList } from "@/components/ui/primitives";

/** Full engagement process: a vertical rail that fills as the page is read. */
export function ProcessTimeline() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.6", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <ol ref={ref} className="relative">
      <li aria-hidden="true" className="absolute bottom-0 left-[0.6875rem] top-0 w-px bg-line-strong md:left-[1.4375rem]">
        <m.span className="block h-full w-full origin-top bg-accent" style={{ scaleY: progress }} />
      </li>

      {processSteps.map((step) => (
        <li key={step.index} id={`step-${step.index}`} className="relative scroll-mt-28 pb-16 pl-10 last:pb-0 md:pb-24 md:pl-24">
          <span aria-hidden="true" className="absolute left-0 top-1 grid size-6 place-items-center border-2 border-ink bg-paper md:size-12">
            <span className="hidden font-mono text-[0.78rem] font-medium md:block">{step.index}</span>
          </span>

          <Reveal>
            <p className="type-label text-accent-ink md:hidden">Step {step.index}</p>
            <h2 className="type-h2 mt-2 max-w-[20ch] md:mt-0">{step.title}</h2>
            <p className="type-lead mt-5 max-w-2xl">{step.description}</p>

            <div className="mt-9 grid gap-x-8 gap-y-8 border-t border-line pt-7 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <h3 className="type-label font-mono text-ink-faint">What happens</h3>
                <RuleList items={step.activities} className="mt-4" />
              </div>
              <div>
                <h3 className="type-label font-mono text-ink-faint">Expected deliverables</h3>
                <RuleList items={step.deliverables} className="mt-4" />
              </div>
              <div className="sm:col-span-2 lg:col-span-1">
                <h3 className="type-label font-mono text-ink-faint">Your part</h3>
                <p className="mt-4 text-[0.97rem] leading-relaxed text-ink-soft">{step.yourRole}</p>
              </div>
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}
