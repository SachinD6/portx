"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { AiBrandIcon } from "@/components/icons/ai-brand-icons";
import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { getPrimaryModel, nowUsing } from "@/data";
import { cn } from "@/lib/utils";

/**
 * Compact “now playing” AI widget — small, branded, Spotify-like.
 * Brand marks for Grok / Kimi / Claude / GPT; sits after Experience.
 */
export function NowUsingSection() {
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
    }, 5000);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- stable data module
  }, [reduceMotion, paused, roster.length]);

  return (
    <Section id="now" ariaLabelledBy="now-heading">
      <Reveal>
        <div className="mb-3 flex items-center gap-2.5">
          <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
            02
          </span>
          <p
            id="now-heading"
            className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase"
          >
            Now
          </p>
          <span
            className="h-px max-w-12 min-w-6 flex-1 bg-border"
            aria-hidden="true"
          />
        </div>
      </Reveal>

      <Reveal delay={0.04}>
        <div
          className={cn(
            "relative max-w-md overflow-hidden rounded-2xl",
            "border border-border/90 bg-surface-elevated/90",
            "shadow-[0_1px_0_color-mix(in_oklch,var(--foreground)_4%,transparent),0_12px_40px_-24px_color-mix(in_oklch,var(--foreground)_18%,transparent)]",
          )}
          aria-label={`${nowUsing.label}: ${focused.name}`}
        >
          {/* Soft brand wash */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              background:
                "radial-gradient(120% 80% at 0% 0%, var(--foreground), transparent 55%)",
            }}
            aria-hidden="true"
          />

          <div className="relative flex items-center gap-3.5 p-3.5 sm:gap-4 sm:p-4">
            {/* Brand art — Spotify cover energy */}
            <div className="relative shrink-0">
              <div
                className={cn(
                  "flex size-12 items-center justify-center rounded-xl sm:size-[3.25rem]",
                  "bg-foreground text-background",
                  "ring-1 ring-foreground/10 ring-offset-2 ring-offset-background",
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={focused.id}
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.86 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduceMotion ? undefined : { opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="flex"
                  >
                    <AiBrandIcon brand={focused.brand} className="size-6" />
                  </motion.span>
                </AnimatePresence>
              </div>
              {!reduceMotion ? (
                <span className="absolute -right-0.5 -bottom-0.5 flex size-2.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success-soft opacity-70" />
                  <span className="relative size-2.5 rounded-full border-2 border-background bg-success" />
                </span>
              ) : (
                <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border-2 border-background bg-success" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-[10px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  {nowUsing.label}
                </p>
                <span className="text-[10px] text-muted-foreground/80">
                  {nowUsing.liveLabel}
                </span>
              </div>

              <div className="mt-0.5 min-h-[2.6rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={focused.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduceMotion ? undefined : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="truncate font-display text-lg leading-tight tracking-tight text-foreground sm:text-[1.2rem]">
                      {focused.name}
                    </p>
                    <p className="mt-0.5 truncate text-xs text-muted-foreground">
                      <span className="text-foreground/75">
                        {focused.provider}
                      </span>
                      <span className="mx-1.5 text-border">·</span>
                      {focused.role}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Brand selector — icon row */}
          <div className="relative border-t border-border/70 px-3 py-2.5 sm:px-4">
            <ul className="flex items-center gap-1.5" role="list">
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
                      title={`${model.name} · ${model.provider}`}
                      aria-label={`${model.name} by ${model.provider}`}
                      aria-pressed={isActive}
                      className={cn(
                        "inline-flex size-9 items-center justify-center rounded-full border transition-all duration-300 ease-[var(--ease-out-soft)]",
                        isActive
                          ? "border-foreground/20 bg-foreground text-background shadow-sm"
                          : "border-border/80 bg-background/60 text-muted-foreground hover:border-foreground/15 hover:text-foreground",
                      )}
                    >
                      <AiBrandIcon brand={model.brand} className="size-3.5" />
                    </button>
                  </li>
                );
              })}
              <li className="ml-auto hidden sm:block">
                <p className="font-mono text-[10px] tracking-wide text-muted-foreground/70">
                  toolkit
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
