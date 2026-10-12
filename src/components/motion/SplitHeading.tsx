"use client";

import { createElement, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { useShownRef } from "./Reveal";

type Props = {
  /** Wrap a word or phrase in *asterisks* to set it in the accent colour. */
  text: string;
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  /**
   * "mount" plays as soon as the page paints. "view" waits until the heading
   * scrolls into view. Both are CSS animations, so neither waits on JavaScript
   * to start and the text is always present in the HTML.
   */
  trigger?: "mount" | "view";
  delay?: number;
  id?: string;
};

const STEP = 0.055;

/** Splits text into words and resolves *accent* markers, which may span several words. */
function parseWords(text: string): { word: string; accent: boolean }[] {
  const words: { word: string; accent: boolean }[] = [];
  let inAccent = false;
  for (const raw of text.split(/\s+/).filter(Boolean)) {
    let word = raw;
    if (word.startsWith("*")) {
      inAccent = true;
      word = word.slice(1);
    }
    const accent = inAccent;
    const closing = /^(.*?)\*([.,;:!?]*)$/.exec(word);
    if (closing) {
      word = `${closing[1]}${closing[2]}`;
      inAccent = false;
    }
    words.push({ word, accent });
  }
  return words;
}

/** Headline whose words rise into place one after another from behind a mask. */
export function SplitHeading({ text, as = "h2", className, trigger = "view", delay = 0, id }: Props) {
  const ref = useShownRef<HTMLElement>();
  const words = parseWords(text);
  const plain = words.map((w) => w.word).join(" ");

  const children: ReactNode = words.map((w, i) => {
    const wait = `${(delay + i * STEP).toFixed(3)}s`;
    return (
      <span key={i} aria-hidden="true">
        <span className="word-mask">
          {trigger === "mount" ? (
            <span className={cn("animate-rise-in", w.accent && "text-accent-ink")} style={{ animationDelay: wait }}>
              {w.word}
            </span>
          ) : (
            <span data-reveal="rise" className={cn(w.accent && "text-accent-ink")} style={{ "--reveal-delay": wait } as CSSProperties}>
              {w.word}
            </span>
          )}
        </span>
        {i < words.length - 1 ? " " : null}
      </span>
    );
  });

  return createElement(as, { ref: trigger === "view" ? ref : undefined, id, className, "aria-label": plain, "data-split": trigger === "view" ? "" : undefined }, children);
}
