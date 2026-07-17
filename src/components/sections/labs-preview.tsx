import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { labs } from "@/data";
import { cn } from "@/lib/utils";

const statusLabel = {
  shipped: "Shipped",
  experiment: "Experiment",
  wip: "WIP",
} as const;

export function LabsPreview() {
  const items = labs.slice(0, 4);

  return (
    <Section id="labs" ariaLabelledBy="labs-heading">
      <Reveal>
        <SectionHeading
          id="labs-heading"
          index="05"
          eyebrow="Labs"
          title="Components & experiments"
          description="Useful bits you can learn from—value that makes the site worth revisiting."
        />
      </Reveal>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.04}>
            <div className="group double-bezel h-full">
              <div className="double-bezel-inner flex h-full flex-col p-5">
                <span
                  className={cn(
                    "w-fit rounded-full border border-border bg-background/70 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] uppercase",
                    item.status === "shipped" && "text-success",
                    item.status === "experiment" && "text-muted-foreground",
                    item.status === "wip" && "text-primary",
                  )}
                >
                  {statusLabel[item.status]}
                </span>
                <h3 className="mt-3 font-display text-lg tracking-tight text-foreground">
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-primary"
                    >
                      {item.title}
                    </Link>
                  ) : (
                    item.title
                  )}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] tracking-wide text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-4">
        <Link
          href="/labs"
          className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          All labs
        </Link>
      </Reveal>
    </Section>
  );
}
