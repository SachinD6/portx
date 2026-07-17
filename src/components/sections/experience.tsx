import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { experience } from "@/data";

export function Experience() {
  return (
    <Section id="experience" ariaLabelledBy="experience-heading">
      <Reveal>
        <SectionHeading
          id="experience-heading"
          index="05"
          eyebrow="Experience"
          title="Where I've been"
        />
      </Reveal>

      <div className="relative">
        <div
          className="absolute top-2 bottom-2 left-[0.7rem] w-px bg-border"
          aria-hidden="true"
        />

        <ul className="space-y-3">
          {experience.map((item, index) => (
            <Reveal key={item.id} as="li" delay={index * 0.05}>
              <div className="relative pl-8">
                <span
                  className="absolute top-5 left-[0.45rem] size-2.5 rounded-full border-2 border-background bg-primary shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary)_12%,transparent)]"
                  aria-hidden="true"
                />
                <div className="group double-bezel">
                  <div className="double-bezel-inner p-4 sm:p-5">
                    <div className="relative z-[1] flex flex-wrap items-baseline justify-between gap-2">
                      <p className="font-mono text-[11px] tracking-wide text-muted-foreground">
                        {item.start} — {item.end}
                      </p>
                      {item.location ? (
                        <p className="text-xs text-muted-foreground">
                          {item.location}
                        </p>
                      ) : null}
                    </div>
                    <h3 className="relative z-[1] mt-1.5 text-base font-medium tracking-tight text-foreground sm:text-lg">
                      {item.role}
                    </h3>
                    <p className="relative z-[1] text-sm text-muted-foreground">
                      {item.company}
                    </p>
                    <p className="relative z-[1] mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    {item.highlights?.length ? (
                      <ul className="relative z-[1] mt-3 space-y-1">
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
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </Section>
  );
}
