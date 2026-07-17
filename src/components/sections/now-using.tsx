"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { AiBrandIcon } from "@/components/icons/ai-brand-icons";
import { getPrimaryModel, nowUsing } from "@/data";
import { cn } from "@/lib/utils";

/**
 * Hero-inline “now using” strip — single row, tiny footprint.
 * Brand cover + model name + icon selector. Not a section.
 */
export function NowUsingWidget({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const primary = getPrimaryModel();
  const roster = nowUsing.models.filter((m) => m.status === "active");
  const [focusId, setFocusId] = useState(primary.id);
  const [paused, setPaused] = useState(false);

  const focused = roster.find((m) => m.id === focusId) ?? primary;

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
        "inline-flex max-w-full items-center gap-2.5 rounded-full border border-border/90 bg-muted/40 py-1.5 pr-1.5 pl-1.5",
        "shadow-[0_1px_0_color-mix(in_oklch,var(--foreground)_3%,transparent)]",
        className,
      )}
      aria-label={`${nowUsing.label}: ${focused.name}`}
    >
      {/* Brand mark */}
      <span
        className={cn(
          "relative flex size-8 shrink-0 items-center justify-center rounded-full",
          "bg-foreground text-background",
        )}
        aria-hidden="true"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={focused.id}
            initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex"
          >
            <AiBrandIcon brand={focused.brand} className="size-3.5" />
          </motion.span>
        </AnimatePresence>
        <span className="absolute -right-0.5 -bottom-0.5 size-2 rounded-full border-[1.5px] border-background bg-success" />
      </span>

      {/* Copy — one tight column */}
      <div className="min-w-0 flex-1 pr-1">
        <p className="flex items-center gap-1.5 text-[9px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          {nowUsing.label}
          <span className="font-sans tracking-normal text-muted-foreground/70 normal-case">
            · {nowUsing.liveLabel}
          </span>
        </p>
        <div className="min-h-[1.1rem] overflow-hidden">
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

      {/* Brand picker */}
      <ul className="flex shrink-0 items-center gap-0.5" role="list">
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
                  "flex size-7 items-center justify-center rounded-full transition-colors duration-200",
                  isActive
                    ? "bg-foreground text-background"
                    : "text-muted-foreground hover:bg-background hover:text-foreground",
                )}
              >
                <AiBrandIcon brand={model.brand} className="size-3" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
