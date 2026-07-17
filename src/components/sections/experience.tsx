"use client";

import { motion, useReducedMotion } from "motion/react";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data";
import { springSoft } from "@/lib/motion";

/**
 * Job history — same double-bezel surface language as work cards.
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
                reduceMotion ? undefined : { y: -3, transition: springSoft }
              }
              className="group double-bezel"
            >
              <div className="double-bezel-inner relative p-5 sm:p-6">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 space-y-1">
                    {item.current ? (
                      <p className="inline-flex rounded-full border border-border bg-background/70 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                        Current
                      </p>
                    ) : null}
                    <h3 className="font-display text-xl tracking-tight text-foreground sm:text-2xl">
                      {item.role}
                    </h3>
                    <p className="text-sm text-muted-foreground">
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
                      <span className="mx-1.5 text-border" aria-hidden="true">
                        ·
                      </span>
                      <span className="font-mono text-xs">
                        {item.start} — {item.end}
                      </span>
                    </p>
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <p className="mt-3 max-w-prose text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>

                {item.highlights?.length ? (
                  <ul className="mt-4 space-y-2 border-t border-border/70 pt-4">
                    {item.highlights.map((highlight) => (
                      <li
                        key={highlight}
                        className="flex gap-2.5 text-sm leading-relaxed text-foreground/90"
                      >
                        <span
                          className="mt-2 size-1 shrink-0 rounded-full bg-primary/70"
                          aria-hidden="true"
                        />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                  {(item.location ||
                    item.locationType ||
                    item.employmentType) && (
                    <p className="text-xs text-muted-foreground">
                      {[item.location, item.locationType, item.employmentType]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                </div>

                {item.stack?.length ? (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] tracking-wide text-muted-foreground"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            </motion.article>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
