"use client";

import { Command, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { openCommandPalette } from "@/components/navigation/command-palette";
import { homeSections, navigation, person, product } from "@/data";
import { useActiveSection } from "@/hooks/use-active-section";
import { duration, easeOutExpo } from "@/lib/motion";
import {
  getModKeyLabel,
  getServerModKeyLabel,
  subscribeNoop,
} from "@/lib/platform";
import { scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

function isHomePath(pathname: string) {
  return pathname === "/" || pathname === "";
}

const EMPTY_SECTIONS: string[] = [];

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const onHome = isHomePath(pathname);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduceMotion = useReducedMotion();
  const modKey = useSyncExternalStore(
    subscribeNoop,
    getModKeyLabel,
    getServerModKeyLabel,
  );
  const sectionIds = useMemo(() => homeSections.map((item) => item.id), []);
  const activeSection = useActiveSection(onHome ? sectionIds : EMPTY_SECTIONS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goHash = (id: string) => {
    if (onHome) {
      scrollToSection(id);
    } else {
      router.push(`/#${id}`);
    }
    setOpen(false);
  };

  const openPalette = () => openCommandPalette();

  const linkActive = (item: (typeof navigation)[number]) => {
    if (item.page) {
      return pathname === item.href || pathname.startsWith(`${item.href}/`);
    }
    if (!onHome) return false;
    const hash = item.href.replace("/#", "").replace("#", "");
    return activeSection === hash;
  };

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center pt-[max(0.75rem,env(safe-area-inset-top,0px))] pr-[max(0.625rem,env(safe-area-inset-right,0px))] pl-[max(0.625rem,env(safe-area-inset-left,0px))] sm:pt-[max(1.25rem,env(safe-area-inset-top,0px))] sm:pr-[max(1rem,env(safe-area-inset-right,0px))] sm:pl-[max(1rem,env(safe-area-inset-left,0px))]">
        <div
          className={cn(
            "pointer-events-auto flex w-full max-w-2xl min-w-0 items-center gap-1 rounded-full border px-1.5 py-1.5 transition-[background-color,box-shadow,border-color] duration-500 ease-[var(--ease-out-expo)] sm:px-2",
            scrolled
              ? "border-border/90 bg-surface-elevated/90 shadow-[0_12px_40px_color-mix(in_oklch,var(--foreground)_7%,transparent)] backdrop-blur-[var(--nav-blur)]"
              : "border-border/50 bg-surface-elevated/70 backdrop-blur-[var(--nav-blur)]",
          )}
        >
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex min-h-11 min-w-11 items-center gap-2 rounded-full py-1 pr-2.5 pl-1 transition-colors hover:bg-muted/80"
            aria-label="Home"
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-[11px] font-semibold tracking-wide text-primary-foreground">
              {person.firstName.slice(0, 1)}
              {person.lastName.slice(0, 1)}
            </span>
            <span className="hidden text-sm font-medium tracking-tight text-foreground sm:inline">
              {person.firstName}
            </span>
          </Link>

          <nav
            className="mx-auto hidden items-center gap-0.5 md:flex"
            aria-label="Primary"
          >
            {navigation.map((item) => {
              const isActive = linkActive(item);
              const className = cn(
                "relative rounded-full px-3 py-1.5 text-[13px] transition-colors duration-300 ease-[var(--ease-out-soft)]",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              );

              const pill = isActive ? (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-muted"
                  transition={
                    reduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 400, damping: 34 }
                  }
                />
              ) : null;

              if (item.page) {
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={className}
                    onClick={() => setOpen(false)}
                  >
                    {pill}
                    <span className="relative z-[1]">{item.label}</span>
                  </Link>
                );
              }

              const hash = item.href.replace("/#", "").replace("#", "");
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => goHash(hash)}
                  className={className}
                >
                  {pill}
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

            {product.bookingUrl ? (
              <a
                href={product.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden rounded-full bg-primary px-3.5 py-1.5 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90 md:inline-flex"
              >
                Book
              </a>
            ) : (
              <button
                type="button"
                onClick={() => goHash("contact")}
                className="hidden rounded-full bg-primary px-3.5 py-1.5 text-[13px] font-medium text-primary-foreground transition-opacity hover:opacity-90 md:inline-flex"
              >
                Contact
              </button>
            )}

            <button
              type="button"
              className="touch-target inline-flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted md:hidden"
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
              className="absolute inset-x-3 top-[max(4.75rem,calc(env(safe-area-inset-top,0px)+3.75rem))] max-h-[min(70dvh,calc(100dvh-6rem))] overflow-y-auto overscroll-contain rounded-[1.35rem] border border-border bg-surface-elevated p-2 shadow-[0_20px_60px_color-mix(in_oklch,var(--foreground)_8%,transparent)] sm:inset-x-4"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: duration.normal, ease: easeOutExpo }}
            >
              {navigation.map((item, index) => {
                const isActive = linkActive(item);
                const shared = cn(
                  "flex min-h-12 w-full items-center justify-between rounded-2xl px-4 py-3.5 text-left text-[15px] font-medium transition-colors",
                  isActive
                    ? "bg-muted text-foreground"
                    : "text-foreground hover:bg-muted/70",
                );

                if (item.page) {
                  return (
                    <Link
                      key={item.id}
                      href={item.href}
                      className={shared}
                      onClick={() => setOpen(false)}
                    >
                      {item.label}
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  );
                }

                const hash = item.href.replace("/#", "").replace("#", "");
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => goHash(hash)}
                    className={shared}
                  >
                    {item.label}
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </button>
                );
              })}
              <div className="mt-1 grid grid-cols-2 gap-1 border-t border-border/70 p-1 pt-2 pb-[max(0.25rem,env(safe-area-inset-bottom,0px))]">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openPalette();
                  }}
                  className="flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Command className="size-3.5" strokeWidth={1.5} />
                  {modKey}K
                </button>
                {product.bookingUrl ? (
                  <a
                    href={product.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-11 items-center justify-center rounded-xl bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
                    onClick={() => setOpen(false)}
                  >
                    Book
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => goHash("contact")}
                    className="min-h-11 rounded-xl bg-primary px-3 py-2.5 text-sm font-medium text-primary-foreground"
                  >
                    Contact
                  </button>
                )}
              </div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
