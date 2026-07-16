"use client";

import { motion, useReducedMotion } from "motion/react";
import { toast } from "sonner";

import { TextReveal } from "@/components/effects/text-reveal";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { person } from "@/data";
import { duration, easeOutExpo, fadeUp, staggerContainer } from "@/lib/motion";
import { copyToClipboard } from "@/lib/scroll";

export function Hero() {
  const reduceMotion = useReducedMotion();

  const handleCopyEmail = async () => {
    await copyToClipboard(person.email);
    toast.success("Email copied");
  };

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col items-center justify-center px-4 pt-28 pb-20"
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
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface-elevated/80 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm"
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

        <p className="mb-4 text-[11px] font-medium tracking-[0.22em] text-muted-foreground uppercase">
          {person.role}
        </p>

        <TextReveal
          text={person.name}
          as="h1"
          className="font-display text-[clamp(2.75rem,9vw,5.5rem)] leading-[0.95] tracking-tight text-foreground"
        />
        <span id="hero-heading" className="sr-only">
          {person.name}, {person.role}
        </span>

        <motion.p
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-7 max-w-xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg"
        >
          {person.headline}
        </motion.p>

        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <MagneticButton href="#work">View work</MagneticButton>
          <MagneticButton
            variant="secondary"
            showArrow={false}
            onClick={handleCopyEmail}
          >
            Copy email
          </MagneticButton>
        </motion.div>

        <motion.p
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-10 text-xs text-muted-foreground"
          transition={{
            delay: 0.2,
            duration: duration.slow,
            ease: easeOutExpo,
          }}
        >
          Press{" "}
          <kbd className="rounded-md border border-border bg-surface-elevated px-1.5 py-0.5 font-mono text-[10px]">
            ⌘K
          </kbd>{" "}
          for command palette
        </motion.p>
      </motion.div>
    </section>
  );
}
