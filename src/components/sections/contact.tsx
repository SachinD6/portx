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
import { SectionHeading } from "@/components/ui/section-heading";
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
      <Reveal>
        <SectionHeading
          id="contact-heading"
          index="06"
          eyebrow="Contact"
          title="Let’s talk"
          description={person.bio}
        />
      </Reveal>

      <Reveal>
        <div className="rounded-2xl border border-border bg-surface-elevated/80 p-5 sm:p-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-success-soft opacity-75" />
              <span className="relative size-2 rounded-full bg-success" />
            </span>
            <p className="text-[11px] font-medium tracking-[0.14em] text-muted-foreground uppercase">
              {person.availability.label}
            </p>
          </div>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            {product.bookingUrl ? (
              <MagneticButton href={product.bookingUrl} external>
                {product.bookingLabel}
              </MagneticButton>
            ) : null}
            <MagneticButton
              onClick={handleCopyEmail}
              variant={product.bookingUrl ? "secondary" : "primary"}
              showArrow={!product.bookingUrl}
            >
              Copy email
            </MagneticButton>
            {person.resumeUrl ? (
              <MagneticButton
                href={person.resumeUrl}
                variant="ghost"
                external
                showArrow={false}
              >
                Resume
              </MagneticButton>
            ) : null}
          </div>

          <p className="mt-3 font-mono text-xs text-muted-foreground">
            {person.email}
          </p>

          <ul className="mt-6 flex flex-wrap gap-2 border-t border-border pt-5">
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
                      "inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-xs text-muted-foreground",
                      "transition-all duration-300 hover:-translate-y-0.5 hover:bg-foreground hover:text-background",
                    )}
                  >
                    <Icon className="size-3.5" />
                    {social.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>
    </Section>
  );
}
