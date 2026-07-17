import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { skills } from "@/data";

export function Skills() {
  return (
    <Section id="stack" ariaLabelledBy="stack-heading">
      <Reveal>
        <SectionHeading
          id="stack-heading"
          index="05"
          eyebrow="Stack"
          title="Tools"
          description="Curated clusters—not a logo wall of everything I’ve ever touched."
        />
      </Reveal>

      <Reveal>
        <div className="double-bezel">
          <div className="double-bezel-inner overflow-hidden">
            <ul className="divide-y divide-border/80">
              {skills.map((cluster, index) => (
                <li
                  key={cluster.id}
                  className="grid gap-3 px-5 py-4 transition-colors hover:bg-muted/30 sm:grid-cols-[8rem_1fr] sm:items-start sm:gap-6 sm:px-6"
                >
                  <div className="flex items-baseline gap-2 sm:flex-col sm:gap-0.5">
                    <span className="font-mono text-[11px] text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-sm font-medium tracking-tight text-foreground">
                      {cluster.title}
                    </h3>
                  </div>
                  <ul className="flex flex-wrap gap-1.5">
                    {cluster.items.map((item) => (
                      <li
                        key={item}
                        className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] tracking-wide text-muted-foreground"
                      >
                        {item}
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
