"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import type { Project } from "@/data";
import { springSoft } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  index: number;
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.article
      layout={!reduceMotion}
      whileHover={
        reduceMotion
          ? undefined
          : {
              y: -4,
              transition: springSoft,
            }
      }
      className="group double-bezel"
    >
      <div className="double-bezel-inner overflow-hidden p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-2">
            <p className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
              {project.metric ?? project.role}
            </p>
            <h3 className="font-display text-2xl tracking-tight text-foreground sm:text-3xl">
              {project.title}
            </h3>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-mono">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
          </div>
        </div>

        <p className="mt-4 max-w-prose text-[0.95rem] leading-relaxed text-muted-foreground">
          {project.summary}
        </p>

        <ul className="mt-5 space-y-2">
          {project.impact.map((item) => (
            <li
              key={item}
              className="flex gap-2 text-sm leading-relaxed text-foreground/90"
            >
              <span
                className="mt-2 size-1 shrink-0 rounded-full bg-primary/70"
                aria-hidden="true"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] tracking-wide text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap gap-2 border-t border-border/70 pt-5">
          {project.links.map((link) => (
            <a
              key={`${project.id}-${link.label}`}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium",
                "text-foreground transition-colors duration-300 ease-[var(--ease-out-soft)]",
                "hover:bg-muted",
              )}
            >
              {link.label}
              <ArrowUpRight
                className="size-3.5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={1.5}
              />
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
