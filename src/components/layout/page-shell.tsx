import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PageShellProps = {
  children: ReactNode;
  className?: string;
  wide?: boolean;
};

export function PageShell({ children, className, wide }: PageShellProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 pt-28 pb-16 sm:pt-32 sm:pb-20",
        wide ? "max-w-3xl" : "max-w-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
