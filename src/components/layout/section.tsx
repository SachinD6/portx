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
      className={cn(
        "section-pad scroll-mt-[max(7rem,calc(5.5rem+env(safe-area-inset-top,0px)))]",
        className,
      )}
    >
      <div className={cn("min-w-0", wide ? "content-wide" : "content-shell")}>
        {children}
      </div>
    </section>
  );
}
