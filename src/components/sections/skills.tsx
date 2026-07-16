import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { skills } from "@/data";
import { cn } from "@/lib/utils";

export function Skills() {
  return (
    <Section id="stack" ariaLabelledBy="stack-heading">
      <Reveal>
        <SectionHeading
          id="stack-heading"
          index="04"
          eyebrow="Stack"
          title="Tools I reach for"
          description="Curated on purpose—not a logo wall of everything I’ve ever touched."
        />
      </Reveal>

      <Reveal>
        <div className="double-bezel">
          <div className="double-bezel-inner overflow-hidden">
            <ul className="divide-y divide-border/80">
              {skills.map((cluster, index) => (
                <li
                  key={cluster.id}
                  className={cn(
                    "group grid gap-3 px-5 py-5 transition-colors duration-300 ease-[var(--ease-out-soft)] sm:grid-cols-[8.5rem_1fr] sm:items-start sm:gap-8 sm:px-7 sm:py-6",
                    "hover:bg-muted/40",
                  )}
                >
                  <div className="flex items-baseline gap-2.5 sm:flex-col sm:gap-1">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-medium tracking-tight text-foreground">
                      {cluster.title}
                    </h3>
                  </div>

                  <ul className="flex flex-wrap gap-2">
                    {cluster.items.map((item) => (
                      <li key={item}>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full border border-transparent bg-background px-3 py-1.5 text-sm text-muted-foreground",
                            "shadow-[inset_0_0_0_1px_color-mix(in_oklch,var(--border)_90%,transparent)]",
                            "transition-all duration-300 ease-[var(--ease-out-soft)]",
                            "group-hover:border-border group-hover:text-foreground group-hover:shadow-none",
                          )}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
