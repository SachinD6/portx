"use client";

import { toast } from "sonner";

import {
  GithubIcon,
  GlobeIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/icons/social-icons";
import { Section } from "@/components/layout/section";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Reveal } from "@/components/ui/reveal";
import { person, product, socials } from "@/data";
import { copyToClipboard } from "@/lib/scroll";
import { cn } from "@/lib/utils";

const iconMap = {
  github: GithubIcon,
  linkedin: LinkedinIcon,
  x: XIcon,
  globe: GlobeIcon,
} as const;

const contactSocials = socials.filter((s) => s.icon !== "mail");

export function Contact() {
  const handleCopyEmail = async () => {
    await copyToClipboard(person.email);
    toast.success("Email copied");
  };

  return (
    <Section id="contact" ariaLabelledBy="contact-heading">
      <Reveal className="text-center">
        <div className="group double-bezel">
          <div className="double-bezel-inner px-5 py-10 sm:px-10 sm:py-14">
            <div className="relative z-[1] mx-auto max-w-lg">
              <div className="mb-5 flex items-center justify-center gap-2">
                <span className="relative flex size-2" aria-hidden="true">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-success-soft opacity-75" />
                  <span className="relative size-2 rounded-full bg-success" />
                </span>
                <p className="text-[11px] font-medium tracking-[0.18em] text-muted-foreground uppercase">
                  {person.availability.label}
                </p>
              </div>

              <h2
                id="contact-heading"
                className="font-display text-[clamp(1.85rem,5vw,2.75rem)] tracking-tight text-foreground"
              >
                Let&apos;s build something clear
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-balance text-muted-foreground sm:text-base">
                {person.bio}
              </p>

              <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
                {product.bookingUrl ? (
                  <MagneticButton
                    href={product.bookingUrl}
                    external
                    className="w-full sm:w-auto"
                  >
                    {product.bookingLabel}
                  </MagneticButton>
                ) : null}
                <MagneticButton
                  onClick={handleCopyEmail}
                  variant={product.bookingUrl ? "secondary" : "primary"}
                  showArrow={!product.bookingUrl}
                  className="w-full sm:w-auto"
                >
                  Copy email
                </MagneticButton>
                {person.resumeUrl ? (
                  <MagneticButton
                    href={person.resumeUrl}
                    variant="ghost"
                    external
                    showArrow={false}
                    className="w-full sm:w-auto"
                  >
                    Resume
                  </MagneticButton>
                ) : null}
              </div>

              <p className="mt-3 font-mono text-xs text-muted-foreground">
                {person.email}
              </p>

              <div
                className="mx-auto mt-8 h-px w-12 bg-border"
                aria-hidden="true"
              />

              <ul className="mt-6 flex flex-wrap items-center justify-center gap-2">
                {contactSocials.map((social) => {
                  const Icon = iconMap[social.icon as keyof typeof iconMap];
                  if (!Icon) return null;
                  return (
                    <li key={social.id}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 py-2 text-sm",
                          "text-muted-foreground transition-all duration-300 ease-[var(--ease-out-soft)]",
                          "hover:-translate-y-0.5 hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <Icon className="size-4" />
                        {social.label}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
