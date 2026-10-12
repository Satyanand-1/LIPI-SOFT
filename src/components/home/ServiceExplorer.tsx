"use client";

import Link from "next/link";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { coreServices, serviceHref } from "@/content/services";
import { cn } from "@/lib/cn";
import { EASE } from "@/components/motion/MotionProvider";
import { ServiceGlyph } from "@/components/visuals/ServiceGlyph";

/**
 * Core services as a list of large rows. On desktop, pointing at or focusing
 * a row swaps the illustration and capability list in the sticky side panel.
 * Every row is a plain link, so it works without the panel on small screens.
 */
export function ServiceExplorer() {
  const [active, setActive] = useState(0);
  const current = coreServices[active] ?? coreServices[0];
  if (!current) return null;

  return (
    <div className="grid gap-x-12 lg:grid-cols-12">
      <ul className="border-b border-line lg:col-span-7">
        {coreServices.map((service, i) => {
          const on = active === i;
          return (
            <li key={service.id} className="border-t border-line">
              <Link
                href={serviceHref(service)}
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className="group relative grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-3 py-7 md:grid-cols-[4rem_1fr_auto] md:py-9"
              >
                <span
                  aria-hidden="true"
                  className={cn("absolute left-0 top-[-1px] h-0.5 bg-accent transition-[width] duration-700 ease-expo", on ? "w-full" : "w-0")}
                />
                <span className={cn("type-label pt-2 transition-colors md:pt-3", on ? "text-accent-ink" : "text-ink-faint")}>{service.index}</span>
                <span>
                  <span className="type-h2 block transition-transform duration-500 ease-expo lg:group-hover:translate-x-2">{service.name}</span>
                  <span className="mt-3 block max-w-xl text-[1.02rem] leading-relaxed text-ink-soft">{service.summary}</span>
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "mt-1 grid size-10 place-items-center border transition-[background-color,color,border-color,transform] duration-500 ease-expo md:mt-2 md:size-12",
                    on ? "border-ink bg-ink text-paper" : "border-line-strong text-ink",
                  )}
                >
                  <ArrowUpRight className="size-5 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.5} />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="hidden lg:col-span-5 lg:block" aria-hidden="true">
        <div className="sticky top-28 border border-line bg-paper-raised p-8">
          <AnimatePresence mode="wait" initial={false}>
            <m.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8, transition: { duration: 0.18 } }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              <ServiceGlyph id={current.id} trigger="mount" className="mx-auto block aspect-square w-full max-w-[19rem]" />
              <p className="type-label mt-8 border-t border-line pt-5 text-ink-faint">Includes</p>
              <ul className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
                {current.capabilities.slice(0, 6).map((c) => (
                  <li key={c.title} className="text-[0.9rem] leading-snug text-ink-soft">
                    {c.title}
                  </li>
                ))}
              </ul>
            </m.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
