"use client";

import { ArrowUpRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { Magnetic } from "@/components/effects/magnetic";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  showArrow?: boolean;
  onClick?: ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  type?: "button" | "submit";
  variant?: "primary" | "secondary" | "ghost";
};

const variantStyles = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[inset_0_1px_0_color-mix(in_oklch,white_18%,transparent)]",
  secondary:
    "border border-border bg-surface-elevated text-foreground hover:bg-muted",
  ghost:
    "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
} as const;

export function MagneticButton({
  children,
  className,
  href,
  external,
  showArrow = true,
  onClick,
  type = "button",
  variant = "primary",
}: MagneticButtonProps) {
  const sharedClass = cn(
    "group/button inline-flex h-12 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium tracking-tight",
    "transition-[transform,background-color,color,box-shadow] duration-500 ease-[var(--ease-out-expo)]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
    "select-none active:scale-[0.98]",
    variantStyles[variant],
    className,
  );

  const content = (
    <>
      <span className="px-0.5">{children}</span>
      {showArrow ? (
        <span
          className={cn(
            "flex size-8 items-center justify-center rounded-full transition-transform duration-500 ease-[var(--ease-out-expo)]",
            "group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5 group-hover/button:scale-105",
            variant === "primary"
              ? "bg-primary-foreground/15"
              : "bg-foreground/5",
          )}
        >
          <ArrowUpRight className="size-4" strokeWidth={1.5} />
        </span>
      ) : null}
    </>
  );

  if (href) {
    return (
      <Magnetic>
        <a
          href={href}
          className={sharedClass}
          {...(external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {content}
        </a>
      </Magnetic>
    );
  }

  return (
    <Magnetic>
      <button type={type} onClick={onClick} className={sharedClass}>
        {content}
      </button>
    </Magnetic>
  );
}
