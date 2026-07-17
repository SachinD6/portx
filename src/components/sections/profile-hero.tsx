"use client";

import { Briefcase, Crosshair, Mail, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState, type ReactNode } from "react";
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

type OverviewItemProps = {
  icon: ReactNode;
  label: string;
  children: ReactNode;
};

function OverviewItem({ icon, label, children }: OverviewItemProps) {
  return (
    <div
      className={cn(
        "flex gap-3 rounded-xl border border-border/70 bg-muted/40 px-3.5 py-3",
        "transition-colors duration-300 ease-[var(--ease-out-soft)]",
        "hover:border-border hover:bg-muted/65",
      )}
    >
      <span
        className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-surface-elevated text-foreground/80"
        aria-hidden="true"
      >
        {icon}
      </span>
      <div className="min-w-0 pt-0.5">
        <p className="text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
          {label}
        </p>
        <div className="mt-0.5 text-sm leading-snug text-foreground">
          {children}
        </div>
      </div>
    </div>
  );
}

/**
 * Compact profile intro — open overview with icon tiles (no single big card).
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

        {/* Overview — icon tiles, soft shade, no single enclosing card */}
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-8"
        >
          <div className="mb-3 flex items-center gap-2.5">
            <p className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Overview
            </p>
            <span
              className="h-px max-w-12 min-w-6 flex-1 bg-border"
              aria-hidden="true"
            />
          </div>

          <div className="grid gap-2.5 sm:grid-cols-2">
            <OverviewItem
              icon={<Briefcase className="size-4" strokeWidth={1.5} />}
              label="Role"
            >
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
            </OverviewItem>

            <OverviewItem
              icon={<Crosshair className="size-4" strokeWidth={1.5} />}
              label="Focus"
            >
              {person.positioning}
            </OverviewItem>

            <OverviewItem
              icon={<MapPin className="size-4" strokeWidth={1.5} />}
              label="Location"
            >
              {person.location}
            </OverviewItem>

            <OverviewItem
              icon={<Mail className="size-4" strokeWidth={1.5} />}
              label="Email"
            >
              <button
                type="button"
                onClick={handleCopyEmail}
                className="text-left font-mono underline-offset-4 transition-colors hover:underline"
              >
                {person.email}
              </button>
            </OverviewItem>
          </div>
        </motion.div>

        <motion.ul
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-6 flex flex-wrap gap-2"
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

        <motion.p
          variants={reduceMotion ? undefined : fadeUp}
          className="mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]"
        >
          {person.bio}
        </motion.p>

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
