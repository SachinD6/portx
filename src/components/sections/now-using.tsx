"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { getPrimaryModel, nowUsing } from "@/data";
import { cn } from "@/lib/utils";

/**
 * Compact “now playing” style widget — Spotify analogue for AI models.
 * Primary model rotates focus; full roster stays scannable as chips.
 */
export function NowUsing({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const primary = getPrimaryModel();
  const roster = nowUsing.models.filter((m) => m.status === "active");
  const [focusId, setFocusId] = useState(primary.id);
  const [paused, setPaused] = useState(false);

  const focused = roster.find((m) => m.id === focusId) ?? primary;

  // Gentle auto-cycle through active models (pauses on reduced motion or user pin)
  useEffect(() => {
    if (reduceMotion || paused || roster.length < 2) return;
    const id = window.setInterval(() => {
      setFocusId((current) => {
        const idx = roster.findIndex((m) => m.id === current);
        const next = roster[(idx + 1) % roster.length];
        return next?.id ?? current;
      });
    }, 4200);
    return () => window.clearInterval(id);
    // roster is module-static; only length matters for re-subscribe
    // eslint-disable-next-line react-hooks/exhaustive-deps -- stable data module
  }, [reduceMotion, paused, roster.length]);

  return (
    <div
      className={cn(
        "rounded-2xl border border-border/90 bg-surface-elevated/80 p-3.5 sm:p-4",
        "shadow-[0_1px_0_color-mix(in_oklch,var(--foreground)_4%,transparent)]",
        className,
      )}
      aria-label={`${nowUsing.label}: ${focused.name}`}
    >
      <div className="flex items-start gap-3">
        {/* “Album art” — abstract model mark */}
        <div
          className={cn(
            "relative flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border",
            "bg-primary text-primary-foreground",
          )}
          aria-hidden="true"
        >
          <span className="font-mono text-[10px] tracking-wider opacity-90">
            AI
          </span>
          {!reduceMotion ? (
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklch,white_22%,transparent),transparent_55%)]" />
          ) : null}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[10px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              {nowUsing.label}
            </p>
            <span className="inline-flex items-center gap-1.5 text-[10px] text-muted-foreground">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-success-soft opacity-70" />
                <span className="relative size-1.5 rounded-full bg-success" />
              </span>
              {nowUsing.liveLabel}
            </span>
          </div>

          <div className="mt-1 min-h-[2.75rem]">
            <motion.div
              key={focused.id}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-display text-lg leading-tight tracking-tight text-foreground sm:text-xl">
                {focused.name}
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                <span className="text-foreground/80">{focused.provider}</span>
                <span className="mx-1.5 text-border">·</span>
                {focused.role}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Roster chips — click to pin focus */}
      <ul className="mt-3 flex flex-wrap gap-1.5" role="list">
        {roster.map((model) => {
          const isActive = model.id === focused.id;
          return (
            <li key={model.id}>
              <button
                type="button"
                onClick={() => {
                  setFocusId(model.id);
                  setPaused(true);
                }}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] transition-colors duration-300 ease-[var(--ease-out-soft)]",
                  isActive
                    ? "border-foreground/20 bg-foreground text-background"
                    : "border-border bg-background/60 text-muted-foreground hover:border-foreground/15 hover:text-foreground",
                )}
                aria-pressed={isActive}
              >
                {model.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
