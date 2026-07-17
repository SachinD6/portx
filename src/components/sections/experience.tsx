"use client";

import { Building2 } from "lucide-react";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data";
import { cn } from "@/lib/utils";

/**
 * Timeline experience — intentionally NOT double-bezel project cards.
 * Vertical rail + soft row surfaces keep the design language without looking like Work.
 */
export function Experience() {
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

      <div className="relative">
        {/* Timeline rail */}
        <div
          className="absolute top-2 bottom-2 left-[1.05rem] w-px bg-border sm:left-[1.15rem]"
          aria-hidden="true"
        />

        <ul className="flex flex-col gap-5 sm:gap-6">
          {experience.map((item, index) => (
            <Reveal key={item.id} as="li" delay={index * 0.05}>
              <article className="relative grid grid-cols-[2.25rem_1fr] gap-3 sm:gap-4">
                {/* Node on the rail */}
                <div className="relative z-[1] flex justify-center pt-5">
                  <span
                    className={cn(
                      "flex size-8 items-center justify-center rounded-full border-2 border-background shadow-[0_0_0_1px_var(--border)]",
                      item.current
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                    )}
                  >
                    <Building2 className="size-3.5" strokeWidth={1.5} />
                  </span>
                </div>

                {/* Content panel — flat soft shade, not project-card bezel */}
                <div
                  className={cn(
                    "rounded-2xl border border-transparent bg-muted/30 px-4 py-4 transition-colors duration-300 sm:px-5 sm:py-5",
                    "hover:border-border/80 hover:bg-muted/50",
                    item.current && "border-border/60 bg-muted/45",
                  )}
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-xl tracking-tight text-foreground sm:text-[1.35rem]">
                          {item.role}
                        </h3>
                        {item.current ? (
                          <span className="rounded-full bg-success/12 px-2 py-0.5 text-[10px] font-medium tracking-wide text-success uppercase">
                            Current
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-0.5 text-sm text-foreground/85">
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
                      <p className="mt-0.5 text-xs text-muted-foreground">
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
                    <ul className="mt-3 space-y-1.5 border-l-2 border-border/80 pl-3">
                      {item.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="text-sm leading-relaxed text-foreground/85"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  {item.stack?.length ? (
                    <ul className="mt-3.5 flex flex-wrap gap-1.5">
                      {item.stack.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-md bg-background/80 px-2 py-0.5 text-[11px] text-muted-foreground ring-1 ring-border/70"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
