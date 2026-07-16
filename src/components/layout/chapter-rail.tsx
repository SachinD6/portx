"use client";

import { useMemo } from "react";

import { navigation } from "@/data";
import { useActiveSection } from "@/hooks/use-active-section";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function ChapterRail() {
  const ids = useMemo(() => navigation.map((item) => item.id), []);
  const active = useActiveSection(ids);

  return (
    <aside
      className="pointer-events-none fixed top-1/2 left-4 z-30 hidden -translate-y-1/2 xl:block 2xl:left-6"
      aria-label="Section chapters"
    >
      <div className="pointer-events-auto relative pl-0.5">
        {/* Vertical guide line */}
        <span
          className="absolute top-2 bottom-2 left-[0.28rem] w-px bg-border"
          aria-hidden="true"
        />

        <ol className="relative flex flex-col gap-1">
          {navigation.map((item, index) => {
            const isActive = active === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "group flex items-center gap-2.5 rounded-full py-1.5 pr-3 pl-0 text-left transition-colors duration-300",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-current={isActive ? "true" : undefined}
                >
                  <span
                    className={cn(
                      "relative z-[1] size-2.5 shrink-0 rounded-full border-2 border-background transition-all duration-300",
                      isActive
                        ? "bg-primary shadow-[0_0_0_3px_color-mix(in_oklch,var(--primary)_18%,transparent)]"
                        : "bg-muted-foreground/35 group-hover:bg-muted-foreground/70",
                    )}
                  />
                  <span className="flex min-w-[6.5rem] items-baseline gap-2">
                    <span
                      className={cn(
                        "font-mono text-[10px] tracking-wide transition-colors",
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground/80",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "text-[12px] transition-all duration-300",
                        isActive
                          ? "font-medium text-foreground"
                          : "text-muted-foreground group-hover:text-foreground",
                      )}
                    >
                      {item.label}
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </div>
    </aside>
  );
}
