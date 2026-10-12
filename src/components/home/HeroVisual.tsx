"use client";

import { AnimatePresence, useInView, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { EASE } from "@/components/motion/MotionProvider";

/**
 * Hero illustration: five business inputs hang from one headline rule, flow
 * into a single system, pass a human approval step and land as outcomes on a
 * baseline. It is drawn in on load, carries small data pulses, shifts gently
 * with the pointer on desktop, and can be explored column by column.
 */

const INPUTS = [
  { x: 70, entry: 236, label: "documents", title: "Documents", caption: "Invoices, forms and PDFs read and checked, without re-typing." },
  { x: 175, entry: 258, label: "customers", title: "Customers", caption: "Every lead and conversation kept in one shared record." },
  { x: 280, entry: 280, label: "data", title: "Data", caption: "Databases and reports that finally agree with each other." },
  { x: 385, entry: 302, label: "apps + apis", short: "apps", title: "Apps and APIs", caption: "The tools you already use, connected so work flows between them." },
  { x: 490, entry: 324, label: "network", title: "Network", caption: "Reliable, secure connectivity underneath all of it." },
] as const;

const route = (x: number, entry: number, from = 156) => `M${x} ${from} V196 C${x} 236 ${entry} 224 ${entry} 264`;
const OUT_LEFT = "M280 504 V522 C280 548 150 536 150 566";
const OUT_RIGHT = "M280 504 V522 C280 548 410 536 410 566";

function NodeGlyph({ i, x }: { i: number; x: number }) {
  switch (i) {
    case 0:
      return (
        <>
          <path d={`M${x - 20} 100h28l12 12v44h-40z`} className="fill-paper-raised" />
          <path d={`M${x + 8} 100v12h12M${x - 11} 124h22M${x - 11} 134h22M${x - 11} 144h14`} fill="none" />
        </>
      );
    case 1:
      return (
        <>
          <circle cx={x} cy={118} r={9} className="fill-paper-raised" />
          <path d={`M${x - 20} 156a20 20 0 0 1 40 0z`} className="fill-paper-raised" />
        </>
      );
    case 2:
      return (
        <>
          <path d={`M${x - 22} 108v40a22 8 0 0 0 44 0v-40z`} className="fill-paper-raised" />
          <ellipse cx={x} cy={108} rx={22} ry={8} className="fill-paper-raised" />
          <path d={`M${x - 22} 128a22 8 0 0 0 44 0`} fill="none" />
        </>
      );
    case 3:
      return (
        <>
          <path d={`M${x} 100l24 14v28l-24 14-24-14v-28z`} className="fill-paper-raised" />
          <path d={`M${x - 5} 119l-9 9 9 9M${x + 5} 119l9 9-9 9`} fill="none" />
        </>
      );
    default:
      return (
        <>
          <path d={`M${x} 108L${x - 18} 146M${x} 108L${x + 18} 146M${x} 114V156`} fill="none" />
          <circle cx={x} cy={108} r={6.5} className="fill-paper-raised" />
          <circle cx={x - 18} cy={146} r={6.5} className="fill-paper-raised" />
          <circle cx={x + 18} cy={146} r={6.5} className="fill-paper-raised" />
        </>
      );
  }
}

export function HeroVisual() {
  const reduce = useReducedMotion();
  const figureRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [ready, setReady] = useState(false);
  // Looping work (pulses, rings, caption cycling) stops while the hero is off-screen.
  const inView = useInView(figureRef, { amount: 0.1 });
  const looping = ready && inView && !reduce;

  // Pointer parallax (mouse only), smoothed with springs.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 70, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 70, damping: 18, mass: 0.6 });
  const diagramX = useTransform(sx, (v) => v * 12);
  const diagramY = useTransform(sy, (v) => v * 9);
  const gridX = useTransform(sx, (v) => v * -16);
  const gridY = useTransform(sy, (v) => v * -12);
  const coreX = useTransform(sx, (v) => v * 7);
  const coreY = useTransform(sy, (v) => v * 7);

  // Gentle drift as the hero scrolls away.
  const { scrollY } = useScroll();
  const drift = useTransform(scrollY, [0, 700], [0, reduce ? 0 : -46]);

  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce || e.pointerType !== "mouse" || !figureRef.current) return;
    const r = figureRef.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
    setHovering(false);
  };

  // Cycle the highlighted input until the visitor takes over.
  useEffect(() => {
    if (!looping || hovering) return;
    const id = setInterval(() => setActive((a) => (a + 1) % INPUTS.length), 3400);
    return () => clearInterval(id);
  }, [looping, hovering]);

  const draw = (delay: number, duration = 0.9) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { duration, ease: EASE, delay }, opacity: { duration: 0.01, delay } },
  });
  const appear = (delay: number) => ({
    initial: { opacity: 0, scale: 0.86 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  const current = INPUTS[active] ?? INPUTS[0];

  return (
    <m.figure ref={figureRef} style={{ y: drift }} className="relative mx-auto w-full max-w-[34rem]" onPointerMove={onPointerMove} onPointerLeave={onPointerLeave}>
      {/* Dot grid lives on its own CSS layer, so the animated diagram never repaints it. */}
      <m.div aria-hidden="true" className="hero-grid pointer-events-none absolute -inset-x-4 -top-4 bottom-16" style={{ x: gridX, y: gridY }} />
      <svg
        viewBox="0 0 560 650"
        className="relative block h-auto w-full overflow-visible"
        role="img"
        aria-label="Diagram: documents, customers, data, applications and the network hang from a single line, flow into one connected system, pass a human approval step, and produce reports and completed actions."
        fill="none"
        strokeLinecap="square"
      >
        <m.g style={{ x: diagramX, y: diagramY }} className="stroke-ink" strokeWidth={1.5}>
          {/* Headline rule */}
          <m.rect
            x="20"
            y="40"
            width="520"
            height="10"
            className="fill-ink"
            stroke="none"
            style={{ originX: 0 }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
          />

          {/* Inputs hanging from the rule */}
          {INPUTS.map((input, i) => {
            const on = active === i;
            const top = i === 1 ? 109 : i === 4 ? 101 : 100;
            return (
              <g key={input.label} className={on ? "stroke-accent" : undefined} style={{ transition: "stroke 0.4s" }}>
                <m.path d={`M${input.x} 50V${top}`} strokeWidth={on ? 2.25 : 1.5} {...draw(0.55 + i * 0.07, 0.5)} />
                <m.path d={route(input.x, input.entry)} strokeWidth={on ? 2.25 : 1.5} {...draw(1.05 + i * 0.07, 0.9)} />
                <m.g {...appear(0.8 + i * 0.07)}>
                  <NodeGlyph i={i} x={input.x} />
                </m.g>
                <m.text
                  x={input.x + 9}
                  y={78}
                  stroke="none"
                  className={`font-mono text-[15px] tracking-wide sm:text-[11px] ${on ? "fill-accent-ink" : "fill-ink-faint"}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.95 + i * 0.07 }}
                >
                  {"short" in input ? (
                    <>
                      <tspan className="sm:hidden">{input.short}</tspan>
                      <tspan className="hidden sm:inline">{input.label}</tspan>
                    </>
                  ) : (
                    input.label
                  )}
                </m.text>
                {/* Generous invisible hit area for hover and tap */}
                <rect
                  x={input.x - 50}
                  y={50}
                  width={100}
                  height={150}
                  fill="transparent"
                  stroke="none"
                  onPointerEnter={() => {
                    setActive(i);
                    setHovering(true);
                  }}
                />
              </g>
            );
          })}

          {/* The connected system */}
          <m.g {...appear(1.55)}>
            <rect x="214" y="264" width="132" height="132" className="fill-ink" />
            <m.g style={{ x: coreX, y: coreY }} stroke="none" className={looping ? undefined : "hero-paused"}>
              <circle cx="280" cy="330" r="46" className="hero-ring stroke-paper/70" strokeWidth={1.25} strokeDasharray="2 9" fill="none" />
              <circle cx="280" cy="330" r="30" className="hero-ring hero-ring-reverse stroke-paper/45" strokeWidth={1.25} strokeDasharray="14 8" fill="none" />
              <rect x="271" y="321" width="18" height="18" className="fill-accent" />
            </m.g>
          </m.g>
          <m.text
            x="362"
            y="326"
            stroke="none"
            className="hidden fill-ink-faint font-mono text-[11px] tracking-wide sm:inline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.9 }}
          >
            <tspan x="362">rules, models,</tspan>
            <tspan x="362" dy="16">integrations</tspan>
          </m.text>

          {/* Human approval */}
          <m.path d="M280 396V448" {...draw(1.85, 0.4)} />
          <m.g {...appear(2.05)}>
            <path d="M280 448l28 28-28 28-28-28z" className="fill-paper-raised" />
            <path d="M270 476l7 7 13-14" className="stroke-pine" strokeWidth={2.25} />
          </m.g>
          <m.text
            x="322"
            y="480"
            stroke="none"
            className="fill-ink-faint font-mono text-[15px] tracking-wide sm:text-[11px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
          >
            human approval
          </m.text>

          {/* Outcomes standing on the baseline */}
          <m.path d={OUT_LEFT} {...draw(2.2, 0.6)} />
          <m.path d={OUT_RIGHT} {...draw(2.2, 0.6)} />
          <m.g {...appear(2.5)}>
            <rect x="116" y="566" width="68" height="50" className="fill-paper-raised" />
            <path d="M132 604v-12M146 604v-24M160 604v-17M174 604v-8" strokeWidth={5} className="stroke-ink" strokeLinecap="butt" />
            <rect x="376" y="566" width="68" height="50" className="fill-accent" stroke="none" />
            <path d="M394 591h30M414 581l10 10-10 10" className="stroke-paper" strokeWidth={2.25} />
          </m.g>
          <m.path
            d="M20 616H540"
            strokeWidth={2}
            {...draw(2.45, 0.9)}
            onAnimationComplete={() => setReady(true)}
          />
          <m.text
            stroke="none"
            className="fill-ink-faint font-mono text-[15px] tracking-wide sm:text-[11px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.7 }}
          >
            <tspan x="150" y="640" textAnchor="middle">reports</tspan>
            <tspan x="410" y="640" textAnchor="middle">work done</tspan>
          </m.text>

          {/* Data pulses. Skipped entirely for reduced motion. */}
          {looping ? (
            <g stroke="none" className="fill-accent">
              {INPUTS.map((input, i) => (
                <circle key={input.label} r="3.5">
                  <animateMotion dur="3s" begin={`${i * 0.6}s`} repeatCount="indefinite" path={route(input.x, input.entry, 50)} keyPoints="0;1;1" keyTimes="0;0.7;1" calcMode="linear" />
                  <animate attributeName="opacity" dur="3s" begin={`${i * 0.6}s`} repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.08;0.62;0.7;1" />
                </circle>
              ))}
              {[OUT_LEFT, OUT_RIGHT].map((d, i) => (
                <circle key={d} r="3.5">
                  <animateMotion dur="3s" begin={`${1.4 + i * 1.5}s`} repeatCount="indefinite" path={`M280 396V504 ${d.replace("M280 504 ", "")}`} keyPoints="0;1;1" keyTimes="0;0.6;1" calcMode="linear" />
                  <animate attributeName="opacity" dur="3s" begin={`${1.4 + i * 1.5}s`} repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.08;0.52;0.6;1" />
                </circle>
              ))}
            </g>
          ) : null}
        </m.g>
      </svg>

      {/* Caption for the highlighted input. Decorative: the diagram has a full text alternative. */}
      <figcaption aria-hidden="true" className="mt-5 flex min-h-[4.5rem] gap-4 border-t border-line pt-4 sm:min-h-[3.75rem]">
        <span className="type-label shrink-0 pt-1 text-accent-ink">{String(active + 1).padStart(2, "0")} / 05</span>
        <AnimatePresence mode="wait" initial={false}>
          <m.p
            key={active}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="text-[0.95rem] leading-snug text-ink-soft"
          >
            <span className="font-semibold text-ink">{current.title}.</span> {current.caption}
          </m.p>
        </AnimatePresence>
      </figcaption>
    </m.figure>
  );
}
