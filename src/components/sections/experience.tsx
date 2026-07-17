"use client";

import { motion, useReducedMotion } from "motion/react";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data";
import { cn } from "@/lib/utils";

/**
 * Job history — primary signal for recruiters (ramx / chanhdai style).
 * Placed near the top of the page on purpose.
 */
export function Experience() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="experience" ariaLabelledBy="experience-heading">
      <Reveal>
        <SectionHeading
          id="experience-heading"
          index="01"
          eyebrow="Experience"
          title="Where I ship"
          description="The strongest signal on this site—roles, ownership, and the stack I used to deliver."
        />
      </Reveal>

      <ul className="space-y-3">
        {experience.map((item, index) => (
          <Reveal key={item.id} as="li" delay={index * 0.05}>
            <motion.article
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      y: -2,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      },
                    }
              }
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border bg-surface-elevated/90",
                "transition-[border-color,box-shadow] duration-300 ease-[var(--ease-out-soft)]",
                "hover:border-foreground/15 hover:shadow-[0_16px_40px_color-mix(in_oklch,var(--foreground)_5%,transparent)]",
              )}
            >
              {/* Current accent bar */}
              {item.current ? (
                <span
                  className="absolute inset-y-0 left-0 w-0.5 bg-primary"
                  aria-hidden="true"
                />
              ) : null}

              <div className="p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-semibold tracking-tight text-foreground sm:text-lg">
                        {item.role}
                      </h3>
                      {item.current ? (
                        <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-medium tracking-wide text-success uppercase">
                          Current
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm text-foreground/90">
                      {item.companyUrl ? (
                        <a
                          href={item.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline-offset-4 hover:underline"
                        >
                          {item.company}
                        </a>
                      ) : (
                        item.company
                      )}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="font-mono text-[11px] text-muted-foreground tabular-nums">
                      {item.start} — {item.end}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {[item.location, item.locationType, item.employmentType]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                {item.highlights?.length ? (
                  <ul className="mt-3 space-y-1.5">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-2 text-sm text-foreground/85"
                      >
                        <span
                          className="mt-2 size-1 shrink-0 rounded-full bg-primary/70"
                          aria-hidden="true"
                        />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                ) : null}

                {item.stack?.length ? (
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <li
                        key={tech}
                        className="rounded-full border border-border bg-background/80 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors group-hover:border-border group-hover:text-foreground/80"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </motion.article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
