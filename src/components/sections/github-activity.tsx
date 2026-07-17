"use client";

import { motion, useReducedMotion } from "motion/react";
import { GitHubCalendar } from "react-github-calendar";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { person } from "@/data";
import { fadeUp } from "@/lib/motion";

/**
 * Contribution graph — sits after experience as proof of ongoing craft (chanhdai-style).
 */
export function GithubActivity() {
  const reduceMotion = useReducedMotion();
  const username = person.githubUsername;
  if (!username) return null;

  return (
    <Section id="activity" ariaLabelledBy="activity-heading">
      <Reveal>
        <SectionHeading
          id="activity-heading"
          index="02"
          eyebrow="Activity"
          title="GitHub"
          description="Consistent shipping over the last year—not just star counts."
        />
      </Reveal>

      <Reveal>
        <motion.div
          variants={reduceMotion ? undefined : fadeUp}
          className="overflow-x-auto rounded-2xl border border-border/80 bg-muted/35 p-4 sm:p-5"
        >
          <div className="min-w-[640px]">
            <GitHubCalendar
              username={username}
              blockSize={11}
              blockMargin={3}
              fontSize={12}
              colorScheme="light"
              theme={{
                light: [
                  "color-mix(in oklch, var(--border) 70%, transparent)",
                  "color-mix(in oklch, var(--primary) 25%, white)",
                  "color-mix(in oklch, var(--primary) 45%, white)",
                  "color-mix(in oklch, var(--primary) 70%, white)",
                  "var(--primary)",
                ],
              }}
              style={{
                color: "var(--muted-foreground)",
              }}
            />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground underline-offset-4 hover:underline"
            >
              @{username}
            </a>
            {" · "}
            public contributions
          </p>
        </motion.div>
      </Reveal>
    </Section>
  );
}
