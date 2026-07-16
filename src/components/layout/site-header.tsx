"use client";

import { Command, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { openCommandPalette } from "@/components/navigation/command-palette";
import { navigation, person } from "@/data";
import { useActiveSection } from "@/hooks/use-active-section";
import { duration, easeOutExpo } from "@/lib/motion";
import {
  getModKeyLabel,
  getServerModKeyLabel,
  subscribeNoop,
} from "@/lib/platform";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const modKey = useSyncExternalStore(
    subscribeNoop,
    getModKeyLabel,
    getServerModKeyLabel,
  );
  const ids = useMemo(() => navigation.map((item) => item.id), []);
  const active = useActiveSection(ids);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => {
    scrollToSection(id);
    setOpen(false);
  };

  const openPalette = () => openCommandPalette();

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-4 sm:px-4 sm:pt-5">
        <div
          className={cn(
            "pointer-events-auto flex w-full max-w-2xl items-center gap-1 rounded-full border px-1.5 py-1.5 transition-[background-color,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] sm:px-2",
            scrolled
              ? "border-border/90 bg-surface-elevated/90 shadow-[0_12px_40px_color-mix(in_oklch,var(--foreground)_7%,transparent)] backdrop-blur-[var(--nav-blur)]"
              : "border-border/50 bg-surface-elevated/70 backdrop-blur-[var(--nav-blur)]",
          )}
        >
          {/* Brand mark */}
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setOpen(false);
            }}
            className="flex items-center gap-2 rounded-full py-1 pr-2.5 pl-1 transition-colors hover:bg-muted/80"
            aria-label="Back to top"
          >
            <span className="flex size-8 items-center justify-center rounded-full bg-primary text-[11px] font-semibold tracking-wide text-primary-foreground">
              {person.firstName.slice(0, 1)}
              {person.lastName.slice(0, 1)}
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-foreground sm:inline">
              {person.firstName}
            </span>
          </button>

          {/* Links */}
          <nav
            className="mx-auto hidden items-center gap-0.5 md:flex"
            aria-label="Primary"
          >
            {navigation.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  className={cn(
                    "relative rounded-full px-3 py-1.5 text-[13px] transition-colors duration-300 ease-[var(--ease-out-soft)]",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-muted"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 400, damping: 34 }
                      }
                    />
                  ) : null}
                  <span className="relative z-[1]">{item.label}</span>
                </button>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1">
            <button
              type="button"
              onClick={openPalette}
              className="hidden items-center gap-1.5 rounded-full border border-border/80 bg-background/60 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:inline-flex"
              aria-label="Open command palette"
            >
              <Command className="size-3.5" strokeWidth={1.5} />
              <span className="font-mono text-[10px]">{modKey}K</span>
            </button>

            <button
              type="button"
              onClick={() => go("contact")}
              className="hidden rounded-full bg-primary px-3.5 py-1.5 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90 md:inline-flex"
            >
              Contact
            </button>

            <button
              type="button"
              className="inline-flex size-9 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="relative size-5">
                <Menu
                  className={cn(
                    "absolute inset-0 size-5 transition-all duration-300 ease-[var(--ease-out-expo)]",
                    open ? "scale-75 rotate-90 opacity-0" : "opacity-100",
                  )}
                  strokeWidth={1.5}
                />
                <X
                  className={cn(
                    "absolute inset-0 size-5 transition-all duration-300 ease-[var(--ease-out-expo)]",
                    open ? "opacity-100" : "scale-75 -rotate-90 opacity-0",
                  )}
                  strokeWidth={1.5}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: duration.fast }}
          >
            <button
              type="button"
              className="absolute inset-0 bg-background/80 backdrop-blur-xl"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              aria-label="Mobile"
              className="absolute inset-x-4 top-20 rounded-[1.35rem] border border-border bg-surface-elevated p-2 shadow-[0_20px_60px_color-mix(in_oklch,var(--foreground)_8%,transparent)]"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: duration.normal, ease: easeOutExpo }}
            >
              {navigation.map((item, index) => {
                const isActive = active === item.id;
                return (
                  <motion.button
                    key={item.id}
                    type="button"
                    onClick={() => go(item.id)}
                    className={cn(
                      "flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-[15px] font-medium transition-colors",
                      isActive
                        ? "bg-muted text-foreground"
                        : "text-foreground hover:bg-muted/70",
                    )}
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.03 * index,
                      duration: duration.normal,
                      ease: easeOutExpo,
                    }}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </motion.button>
                );
              })}
              <div className="mt-1 grid grid-cols-2 gap-1 border-t border-border/70 p-1 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openPalette();
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Command className="size-3.5" strokeWidth={1.5} />
                  {modKey}K
                </button>
                <button
                  type="button"
                  onClick={() => go("contact")}
                  className="rounded-xl bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground"
                >
                  Contact
                </button>
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
