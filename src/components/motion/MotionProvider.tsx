"use client";

import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import type { ReactNode } from "react";

/**
 * Loads the small `domAnimation` feature set once for the whole app and makes
 * every Motion component honour the visitor's reduced-motion preference.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </LazyMotion>
  );
}

export const EASE = [0.16, 1, 0.3, 1] as const;
