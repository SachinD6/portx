"use client";

import { motion, useReducedMotion } from "motion/react";
import { useSyncExternalStore } from "react";
import { toast } from "sonner";

import { TextReveal } from "@/components/effects/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { person, product, stats } from "@/data";
import { duration, easeOutExpo, fadeUp, staggerContainer } from "@/lib/motion";
import {
  getModKeyLabel,
  getServerModKeyLabel,
  subscribeNoop,
} from "@/lib/platform";
import { copyToClipboard, scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function Hero() {
  const reduceMotion = useReducedMotion();
  const modKey = useSyncExternalStore(
    subscribeNoop,
    getModKeyLabel,
    getServerModKeyLabel,
  );

  const handleCopyEmail = async () => {
    await copyToClipboard(person.email);
    toast.success("Email copied");
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[min(100dvh,52rem)] flex-col items-center justify-center px-4 pt-24 pb-12 sm:pt-28 sm:pb-14"
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="content-shell flex flex-col items-center text-center"
        variants={reduceMotion ? undefined : staggerContainer}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
      >
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated/80 px-3 py-1.5 text-xs text-muted-foreground shadow-[inset_0_1px_0_color-mix(in_oklch,white_50%,transparent)] backdrop-blur-sm"
        >
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-success-soft opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-success" />
          </span>
          {person.availability.label}
          <span className="text-border" aria-hidden="true">
            ·
          </span>
          <span>{person.location}</span>
        </motion.div>

        <motion.p
          variants={reduceMotion ? undefined : fadeUp}
          className="mb-3 text-[11px] font-medium tracking-[0.22em] text-muted-foreground uppercase"
        >
          {person.role}
        </motion.p>

        <div className="relative">
          <TextReveal
            text={person.name}
            as="h1"
            className="font-display text-[clamp(2.6rem,9.5vw,5.25rem)] leading-[0.92] tracking-tight text-foreground"
          />
          <span
            className={cn(
              "mx-auto mt-3 block h-px w-[min(12rem,40%)] bg-primary/70",
              !reduceMotion && "ink-underline",
            )}
            aria-hidden="true"
          />
        </div>
        <span id="hero-heading" className="sr-only">
          {person.name}, {person.role}
        </span>

        <motion.p
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-5 max-w-lg text-[0.95rem] leading-relaxed text-balance text-muted-foreground sm:text-base"
        >
          {person.headline}
        </motion.p>

        <motion.p
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground/90"
        >
          {person.positioning}
        </motion.p>

        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-7 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton href="#work">View case studies</MagneticButton>
          {product.bookingUrl ? (
            <MagneticButton
              href={product.bookingUrl}
              external
              variant="secondary"
            >
              {product.bookingLabel}
            </MagneticButton>
          ) : (
            <MagneticButton
              variant="secondary"
              showArrow={false}
              onClick={handleCopyEmail}
            >
              Copy email
            </MagneticButton>
          )}
        </motion.div>

        <motion.dl
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-10 grid w-full max-w-lg grid-cols-2 gap-2 sm:max-w-2xl sm:grid-cols-4 sm:gap-0 sm:overflow-hidden sm:rounded-2xl sm:border sm:border-border sm:bg-surface-elevated/80"
        >
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={cn(
                "flex flex-col items-center rounded-2xl border border-border bg-surface-elevated/80 px-3 py-3.5 text-center",
                "sm:rounded-none sm:border-0 sm:bg-transparent sm:px-4 sm:py-3.5",
                index > 0 && "sm:border-l sm:border-border",
              )}
            >
              <dt className="text-[10px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                {stat.label}
              </dt>
              <dd className="mt-1 text-sm font-medium tracking-tight text-foreground">
                {stat.value}
              </dd>
            </div>
          ))}
        </motion.dl>

        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-8 flex flex-col items-center gap-3"
          transition={{
            delay: 0.12,
            duration: duration.slow,
            ease: easeOutExpo,
          }}
        >
          <p className="text-xs text-muted-foreground">
            Press{" "}
            <kbd className="rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-foreground">
              {modKey}+K
            </kbd>{" "}
            to navigate
          </p>

          <button
            type="button"
            onClick={() => scrollToSection("work")}
            className="group flex flex-col items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="Scroll to work"
          >
            <span className="text-[10px] tracking-[0.18em] uppercase">
              Scroll
            </span>
            <span className="flex h-7 w-5 items-start justify-center rounded-full border border-border pt-1.5 transition-colors group-hover:border-foreground/30">
              <span className="scroll-cue-dot size-1 rounded-full bg-foreground/70" />
            </span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
