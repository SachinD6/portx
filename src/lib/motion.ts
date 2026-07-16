import type { Transition, Variants } from "motion/react";

export const easeOutExpo: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const easeOutSoft: [number, number, number, number] = [0.32, 0.72, 0, 1];

export const duration = {
  fast: 0.2,
  normal: 0.45,
  slow: 0.7,
  slower: 1,
} as const;

export const springSoft: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
  mass: 0.8,
};

export const springSnappy: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 32,
};

export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: duration.slow,
      ease: easeOutExpo,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: duration.normal, ease: easeOutSoft },
  },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const staggerFast: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.035,
      delayChildren: 0.05,
    },
  },
};

export const letterReveal: Variants = {
  hidden: { opacity: 0, y: "0.45em" },
  visible: {
    opacity: 1,
    y: "0em",
    transition: {
      duration: duration.slow,
      ease: easeOutExpo,
    },
  },
};

export const viewportOnce = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -8% 0px",
} as const;
