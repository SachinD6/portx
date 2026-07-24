"use client";

import { MetalFx } from "metal-fx";
import { useReducedMotion } from "motion/react";
import type { ReactElement } from "react";

import { cn } from "@/lib/utils";

type MetalCtaProps = {
  /** Single interactive child (button or link) */
  children: ReactElement;
  className?: string;
  /** Prefer silver on warm paper — less rainbow noise */
  preset?: "chromatic" | "silver" | "gold";
  strength?: number;
};

/**
 * Liquid-metal ring for a single primary CTA.
 * Use sparingly — booking / hire actions only.
 */
export function MetalCta({
  children,
  className,
  preset = "silver",
  strength = 0.72,
}: MetalCtaProps) {
  const reduceMotion = useReducedMotion();

  return (
    <MetalFx
      variant="button"
      preset={preset}
      theme="light"
      strength={strength}
      paused={Boolean(reduceMotion)}
      className={cn("inline-flex max-w-full", className)}
    >
      {children}
    </MetalFx>
  );
}
