"use client";

import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { useRef, type CSSProperties } from "react";

/**
 * A statement that "inks in" word by word as it is scrolled through.
 *
 * One scroll subscription writes progress to a CSS variable and each word
 * derives its own opacity from it in CSS (see `.statement-word`), so there is
 * no per-word JavaScript. Un-inked words stay above 3:1 contrast, the minimum
 * for text this size, so the paragraph is readable at every scroll position.
 */
export function ScrollStatement({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    ref.current?.style.setProperty("--p", value.toFixed(3));
  });

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {text}
      </p>
    );
  }

  const words = text.split(" ");
  return (
    <p ref={ref} className={className} style={{ "--n": words.length } as CSSProperties}>
      {words.map((word, i) => (
        <span key={i} data-reveal className="statement-word" style={{ "--i": i } as CSSProperties}>
          {word}{" "}
        </span>
      ))}
    </p>
  );
}
