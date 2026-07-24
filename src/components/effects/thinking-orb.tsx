"use client";

import { useReducedMotion } from "motion/react";
import { ThinkingOrb as ThinkingOrbBase, type OrbState } from "thinking-orbs";

import { cn } from "@/lib/utils";

type Props = {
  state?: OrbState;
  /** 20 = inline, 64 = hero/mark scale */
  size?: 20 | 64;
  className?: string;
  speed?: number;
  "aria-label"?: string;
};

/**
 * Thin wrapper around thinking-orbs — light theme for warm paper,
 * auto-pauses when reduced motion is preferred.
 */
export function ThinkingOrb({
  state = "working",
  size = 20,
  className,
  speed = 1,
  "aria-label": ariaLabel,
}: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <ThinkingOrbBase
      state={state}
      size={size}
      theme="light"
      speed={speed}
      paused={Boolean(reduceMotion)}
      aria-label={ariaLabel}
      className={cn("shrink-0", className)}
    />
  );
}

export type { OrbState };
