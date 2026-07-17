"use client";

import { Command } from "cmdk";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { commandActions, person, product, projects } from "@/data";
import { copyToClipboard, scrollToSection } from "@/lib/scroll";
import { cn } from "@/lib/utils";

export const COMMAND_PALETTE_EVENT = "portx:open-command-palette";

export function openCommandPalette() {
  window.dispatchEvent(new CustomEvent(COMMAND_PALETTE_EVENT));
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((prev) => !prev);
      }
      if (event.key === "Escape") setOpen(false);
    };

    const onOpen = () => setOpen(true);

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener(COMMAND_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener(COMMAND_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  const run = useCallback(async (id: string) => {
    if (id === "book-call" && product.bookingUrl) {
      window.open(product.bookingUrl, "_blank", "noopener,noreferrer");
      setOpen(false);
      return;
    }

    const action = commandActions.find((item) => item.id === id);
    if (!action) {
      const project = projects.find((p) => p.id === id || p.slug === id);
      if (project) {
        window.open(`/work/${project.slug}`, "_self");
        setOpen(false);
      }
      return;
    }

    if (action.action === "copy-email") {
      await copyToClipboard(person.email);
      toast.success("Email copied");
      setOpen(false);
      return;
    }

    if (action.action === "navigate" && action.href) {
      window.open(action.href, "_self");
      setOpen(false);
      return;
    }

    if (action.action === "scroll" && action.sectionId) {
      if (window.location.pathname !== "/") {
        window.open(`/#${action.sectionId}`, "_self");
      } else {
        scrollToSection(action.sectionId);
      }
      setOpen(false);
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-[18vh]">
      <button
        type="button"
        className="absolute inset-0 bg-foreground/20 backdrop-blur-md"
        aria-label="Close command palette"
        onClick={() => setOpen(false)}
      />
      <Command
        label="Command palette"
        className={cn(
          "relative z-10 w-full max-w-lg overflow-hidden rounded-[1.35rem]",
          "border border-border bg-surface-elevated/95 shadow-[0_24px_80px_color-mix(in_oklch,var(--foreground)_12%,transparent)]",
        )}
        loop
      >
        <div className="border-b border-border px-4 py-3">
          <Command.Input
            autoFocus
            placeholder="Jump, search cases, or copy email…"
            className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
          />
        </div>
        <Command.List className="max-h-72 overflow-y-auto p-2">
          <Command.Empty className="px-3 py-6 text-center text-sm text-muted-foreground">
            No matches.
          </Command.Empty>

          <Command.Group
            heading="Navigate"
            className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:tracking-[0.14em] [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase"
          >
            {commandActions.map((item) => (
              <Command.Item
                key={item.id}
                value={`${item.label} ${item.description ?? ""} ${item.keywords?.join(" ") ?? ""}`}
                onSelect={() => run(item.id)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm",
                  "data-[selected=true]:bg-muted data-[selected=true]:text-foreground",
                )}
              >
                <span className="font-medium">{item.label}</span>
                {item.description ? (
                  <span className="text-xs text-muted-foreground">
                    {item.description}
                  </span>
                ) : null}
              </Command.Item>
            ))}
            {product.bookingUrl ? (
              <Command.Item
                value="book call calendar meeting"
                onSelect={() => run("book-call")}
                className="flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm data-[selected=true]:bg-muted"
              >
                <span className="font-medium">{product.bookingLabel}</span>
                <span className="text-xs text-muted-foreground">Cal.com</span>
              </Command.Item>
            ) : null}
          </Command.Group>

          <Command.Group
            heading="Case studies"
            className="mt-2 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:tracking-[0.14em] [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:uppercase"
          >
            {projects.map((project) => (
              <Command.Item
                key={project.id}
                value={`${project.title} ${project.stack.join(" ")} case study`}
                onSelect={() => run(project.slug)}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm",
                  "data-[selected=true]:bg-muted data-[selected=true]:text-foreground",
                )}
              >
                <span className="font-medium">{project.title}</span>
                <span className="text-xs text-muted-foreground">
                  {project.year}
                </span>
              </Command.Item>
            ))}
          </Command.Group>
        </Command.List>
        <div className="flex items-center justify-between border-t border-border px-4 py-2.5 text-[11px] text-muted-foreground">
          <span>Navigate with ↑↓ · Enter to select</span>
          <kbd className="rounded-md border border-border px-1.5 py-0.5 font-mono text-[10px]">
            esc
          </kbd>
        </div>
      </Command>
    </div>
  );
}
