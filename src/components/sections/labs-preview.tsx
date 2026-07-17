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
          index="04"
          eyebrow="Labs"
          title="Components & experiments"
          description="Useful bits you can learn from—value that makes the site worth revisiting."
        />
      </Reveal>

      <div className="grid gap-2.5 sm:grid-cols-2">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.04}>
            <div
              className={cn(
                "group h-full rounded-2xl border border-border bg-surface-elevated/80 p-4 transition-all duration-300",
                "hover:-translate-y-0.5 hover:border-foreground/15 hover:shadow-[0_12px_32px_color-mix(in_oklch,var(--foreground)_5%,transparent)]",
              )}
            >
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase",
                  item.status === "shipped" && "bg-success/10 text-success",
                  item.status === "experiment" &&
                    "bg-muted text-muted-foreground",
                  item.status === "wip" && "bg-primary/10 text-primary",
                )}
              >
                {statusLabel[item.status]}
              </span>
              <h3 className="mt-2.5 text-sm font-medium tracking-tight text-foreground">
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
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
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
