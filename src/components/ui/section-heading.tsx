import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title?: string;
  description?: string;
  id: string;
  index?: string;
  className?: string;
  align?: "center" | "left";
  children?: ReactNode;
};

/**
 * Chanhdai-style section labels: mono index + quiet eyebrow, optional title.
 * Default left-aligned for document-like scan.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  index,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "section-heading-gap",
        align === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      <div
        className={cn(
          "mb-2 flex items-center gap-2.5",
          align === "center" ? "justify-center" : "justify-start",
        )}
      >
        {index ? (
          <span className="font-mono text-[11px] text-muted-foreground tabular-nums">
            {index}
          </span>
        ) : null}
        <p
          id={title ? undefined : id}
          className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase"
        >
          {eyebrow}
        </p>
        <span
          className="h-px max-w-12 min-w-6 flex-1 bg-border"
          aria-hidden="true"
        />
      </div>
      {title ? (
        <h2
          id={id}
          className="font-display text-[clamp(1.5rem,3.2vw,1.85rem)] tracking-tight text-foreground"
        >
          {title}
        </h2>
      ) : null}
      {description ? (
        <p
          className={cn(
            "mt-1.5 max-w-lg text-sm leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
