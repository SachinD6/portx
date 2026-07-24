"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { ThinkingOrb, type OrbState } from "@/components/effects/thinking-orb";
import { AiBrandIcon } from "@/components/icons/ai-brand-icons";
import { getPrimaryModel, nowUsing } from "@/data";
import { cn } from "@/lib/utils";

/** Map each model to an agent-style orb verb */
const modelOrbState: Record<string, OrbState> = {
  "grok-4-5": "working",
  "kimi-k3": "searching",
  "claude-sonnet": "composing",
  "gpt-5": "solving",
};

/**
 * Hero-inline “now using” strip.
 * Thinking orb (thinking-orbs) for AI liveness; brand chips for model pick.
 */
export function NowUsingWidget({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const primary = getPrimaryModel();
  const roster = nowUsing.models.filter((m) => m.status === "active");
  const [focusId, setFocusId] = useState(primary.id);
  const [paused, setPaused] = useState(false);

  const focused = roster.find((m) => m.id === focusId) ?? primary;
  const orbState = modelOrbState[focused.id] ?? "listening";

  useEffect(() => {
    if (reduceMotion || paused || roster.length < 2) return;
    const id = window.setInterval(() => {
      setFocusId((current) => {
        const idx = roster.findIndex((m) => m.id === current);
        const next = roster[(idx + 1) % roster.length];
        return next?.id ?? current;
      });
    }, 5200);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- stable data module
  }, [reduceMotion, paused, roster.length]);

  return (
    <div
      className={cn(
        "flex w-full max-w-full flex-col gap-2 rounded-2xl border border-border/90 bg-muted/40 p-2",
        "shadow-[0_1px_0_color-mix(in_oklch,var(--foreground)_3%,transparent)]",
        "sm:inline-flex sm:w-auto sm:flex-row sm:items-center sm:gap-2.5 sm:rounded-full sm:py-1.5 sm:pr-1.5 sm:pl-1.5",
        className,
      )}
      aria-label={`${nowUsing.label}: ${focused.name}`}
    >
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        {/* thinking-orbs — agent liveness, not brand logo */}
        <span
          className="flex size-9 shrink-0 items-center justify-center sm:size-8"
          aria-hidden="true"
        >
          <ThinkingOrb
            state={orbState}
            size={20}
            aria-label={`${focused.name} · ${orbState}`}
          />
        </span>

        <div className="min-w-0 flex-1 pr-0.5 sm:pr-1">
          <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 text-[9px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
            {nowUsing.label}
            <span className="font-sans tracking-normal text-muted-foreground/70 normal-case">
              · {nowUsing.liveLabel}
            </span>
          </p>
          <div className="min-h-[1.15rem] overflow-hidden">
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={focused.id}
                initial={reduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -3 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                className="truncate text-[13px] leading-tight font-medium text-foreground"
              >
                {focused.name}
                <span className="font-normal text-muted-foreground">
                  {" "}
                  · {focused.provider}
                </span>
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <ul
        className="flex shrink-0 items-center justify-end gap-0.5 border-t border-border/60 pt-1.5 sm:border-0 sm:pt-0"
        role="list"
      >
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
                title={model.name}
                aria-label={model.name}
                aria-pressed={isActive}
                className={cn(
                  "flex size-9 items-center justify-center rounded-full transition-colors duration-200 sm:size-7",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-background hover:text-foreground",
                )}
              >
                <AiBrandIcon
                  brand={model.brand}
                  className="size-3.5 sm:size-3"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
