"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useSyncExternalStore } from "react";

/**
 * Sit / run SVG companion (oneko-style behaviour, unique craft).
 * Geometric paper fox — sits when idle, runs toward the pointer.
 * Normal OS cursor stays; fine pointer only; off when reduced motion.
 */

const SIZE = 40;
const SPEED = 3.4;
const ARRIVE = 52;
const FRAME_MS = 110;

type Pose = "sit" | "run-a" | "run-b";

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

const SIT_PATHS = `
  <path fill="currentColor" d="M6 24c-2.5 1-4.5 3.5-4 5.5 2.2.4 4.2-1 5.5-2.8L9 24c-1-.2-2 0-3 0Z"/>
  <ellipse cx="18" cy="26" rx="10" ry="7.5" fill="currentColor"/>
  <ellipse cx="11" cy="29" rx="4" ry="4.5" fill="currentColor"/>
  <circle cx="26" cy="18" r="7" fill="currentColor"/>
  <path fill="currentColor" d="M21 12.5 20 5.5 25 11.5Z"/>
  <path fill="currentColor" d="M28 11.5 32.5 5 33 12.5Z"/>
  <ellipse cx="31.5" cy="20" rx="3.2" ry="2.4" fill="currentColor"/>
  <ellipse cx="22" cy="32.5" rx="2.2" ry="1.6" fill="currentColor"/>
  <ellipse cx="27" cy="32.5" rx="2.2" ry="1.6" fill="currentColor"/>
  <circle cx="27.5" cy="17" r="1.15" fill="var(--background)"/>
`;

const RUN_A_PATHS = `
  <path fill="currentColor" d="M4 18c-1.5 2-1 4.5 1 5.5 1.5-1.2 3-3 3.5-4.5L7 18H4Z"/>
  <ellipse cx="18" cy="22" rx="11" ry="6" fill="currentColor"/>
  <circle cx="28" cy="16" r="6.5" fill="currentColor"/>
  <path fill="currentColor" d="M24 11 23 5l4.5 5.5Z"/>
  <path fill="currentColor" d="M30 10.5 34 4.5 34.5 11.5Z"/>
  <ellipse cx="33" cy="17.5" rx="3" ry="2.2" fill="currentColor"/>
  <path fill="currentColor" d="M12 27c-1 2.5-3 5-2 6.5 2-.2 3.5-2 4.5-4L12 27Z"/>
  <path fill="currentColor" d="M22 26c.5 2.5 2 5.5 1 7 2 0 3.5-2.5 4-5L22 26Z"/>
  <path fill="currentColor" d="M16 25c1.5 2 4 4 5.5 3.5-.5-2-1.5-3.5-3-5L16 25Z"/>
  <circle cx="29.5" cy="15" r="1.1" fill="var(--background)"/>
`;

const RUN_B_PATHS = `
  <path fill="currentColor" d="M5 20c-2 1.5-2.5 4 0 5 1.2-1.5 2.8-3 3.2-4.5L7 19.5 5 20Z"/>
  <ellipse cx="18" cy="22.5" rx="10.5" ry="5.8" fill="currentColor"/>
  <circle cx="28" cy="16.5" r="6.5" fill="currentColor"/>
  <path fill="currentColor" d="M24 11.5 22.5 5.5 28 11Z"/>
  <path fill="currentColor" d="M30 11 33.5 5 35 12Z"/>
  <ellipse cx="33" cy="18" rx="3" ry="2.2" fill="currentColor"/>
  <path fill="currentColor" d="M14 26c1.2 2.5 1 5.5-.5 7 2.2.2 4-2 5-4.5L14 26Z"/>
  <path fill="currentColor" d="M24 26c-1 2.5-3.5 5-3 6.5 2.2 0 4-2.2 5-4.8L24 26Z"/>
  <path fill="currentColor" d="M18 25c-1.5 2-2 4.5-1 6 2-.5 3.5-2.5 4-4.5L18 25Z"/>
  <circle cx="29.5" cy="15.5" r="1.1" fill="var(--background)"/>
`;

const POSE_MARKUP: Record<Pose, string> = {
  sit: SIT_PATHS,
  "run-a": RUN_A_PATHS,
  "run-b": RUN_B_PATHS,
};

export function CursorCompanion() {
  const reduceMotion = useReducedMotion();
  const finePointer = useSyncExternalStore(
    subscribeFinePointer,
    getFinePointer,
    getFinePointerServer,
  );
  const enabled = Boolean(!reduceMotion && finePointer);

  const rootRef = useRef<HTMLDivElement>(null);
  const flipRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const mouseRef = useRef({ x: 0, y: 0 });
  const poseRef = useRef<Pose>("sit");
  const frameRef = useRef(0);
  const lastFrameAt = useRef(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;

    const setPose = (next: Pose) => {
      if (poseRef.current === next) return;
      poseRef.current = next;
      const svg = svgRef.current;
      if (svg) svg.innerHTML = POSE_MARKUP[next];
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (!startedRef.current) {
        posRef.current = { x: e.clientX - SIZE, y: e.clientY + 8 };
        startedRef.current = true;
        const root = rootRef.current;
        if (root) root.style.opacity = "1";
      }
    };

    const onLeave = () => {
      const root = rootRef.current;
      if (root) root.style.opacity = "0";
    };

    const onEnter = () => {
      if (!startedRef.current) return;
      const root = rootRef.current;
      if (root) root.style.opacity = "1";
    };

    let raf = 0;

    const tick = (now: number) => {
      const mouse = mouseRef.current;
      const pos = posRef.current;
      const dx = mouse.x - pos.x - SIZE / 2;
      const dy = mouse.y - pos.y - SIZE / 2;
      const dist = Math.hypot(dx, dy);

      if (dist > ARRIVE) {
        const step = Math.min(SPEED, dist - ARRIVE + 0.5);
        pos.x += (dx / dist) * step;
        pos.y += (dy / dist) * step;

        if (Math.abs(dx) > 0.5 && flipRef.current) {
          flipRef.current.style.transform = dx < 0 ? "scaleX(-1)" : "scaleX(1)";
        }

        if (now - lastFrameAt.current > FRAME_MS) {
          lastFrameAt.current = now;
          frameRef.current += 1;
          setPose(frameRef.current % 2 === 0 ? "run-a" : "run-b");
        }
      } else {
        setPose("sit");
      }

      const root = rootRef.current;
      if (root) {
        root.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }

      raf = window.requestAnimationFrame(tick);
    };

    // Seed sit markup
    if (svgRef.current) svgRef.current.innerHTML = POSE_MARKUP.sit;

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    raf = window.requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      window.cancelAnimationFrame(raf);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={rootRef}
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[70] text-foreground will-change-transform"
      style={{
        width: SIZE,
        height: SIZE,
        opacity: 0,
        transition: "opacity 180ms ease",
      }}
    >
      <div ref={flipRef} className="origin-center">
        <svg
          ref={svgRef}
          viewBox="0 0 40 40"
          width={SIZE}
          height={SIZE}
          className="drop-shadow-sm"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
