"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { useEffect, useSyncExternalStore } from "react";

import { person } from "@/data";

const SIZE = 28;
const HALF = SIZE / 2;
const SPRING = { damping: 20, stiffness: 160, mass: 0.55 };
const RING_SPRING = { damping: 18, stiffness: 120, mass: 0.7 };

function subscribeFinePointer(onChange: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getFinePointer() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getFinePointerServer() {
  return false;
}

/**
 * Memorable cursor companion — not a cat.
 * Soft monogram “seal” that springs after the pointer with a velocity-aware
 * orbital ring. Fine pointers only; fully hidden when reduced motion is on.
 */
export function CursorCompanion() {
  const reduceMotion = useReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointer,
    getFinePointerServer,
  );

  const enabled = Boolean(!reduceMotion && finePointer);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const rawScale = useMotionValue(1);
  const rawRing = useMotionValue(1);
  const rawOpacity = useMotionValue(0);

  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);
  const scale = useSpring(rawScale, SPRING);
  const ringScale = useSpring(rawRing, RING_SPRING);
  const opacity = useSpring(rawOpacity, { damping: 28, stiffness: 220 });

  useEffect(() => {
    if (!enabled) return;

    let lastX = 0;
    let lastY = 0;
    let lastT = performance.now();
    let hideTimer: number | undefined;

    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(now - lastT, 8);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const speed = Math.min(Math.hypot(dx, dy) / dt, 2.4);

      rawX.set(e.clientX - HALF);
      rawY.set(e.clientY - HALF);
      rawRing.set(1 + speed * 0.55);
      rawOpacity.set(1);

      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;

      if (hideTimer) window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => {
        rawRing.set(1);
      }, 140);
    };

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = Boolean(
        target.closest(
          "a, button, input, textarea, select, [role='button'], [data-cursor='interactive']",
        ),
      );
      rawScale.set(interactive ? 0.72 : 1);
      if (interactive) rawRing.set(1.35);
    };

    const onLeave = () => rawOpacity.set(0);
    const onEnter = () => rawOpacity.set(1);

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      if (hideTimer) window.clearTimeout(hideTimer);
      rawOpacity.set(0);
    };
  }, [enabled, rawX, rawY, rawScale, rawRing, rawOpacity]);

  if (!enabled) return null;

  const monogram = `${person.firstName.slice(0, 1)}${person.lastName.slice(0, 1)}`;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] mix-blend-multiply will-change-transform dark:mix-blend-difference"
      style={{ x, y, opacity }}
    >
      <motion.div
        className="relative flex items-center justify-center"
        style={{ width: SIZE, height: SIZE, scale }}
      >
        <motion.span
          className="absolute inset-[-6px] rounded-full border border-foreground/25"
          style={{ scale: ringScale }}
        />
        <span className="absolute inset-0 rounded-full bg-foreground/8 backdrop-blur-[2px]" />
        <span className="absolute inset-[3px] rounded-full border border-foreground/15 bg-background/70" />
        <span className="relative font-mono text-[9px] font-medium tracking-tight text-foreground/80">
          {monogram}
        </span>
      </motion.div>
    </motion.div>
  );
}
