import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { labs } from "@/data";
import { buildMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Labs",
  description:
    "Experiments and useful components from the portfolio—authority through shared value.",
});

const statusLabel = {
  shipped: "Shipped",
  experiment: "Experiment",
  wip: "In progress",
} as const;

export default function LabsPage() {
  return (
    <main id="main">
      <PageShell wide>
        <p className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Labs
        </p>
        <h1 className="mt-3 font-display text-[clamp(2rem,6vw,2.75rem)] tracking-tight text-foreground">
          Useful bits, not just projects
        </h1>
        <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted-foreground">
          Components, patterns, and experiments. Value that makes the site worth
          revisiting—and proves craft beyond case studies.
        </p>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {labs.map((item) => {
            const inner = (
              <>
                <span
                  className={cn(
                    "w-fit rounded-full px-2 py-0.5 text-[10px] font-medium tracking-wide uppercase",
                    item.status === "shipped" && "bg-success/10 text-success",
                    item.status === "experiment" &&
                      "bg-muted text-muted-foreground",
                    item.status === "wip" && "bg-primary/10 text-primary",
                  )}
                >
                  {statusLabel[item.status]}
                </span>
                <h2 className="mt-3 font-display text-lg tracking-tight text-foreground group-hover:text-primary">
                  {item.title}
                </h2>
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
              </>
            );

            return (
              <li key={item.id}>
                {item.href ? (
                  <Link
                    href={item.href}
                    className="group flex h-full flex-col rounded-2xl border border-border bg-surface-elevated/60 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/15"
                  >
                    {inner}
                  </Link>
                ) : (
                  <div className="flex h-full flex-col rounded-2xl border border-border bg-surface-elevated/60 p-5">
                    {inner}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </PageShell>
    </main>
  );
}
