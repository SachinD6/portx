import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { experience } from "@/data";

export function Experience() {
  return (
    <Section id="experience" ariaLabelledBy="experience-heading">
      <Reveal className="mb-12 text-center">
        <p className="mb-3 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Experience
        </p>
        <h2
          id="experience-heading"
          className="font-display text-3xl tracking-tight text-foreground sm:text-4xl"
        >
          Where I&apos;ve been
        </h2>
      </Reveal>

      <div className="relative">
        <div
          className="absolute top-3 bottom-3 left-[0.7rem] w-px bg-border"
          aria-hidden="true"
        />

        <ul className="space-y-5">
          {experience.map((item, index) => (
            <Reveal key={item.id} as="li" delay={index * 0.06}>
              <div className="relative pl-8">
                <span
                  className="absolute top-6 left-[0.45rem] size-2.5 rounded-full border-2 border-background bg-primary"
                  aria-hidden="true"
                />
                <div className="double-bezel">
                  <div className="double-bezel-inner p-5 sm:p-6">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <p className="text-xs font-medium tracking-wide text-muted-foreground">
                        {item.start} — {item.end}
                      </p>
                      {item.location ? (
                        <p className="text-xs text-muted-foreground">
                          {item.location}
                        </p>
                      ) : null}
                    </div>
                    <h3 className="mt-2 text-lg font-medium tracking-tight text-foreground">
                      {item.role}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.company}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                    {item.highlights?.length ? (
                      <ul className="mt-4 space-y-1.5">
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
