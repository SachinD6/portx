"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getPrimaryModel, nowUsing } from "@/data";
import { cn } from "@/lib/utils";

/**
 * Homepage “Now using” section — sits after Experience as a personality beat
 * (ramx Spotify-widget energy, AI models instead of last song).
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
    }, 4200);
    return () => window.clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- stable data module
  }, [reduceMotion, paused, roster.length]);

  return (
    <Section id="now" ariaLabelledBy="now-heading">
      <Reveal>
        <SectionHeading
          id="now-heading"
          index="02"
          eyebrow="Now"
          title="Models in rotation"
          description="What I’m thinking with day-to-day—primary tools, not a laundry list."
        />
      </Reveal>

      <Reveal delay={0.05}>
        <div
          className={cn(
            "rounded-2xl border border-border/90 bg-muted/35 p-4 sm:p-5",
            "transition-colors duration-300 hover:border-border hover:bg-muted/50",
          )}
          aria-label={`${nowUsing.label}: ${focused.name}`}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5">
            {/* “Album art” mark */}
            <div
              className={cn(
                "relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border",
                "bg-primary text-primary-foreground sm:size-16",
              )}
              aria-hidden="true"
            >
              <span className="font-mono text-[11px] tracking-[0.14em] opacity-90">
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

              <div className="mt-1.5 min-h-[3rem]">
                <motion.div
                  key={focused.id}
                  initial={reduceMotion ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p className="font-display text-xl leading-tight tracking-tight text-foreground sm:text-2xl">
                    {focused.name}
                  </p>
                  <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                    <span className="text-foreground/85">
                      {focused.provider}
                    </span>
                    <span className="mx-1.5 text-border">·</span>
                    {focused.role}
                  </p>
                </motion.div>
              </div>

              <ul className="mt-4 flex flex-wrap gap-1.5" role="list">
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
                          "rounded-full border px-3 py-1.5 text-[11px] transition-colors duration-300 ease-[var(--ease-out-soft)]",
                          isActive
                            ? "border-foreground/20 bg-foreground text-background"
                            : "border-border bg-background/70 text-muted-foreground hover:border-foreground/15 hover:text-foreground",
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
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
