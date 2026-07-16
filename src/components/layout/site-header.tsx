"use client";

import { Command, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

import { openCommandPalette } from "@/components/navigation/command-palette";
import { navigation, person } from "@/data";
import { duration, easeOutExpo } from "@/lib/motion";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0.1, 0.35, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
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
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-5">
        <div
          className={cn(
            "pointer-events-auto flex w-full max-w-xl items-center justify-between gap-2 rounded-full border px-2 py-1.5 transition-[background-color,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)]",
            scrolled
              ? "border-border/80 bg-surface-elevated/80 shadow-[0_10px_40px_color-mix(in_oklch,var(--foreground)_6%,transparent)] backdrop-blur-[var(--nav-blur)]"
              : "border-border/60 bg-surface-elevated/55 backdrop-blur-[var(--nav-blur)]",
          )}
        >
          <button
            type="button"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              setOpen(false);
            }}
            className="rounded-full px-3 py-2 text-sm font-medium tracking-tight text-foreground transition-colors hover:bg-muted"
          >
            {person.firstName}
            <span className="text-muted-foreground">.</span>
          </button>

          <nav
            className="hidden items-center gap-0.5 md:flex"
            aria-label="Primary"
          >
            {navigation.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => go(item.id)}
                className={cn(
                  "rounded-full px-3 py-2 text-sm transition-colors duration-300 ease-[var(--ease-out-soft)]",
                  active === item.id
                    ? "bg-muted text-foreground"
                    : "text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={openPalette}
              className="hidden items-center gap-1.5 rounded-full border border-border bg-background/50 px-2.5 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
              aria-label="Open command palette"
            >
              <Command className="size-3.5" strokeWidth={1.5} />
              <span className="font-mono text-[10px]">K</span>
            </button>

            <button
              type="button"
              className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
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
              className="absolute inset-x-4 top-24 rounded-[1.5rem] border border-border bg-surface-elevated p-3 shadow-[0_20px_60px_color-mix(in_oklch,var(--foreground)_8%,transparent)]"
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: duration.normal, ease: easeOutExpo }}
            >
              {navigation.map((item, index) => (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => go(item.id)}
                  className="flex w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-base font-medium text-foreground hover:bg-muted"
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.04 * index,
                    duration: duration.normal,
                    ease: easeOutExpo,
                  }}
                >
                  {item.label}
                  <span className="font-mono text-xs text-muted-foreground">
                    0{index + 1}
                  </span>
                </motion.button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  openPalette();
                }}
                className="mt-1 flex w-full items-center gap-2 rounded-2xl px-4 py-3.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <Command className="size-4" strokeWidth={1.5} />
                Command palette
              </button>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
