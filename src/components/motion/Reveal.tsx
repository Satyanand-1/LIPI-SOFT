"use client";

import { createElement, useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/**
 * Scroll-reveal primitives.
 *
 * The animations themselves are CSS (see the "Scroll reveal" block in
 * globals.css). JavaScript only marks an element with `data-shown` the first
 * time it enters the viewport, using ONE IntersectionObserver shared by every
 * reveal on the page. That keeps hydration cheap even on long pages.
 */

let sharedObserver: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  sharedObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-shown", "");
        sharedObserver?.unobserve(entry.target);
      }
    },
    { rootMargin: "0px 0px -12% 0px" },
  );
  return sharedObserver;
}

/** Returns a ref; the element it is attached to gains `data-shown` once in view. */
export function useShownRef<T extends Element>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = getObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);
  return ref;
}

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait after entering view. */
  delay?: number;
};

/** Fades and lifts its children into place the first time they scroll into view. */
export function Reveal({ children, className, delay = 0 }: RevealProps) {
  const ref = useShownRef<HTMLDivElement>();
  return (
    <div ref={ref} data-reveal="fade" className={className} style={delay ? ({ "--reveal-delay": `${delay}s` } as CSSProperties) : undefined}>
      {children}
    </div>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Seconds between each child. */
  gap?: number;
  as?: "div" | "ul" | "ol";
};

/** Parent for a group of `StaggerItem`s that enter one after another. Items must be direct children. */
export function Stagger({ children, className, gap = 0.08, as = "div" }: StaggerProps) {
  const ref = useShownRef<HTMLElement>();
  return createElement(as, { ref, "data-stagger": "", className, style: { "--stagger-gap": `${gap}s` } as CSSProperties }, children);
}

export function StaggerItem({ children, className, as = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" }) {
  return createElement(as, { "data-reveal": "item", className }, children);
}
