"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";

import { ThinkingOrb } from "@/components/effects/thinking-orb";
import type { Project } from "@/data";
import { springSoft } from "@/lib/motion";
import { cn } from "@/lib/utils";

type ProjectCardProps = {
  project: Project;
  index: number;
};

/** Only TopTools gets the agent orb — signal autonomy without spamming every card */
const AGENT_PROJECT_IDS = new Set(["toptools"]);

export function ProjectCard({ project, index }: ProjectCardProps) {
  const reduceMotion = useReducedMotion();
  const showAgentOrb = AGENT_PROJECT_IDS.has(project.id);

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
      <div className="double-bezel-inner relative p-4 sm:p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-2.5">
            {project.metric ? (
              <p className="inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-background/70 px-2.5 py-1 text-[10px] font-medium tracking-[0.12em] break-words text-muted-foreground uppercase">
                {showAgentOrb ? (
                  <ThinkingOrb
                    state="shaping"
                    size={20}
                    aria-label="Agent pipeline active"
                  />
                ) : null}
                {project.metric}
              </p>
            ) : null}
            <div className="min-w-0">
              <h3 className="font-display text-xl tracking-tight break-words text-foreground sm:text-2xl">
                <Link
                  href={`/work/${project.slug}`}
                  className="transition-colors hover:text-primary"
                >
                  {project.title}
                </Link>
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.role}
                <span className="mx-1.5 text-border" aria-hidden="true">
                  ·
                </span>
                <span className="font-mono text-xs">{project.year}</span>
              </p>
            </div>
            <p className="max-w-prose text-sm leading-relaxed break-words text-muted-foreground">
              {project.summary}
            </p>
          </div>
          <span className="shrink-0 font-mono text-xs text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        <ul className="mt-4 space-y-2 border-t border-border/70 pt-4">
          {project.impact.slice(0, 3).map((item) => (
            <li
              key={item}
              className="flex gap-2.5 text-sm leading-relaxed text-foreground/90"
            >
              <span
                className="mt-2 size-1 shrink-0 rounded-full bg-primary/70"
                aria-hidden="true"
              />
              <span className="min-w-0 break-words">{item}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-border bg-background/60 px-2.5 py-1 text-[11px] tracking-wide text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
          <Link
            href={`/work/${project.slug}`}
            className={cn(
              "inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full bg-primary px-3.5 py-2.5 text-sm font-medium text-primary-foreground sm:w-auto sm:justify-start sm:py-2",
              "transition-opacity hover:opacity-90",
            )}
          >
            Read case study
            <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
          </Link>
          {project.links.slice(0, 2).map((link) => (
            <a
              key={`${project.id}-${link.label}`}
              href={link.href}
              {...(link.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="inline-flex min-h-11 w-full items-center justify-center gap-1.5 rounded-full border border-border px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:w-auto sm:justify-start sm:py-2"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
