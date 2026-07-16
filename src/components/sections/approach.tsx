import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { approach } from "@/data";

export function Approach() {
  return (
    <Section id="approach" ariaLabelledBy="approach-heading">
      <Reveal className="mb-12 text-center">
        <p className="mb-3 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Approach
        </p>
        <h2
          id="approach-heading"
          className="font-display text-3xl tracking-tight text-foreground sm:text-4xl"
        >
          How I work
        </h2>
      </Reveal>

      <ol className="space-y-4">
        {approach.map((item, index) => (
          <Reveal key={item.id} as="li" delay={index * 0.05}>
            <div className="double-bezel">
              <div className="double-bezel-inner flex gap-5 p-5 sm:p-6">
                <span className="font-mono text-xs text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-base font-medium tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
