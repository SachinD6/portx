"use client";

import { ArrowUp } from "lucide-react";

import { person, site } from "@/data";

/**
 * Slim meta footer only — all CTAs live in Contact so the page has one clear close.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 border-t border-border/70">
      <div className="content-shell flex flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row sm:py-6">
        <p className="text-center text-xs text-muted-foreground sm:text-left">
          © {year} {person.name}
          <span className="mx-1.5 text-border" aria-hidden="true">
            ·
          </span>
          {site.name}
        </p>

        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Back to top
          <span className="flex size-6 items-center justify-center rounded-full border border-border transition-transform duration-300 group-hover:-translate-y-0.5">
            <ArrowUp className="size-3.5" strokeWidth={1.5} />
          </span>
        </button>
      </div>
    </footer>
  );
}
