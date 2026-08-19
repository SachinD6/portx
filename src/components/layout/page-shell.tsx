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
        "mx-auto w-full min-w-0 px-3 pt-[max(6.75rem,calc(env(safe-area-inset-top,0px)+5.25rem))] pb-16 sm:px-4 sm:pt-32 sm:pb-20",
        wide ? "max-w-3xl" : "max-w-2xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
