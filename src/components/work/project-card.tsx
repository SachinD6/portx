"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useRef, useState, type MouseEvent } from "react";

import type { Project } from "@/data";
import { duration, easeOutExpo, springSoft } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const [open, setOpen] = useState(index === 0);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (reduceMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      cardRef.current.style.setProperty("--spot-x", `${x}%`);
      cardRef.current.style.setProperty("--spot-y", `${y}%`);
    },
    [reduceMotion],
  );

  return (
    <motion.article
      layout={!reduceMotion}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -3,
              transition: springSoft,
            }
      }
      className="group double-bezel"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMove}
        className="double-bezel-inner relative p-5 sm:p-6"
      >
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-[1] flex w-full items-start justify-between gap-4 text-left"
          aria-expanded={open}
        >
          <div className="min-w-0 space-y-2.5">
            {project.metric ? (
              <p className="inline-flex rounded-full border border-border bg-background/70 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
                {project.metric}
              </p>
            ) : null}
            <div>
              <h3 className="font-display text-xl tracking-tight text-foreground sm:text-2xl">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.role}
                <span className="mx-1.5 text-border" aria-hidden="true">
                  ·
                </span>
                <span className="font-mono text-xs">{project.year}</span>
              </p>
            </div>
            <p className="max-w-prose text-sm leading-relaxed text-muted-foreground">
              {project.summary}
            </p>
          </div>

          <span
            className={cn(
              "mt-1 flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background/70 transition-transform duration-500 ease-[var(--ease-out-expo)]",
              open && "rotate-180",
            )}
          >
            <ChevronDown
              className="size-4 text-muted-foreground"
              strokeWidth={1.5}
            />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              key="details"
              initial={
                reduceMotion
                  ? false
                  : { height: 0, opacity: 0, filter: "blur(4px)" }
              }
              animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
              exit={
                reduceMotion
                  ? undefined
                  : { height: 0, opacity: 0, filter: "blur(4px)" }
              }
              transition={{ duration: duration.normal, ease: easeOutExpo }}
              className="relative z-[1] overflow-hidden"
            >
              <div className="pt-4">
                <ul className="space-y-2 border-t border-border/70 pt-4">
                  {project.impact.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2.5 text-sm leading-relaxed text-foreground/90"
                    >
                      <span
                        className="mt-2 size-1 shrink-0 rounded-full bg-primary/70"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] tracking-wide text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.links.map((link) => (
                    <a
                      key={`${project.id}-${link.label}`}
                      href={link.href}
                      {...(link.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium",
                        "text-foreground transition-all duration-300 ease-[var(--ease-out-soft)]",
                        "hover:bg-muted",
                      )}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {link.label}
                      <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.article>
  );
}
