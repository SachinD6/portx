import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { skills } from "@/data";
import { cn } from "@/lib/utils";

const bandStyles = ["bg-muted/35", "bg-muted/50", "bg-muted/40"] as const;

export function Skills() {
  return (
    <Section id="stack" ariaLabelledBy="stack-heading">
      <Reveal>
        <SectionHeading
          id="stack-heading"
          index="06"
          eyebrow="Stack"
          title="Tools"
          description="Curated clusters—not a logo wall of everything I’ve ever touched."
        />
      </Reveal>

      <div className="space-y-2.5">
        {skills.map((cluster, index) => (
          <Reveal key={cluster.id} delay={index * 0.04}>
            <div
              className={cn(
                "rounded-2xl border border-border/70 px-4 py-4 sm:px-5 sm:py-5",
                bandStyles[index % bandStyles.length],
              )}
            >
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-semibold tracking-tight text-foreground">
                    {cluster.title}
                  </h3>
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {cluster.items.length} tools
                </span>
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {cluster.items.map((item) => (
                  <li key={item}>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-lg bg-background/75 px-2.5 py-1.5 text-xs text-foreground/85",
                        "ring-1 ring-border/80 transition-colors duration-200",
                        "hover:text-foreground hover:ring-foreground/20",
                      )}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
