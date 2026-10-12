"use client";

import { useScroll, useSpring } from "motion/react";
import * as m from "motion/react-m";
import { useRef } from "react";
import { processSteps } from "@/content/process";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";

/**
 * Six delivery steps on a rail. The accent line fills in step with scroll:
 * left-to-right on desktop, top-to-bottom on small screens.
 */
export function ProcessRail() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <div ref={ref} className="relative">
      {/* Rail track and progress */}
      <div aria-hidden="true" className="absolute left-[0.4375rem] top-2 bottom-2 w-px bg-line-strong lg:left-0 lg:right-0 lg:top-[0.4375rem] lg:bottom-auto lg:h-px lg:w-auto">
        <m.div className="hidden h-full w-full origin-left bg-accent lg:block" style={{ scaleX: progress }} />
        <m.div className="h-full w-full origin-top bg-accent lg:hidden" style={{ scaleY: progress }} />
      </div>

      <Stagger as="ol" gap={0.09} className="relative grid gap-y-9 lg:grid-cols-6 lg:gap-x-6">
        {processSteps.map((step) => (
          <StaggerItem as="li" key={step.index} className="relative pl-9 lg:pl-0 lg:pt-10">
            <span aria-hidden="true" className="absolute left-0 top-1.5 size-[0.9375rem] border-2 border-ink bg-paper lg:top-0" />
            <p className="type-label text-accent-ink">{step.index}</p>
            <h3 className="mt-2 font-display text-xl font-semibold leading-tight tracking-[-0.015em]">{step.short}</h3>
            <p className="mt-2 text-[0.93rem] leading-relaxed text-ink-soft">{step.title}.</p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
}
