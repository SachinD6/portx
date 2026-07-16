import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  id: string;
  index?: string;
  className?: string;
  align?: "center" | "left";
  children?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  id,
  index,
  className,
  align = "center",
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
          "mb-2.5 flex items-center gap-3",
          align === "center" ? "justify-center" : "justify-start",
        )}
      >
        {index ? (
          <span className="font-mono text-[11px] tracking-wide text-muted-foreground">
            {index}
          </span>
        ) : null}
        <p className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
          {eyebrow}
        </p>
        <span
          className="hidden h-px w-8 bg-border sm:block"
          aria-hidden="true"
        />
      </div>
      <h2
        id={id}
        className="font-display text-[clamp(1.75rem,3.6vw,2.25rem)] tracking-tight text-foreground"
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-2.5 max-w-md text-sm leading-relaxed text-balance text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
