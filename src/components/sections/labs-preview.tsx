import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { labs } from "@/data";
import { cn } from "@/lib/utils";

const statusLabel = {
  shipped: "Shipped",
  experiment: "Experiment",
  wip: "In progress",
} as const;

export function LabsPreview() {
  const items = labs.slice(0, 4);

  return (
    <Section id="labs" ariaLabelledBy="labs-heading">
      <Reveal>
        <SectionHeading
          id="labs-heading"
          index="03"
          eyebrow="Labs"
          title="Useful bits, not just projects"
          description="Components and experiments you can steal ideas from—authority through value."
        />
      </Reveal>

      <div className="grid gap-3 sm:grid-cols-2">
        {items.map((item, index) => (
          <Reveal key={item.id} delay={index * 0.04}>
            <div className="group double-bezel h-full">
              <div className="double-bezel-inner flex h-full flex-col p-5">
                <div className="flex items-center justify-between gap-2">
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
                </div>
                <h3 className="mt-3 text-base font-medium tracking-tight text-foreground">
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
                      className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
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

      <Reveal className="mt-5 text-center">
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
