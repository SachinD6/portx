import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { approach } from "@/data";

export function Approach() {
  return (
    <Section id="approach" ariaLabelledBy="approach-heading">
      <Reveal>
        <SectionHeading
          id="approach-heading"
          index="04"
          eyebrow="Approach"
          title="How I work"
        />
      </Reveal>

      <div className="grid gap-3 sm:grid-cols-3">
        {approach.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.05}>
            <div className="group double-bezel h-full">
              <div className="double-bezel-inner flex h-full flex-col p-4 sm:p-5">
                <span className="font-mono text-[11px] text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-base font-medium tracking-tight text-foreground">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
