"use client";

import * as m from "motion/react-m";
import type { ComponentProps } from "react";
import type { ServiceId } from "@/content/services";
import { EASE } from "@/components/motion/MotionProvider";

/**
 * One line illustration per service, drawn in the same hanging-from-a-rule
 * language as the hero. Strokes draw themselves when scrolled into view.
 */

const line = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 1.1, ease: EASE }, opacity: { duration: 0.01 } } },
};
const pop = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: EASE } },
};

const L = (props: ComponentProps<typeof m.path>) => <m.path variants={line} fill="none" {...props} />;
const G = (props: ComponentProps<typeof m.g>) => <m.g variants={pop} {...props} />;

function Ai() {
  return (
    <>
      <L d="M52 28V70M120 28V92M188 28V70" />
      <G>
        <path d="M32 70h28l12 12v38H32z" className="fill-paper-raised" />
        <path d="M60 70v12h12M41 94h22M41 104h22" fill="none" />
      </G>
      <L d="M72 100H94" />
      <G>
        <circle cx="120" cy="118" r="26" className="fill-ink" />
        <path d="M120 104v28M108 111l24 14M132 111l-24 14" className="stroke-paper" />
      </G>
      <L d="M146 118H168" />
      <G>
        <path d="M188 70l24 24-24 24-24-24z" className="fill-paper-raised" />
        <path d="M179 94l6 6 12-12" className="stroke-pine" strokeWidth={2.25} />
      </G>
      <L d="M188 118V168M120 144V168M52 120V168" />
      <G>
        <rect x="28" y="168" width="184" height="34" className="fill-accent" stroke="none" />
        <path d="M44 185h70M150 185h46M186 177l10 8-10 8" className="stroke-paper" strokeWidth={2} />
      </G>
    </>
  );
}

function Software() {
  return (
    <>
      <L d="M120 28V58" />
      <G>
        <path d="M120 150l84 34-84 34-84-34z" className="fill-paper-raised" />
      </G>
      <G>
        <path d="M120 104l84 34-84 34-84-34z" className="fill-paper-sunk" />
      </G>
      <G>
        <path d="M120 58l84 34-84 34-84-34z" className="fill-ink" />
        <path d="M108 84l-12 8 12 8M132 84l12 8-12 8" className="stroke-paper" strokeWidth={2} />
      </G>
      <L d="M36 92v92M204 92v92M120 126v92" strokeDasharray="1 7" />
      <G>
        <rect x="196" y="176" width="16" height="16" className="fill-accent" stroke="none" />
      </G>
    </>
  );
}

function Network() {
  const nodes: [number, number][] = [
    [120, 74],
    [50, 122],
    [190, 122],
    [78, 196],
    [162, 196],
  ];
  return (
    <>
      <L d="M120 28V60" />
      <L d="M120 74L50 122M120 74L190 122M50 122L78 196M190 122L162 196M78 196H162M50 122H190M120 74L78 196M120 74L162 196" />
      {nodes.map(([x, y], i) => (
        <G key={`${x}-${y}`}>
          {i === 0 ? (
            <rect x={x - 14} y={y - 14} width="28" height="28" className="fill-ink" />
          ) : (
            <circle cx={x} cy={y} r="10" className={i === 4 ? "fill-accent" : "fill-paper-raised"} stroke={i === 4 ? "none" : undefined} />
          )}
        </G>
      ))}
      <G>
        <circle cx="120" cy="74" r="4" className="fill-paper" stroke="none" />
      </G>
    </>
  );
}

function Crm() {
  const bars = [168, 132, 96, 60];
  return (
    <>
      <L d="M36 28V214" />
      {bars.map((w, i) => (
        <G key={w} style={{ originX: 0 }}>
          <rect x="36" y={52 + i * 42} width={w} height="26" className={i === 3 ? "fill-accent" : i === 0 ? "fill-ink" : "fill-paper-raised"} stroke={i === 3 ? "none" : undefined} />
        </G>
      ))}
      <L d="M204 65H216M168 107H216M132 149H216M96 191H216" strokeDasharray="1 7" />
      <G>
        <circle cx="216" cy="65" r="5" className="fill-paper-raised" />
        <circle cx="216" cy="107" r="5" className="fill-paper-raised" />
        <circle cx="216" cy="149" r="5" className="fill-paper-raised" />
        <circle cx="216" cy="191" r="5" className="fill-ink" />
      </G>
    </>
  );
}

function More() {
  const cells: { x: number; y: number; tone: string }[] = [];
  const tones = ["fill-ink", "fill-paper-raised", "fill-paper-raised", "fill-paper-raised", "fill-accent", "fill-paper-raised", "fill-paper-raised", "fill-paper-raised", "fill-paper-sunk"];
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) cells.push({ x: 44 + c * 58, y: 60 + r * 54, tone: tones[r * 3 + c] ?? "fill-paper-raised" });
  return (
    <>
      <L d="M62 28V60M120 28V60M178 28V60" />
      <L d="M80 78H102M138 78H160M80 132H102M138 132H160M80 186H102M138 186H160M62 96V114M120 96V114M178 96V114M62 150V168M120 150V168M178 150V168" />
      {cells.map((cell) => (
        <G key={`${cell.x}-${cell.y}`}>
          <rect x={cell.x} y={cell.y} width="36" height="36" className={cell.tone} stroke={cell.tone === "fill-accent" ? "none" : undefined} />
        </G>
      ))}
    </>
  );
}

const glyphs: Record<ServiceId, () => React.ReactNode> = { ai: Ai, software: Software, network: Network, crm: Crm, more: More };

type Props = {
  id: ServiceId;
  className?: string;
  /** "view" draws when scrolled into view; "mount" draws immediately. */
  trigger?: "view" | "mount";
};

export function ServiceGlyph({ id, className, trigger = "view" }: Props) {
  const Glyph = glyphs[id];
  const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } } };
  return (
    <m.svg
      viewBox="0 0 240 240"
      className={className}
      aria-hidden="true"
      focusable="false"
      fill="none"
      strokeWidth={1.5}
      strokeLinecap="square"
      initial="hidden"
      variants={stagger}
      {...(trigger === "view" ? { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } } : { animate: "show" })}
    >
      <g className="stroke-ink">
        <m.rect x="16" y="20" width="208" height="8" className="fill-ink" stroke="none" style={{ originX: 0 }} variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 0.8, ease: EASE } } }} />
        <Glyph />
      </g>
    </m.svg>
  );
}
