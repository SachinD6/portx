import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
  wide?: boolean;
  ariaLabelledBy?: string;
};

export function Section({
  id,
  children,
  className,
  wide = false,
  ariaLabelledBy,
}: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={ariaLabelledBy}
      className={cn("section-pad scroll-mt-28", className)}
    >
      <div className={cn(wide ? "content-wide" : "content-shell")}>
        {children}
      </div>
    </section>
  );
}
