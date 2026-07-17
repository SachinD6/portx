"use client";

import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

import {
  GithubIcon,
  GlobeIcon,
  LinkedinIcon,
  MailIcon,
  XIcon,
} from "@/components/icons/social-icons";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { experience, person, product, socials } from "@/data";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { copyToClipboard } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  mail: MailIcon,
  globe: GlobeIcon,
} as const;

/**
 * Compact profile intro inspired by chanhdai.com / ramx.in —
 * identity + overview + socials, not a full-viewport marketing hero.
 */
export function ProfileHero() {
  const reduceMotion = useReducedMotion();
  const [lit, setLit] = useState(true);
  const currentRole = experience.find((e) => e.current) ?? experience[0];

  const handleCopyEmail = async () => {
    await copyToClipboard(person.email);
    toast.success("Email copied");
  };

  return (
    <section
      id="top"
      className="px-4 pt-28 pb-8 sm:pt-32 sm:pb-10"
      aria-labelledby="hero-heading"
    >
      <motion.div
        className="content-shell"
        variants={reduceMotion ? undefined : staggerContainer}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
      >
        {/* Avatar + identity */}
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="flex items-start gap-4 sm:gap-5"
        >
          <button
            type="button"
            onClick={() => setLit((v) => !v)}
            className={cn(
              "relative flex size-16 shrink-0 items-center justify-center rounded-2xl border text-lg font-semibold tracking-tight transition-all duration-500 ease-[var(--ease-out-expo)] sm:size-[4.5rem] sm:text-xl",
              lit
                ? "border-border bg-primary text-primary-foreground shadow-[0_0_0_1px_color-mix(in_oklch,var(--primary)_20%,transparent),0_12px_40px_color-mix(in_oklch,var(--primary)_18%,transparent)]"
                : "border-border bg-muted text-muted-foreground",
            )}
            aria-label={lit ? "Dim monogram" : "Light monogram"}
            title="Toggle monogram"
          >
            {person.firstName.slice(0, 1)}
            {person.lastName.slice(0, 1)}
            <span
              className={cn(
                "absolute -right-1 -bottom-1 size-3 rounded-full border-2 border-background transition-colors",
                lit ? "bg-success" : "bg-muted-foreground/40",
              )}
            />
          </button>

          <div className="min-w-0 pt-0.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface-elevated px-2.5 py-0.5 text-[11px] text-muted-foreground">
                <span className="relative flex size-1.5">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success-soft opacity-70" />
                  <span className="relative size-1.5 rounded-full bg-success" />
                </span>
                {person.availability.label}
              </span>
            </div>
            <h1
              id="hero-heading"
              className="mt-2 font-display text-[clamp(2rem,6vw,2.75rem)] leading-[1.05] tracking-tight text-foreground"
            >
              {person.name}
            </h1>
            <p className="mt-1.5 text-sm text-muted-foreground sm:text-[0.95rem]">
              {person.headline}
            </p>
          </div>
        </motion.div>

        {/* Overview panel — chanhdai-style facts */}
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-7 overflow-hidden rounded-2xl border border-border bg-surface-elevated/80"
        >
          <div className="border-b border-border px-4 py-2.5 sm:px-5">
            <p className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
              Overview
            </p>
          </div>
          <dl className="divide-y divide-border">
            <div className="grid gap-1 px-4 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-4 sm:px-5">
              <dt className="text-xs text-muted-foreground">Role</dt>
              <dd className="text-sm text-foreground">
                <span className="font-medium">{person.role}</span>
                {currentRole ? (
                  <>
                    <span className="text-muted-foreground"> @ </span>
                    <a
                      href="#experience"
                      className="font-medium underline-offset-4 transition-colors hover:underline"
                    >
                      {currentRole.company}
                    </a>
                  </>
                ) : null}
              </dd>
            </div>
            <div className="grid gap-1 px-4 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-4 sm:px-5">
              <dt className="text-xs text-muted-foreground">Focus</dt>
              <dd className="text-sm text-foreground">{person.positioning}</dd>
            </div>
            <div className="grid gap-1 px-4 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-4 sm:px-5">
              <dt className="text-xs text-muted-foreground">Location</dt>
              <dd className="text-sm text-foreground">{person.location}</dd>
            </div>
            <div className="grid gap-1 px-4 py-3 sm:grid-cols-[7.5rem_1fr] sm:gap-4 sm:px-5">
              <dt className="text-xs text-muted-foreground">Email</dt>
              <dd className="text-sm">
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="font-mono text-foreground underline-offset-4 transition-colors hover:underline"
                >
                  {person.email}
                </button>
              </dd>
            </div>
          </dl>
        </motion.div>

        {/* Social row */}
        <motion.ul
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-5 flex flex-wrap gap-2"
        >
          {socials.map((social) => {
            const Icon = iconMap[social.icon];
            return (
              <li key={social.id}>
                <a
                  href={social.href}
                  target={social.icon === "mail" ? undefined : "_blank"}
                  rel={
                    social.icon === "mail" ? undefined : "noopener noreferrer"
                  }
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground",
                    "transition-all duration-300 ease-[var(--ease-out-soft)]",
                    "hover:-translate-y-0.5 hover:border-foreground/20 hover:bg-foreground hover:text-background",
                  )}
                >
                  <Icon className="size-3.5" />
                  {social.label}
                </a>
              </li>
            );
          })}
        </motion.ul>

        {/* Bio */}
        <motion.p
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]"
        >
          {person.bio}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-6 flex flex-wrap gap-2.5"
        >
          <MagneticButton href="#experience" showArrow={false}>
            View experience
          </MagneticButton>
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
          <MagneticButton href="#work" variant="ghost" showArrow={false}>
            Case studies
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
