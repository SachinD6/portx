"use client";

import { motion, useReducedMotion } from "motion/react";

import { letterReveal, staggerFast } from "@/lib/motion";
import { cn } from "@/lib/utils";

type TextRevealProps = {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p" | "span";
};

export function TextReveal({
  text,
  className,
  as: Tag = "h1",
}: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const words = text.split(" ");

  if (reduceMotion) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={cn("overflow-hidden", className)} aria-label={text}>
      <motion.span
        className="inline-flex flex-wrap justify-center gap-x-[0.28em]"
        variants={staggerFast}
        initial="hidden"
        animate="visible"
        aria-hidden="true"
      >
        {words.map((word, wordIndex) => (
          <span
            key={`${word}-${wordIndex}`}
            className="inline-flex overflow-hidden"
          >
            {Array.from(word).map((char, charIndex) => (
              <motion.span
                key={`${word}-${charIndex}`}
                className="inline-block will-change-transform"
                variants={letterReveal}
              >
                {char}
              </motion.span>
            ))}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
