"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  if (reduceMotion) {
    return (
      <div
        className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-px bg-border"
        aria-hidden="true"
      />
    );
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-primary"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
