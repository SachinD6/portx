import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { skills } from "@/data";

export function Skills() {
  return (
    <Section id="stack" ariaLabelledBy="stack-heading">
      <Reveal className="mb-12 text-center">
        <p className="mb-3 text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Stack
        </p>
        <h2
          id="stack-heading"
          className="font-display text-3xl tracking-tight text-foreground sm:text-4xl"
        >
          Tools I reach for
        </h2>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          Curated on purpose—not a logo wall of everything I&apos;ve ever
          touched.
        </p>
      </Reveal>

      <div className="grid gap-4 sm:grid-cols-3">
        {skills.map((cluster, index) => (
          <Reveal key={cluster.id} delay={index * 0.05}>
            <div className="double-bezel h-full">
              <div className="double-bezel-inner flex h-full flex-col p-5 sm:p-6">
                <h3 className="text-sm font-medium tracking-tight text-foreground">
                  {cluster.title}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cluster.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-background/70 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
