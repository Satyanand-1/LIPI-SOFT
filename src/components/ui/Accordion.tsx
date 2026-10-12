"use client";

import { Plus } from "lucide-react";
import { useId, useRef, useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

export type AccordionItem = { q: string; a: string };

type Props = {
  items: AccordionItem[];
  /** Heading level used for each question, to keep the page outline valid. */
  headingLevel?: "h2" | "h3" | "h4";
  className?: string;
};

/**
 * Accessible accordion following the WAI-ARIA pattern: each header is a real
 * button, panels are labelled regions, and Up / Down / Home / End move
 * between headers. Closed panels are inert so their content is skipped.
 */
export function Accordion({ items, headingLevel = "h3", className }: Props) {
  const baseId = useId();
  const [open, setOpen] = useState<ReadonlySet<number>>(new Set());
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);
  const Heading = headingLevel;

  const toggle = (i: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = items.length - 1;
    const target =
      e.key === "ArrowDown" ? (i === last ? 0 : i + 1)
      : e.key === "ArrowUp" ? (i === 0 ? last : i - 1)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (target === null) return;
    e.preventDefault();
    buttons.current[target]?.focus();
  };

  return (
    <div className={cn("border-b border-line", className)}>
      {items.map((item, i) => {
        const isOpen = open.has(i);
        const buttonId = `${baseId}-b-${i}`;
        const panelId = `${baseId}-p-${i}`;
        return (
          <div key={item.q} className="border-t border-line">
            <Heading className="font-sans">
              <button
                ref={(el) => {
                  buttons.current[i] = el;
                }}
                id={buttonId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="group flex w-full items-start justify-between gap-6 py-5 text-left md:py-6"
              >
                <span className="font-display text-lg font-semibold leading-snug tracking-[-0.01em] transition-colors group-hover:text-accent-ink md:text-xl">
                  {item.q}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-0.5 grid size-8 shrink-0 place-items-center border border-line-strong transition-[transform,background-color,color,border-color] duration-500 ease-expo",
                    isOpen ? "rotate-45 border-ink bg-ink text-paper" : "group-hover:border-ink",
                  )}
                >
                  <Plus className="size-4" strokeWidth={1.75} />
                </span>
              </button>
            </Heading>
            <div id={panelId} role="region" aria-labelledby={buttonId} data-open={isOpen} inert={!isOpen} className="acc-panel">
              <div>
                <p className="max-w-3xl pb-6 pr-10 text-[1.02rem] leading-relaxed text-ink-soft md:pb-7">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
