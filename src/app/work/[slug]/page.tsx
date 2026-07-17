import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { getProjectBySlug, product, projects } from "@/data";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.title,
    description: project.summary,
  });
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <main id="main">
      <PageShell>
        <p className="font-mono text-[11px] tracking-wide text-muted-foreground">
          <Link href="/#work" className="hover:text-foreground">
            Work
          </Link>
          <span className="mx-2 text-border">/</span>
          {project.year}
        </p>

        {project.metric ? (
          <p className="mt-4 inline-flex rounded-full border border-border bg-surface-elevated px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-muted-foreground uppercase">
            {project.metric}
          </p>
        ) : null}

        <h1 className="mt-4 font-display text-[clamp(2rem,6vw,3rem)] leading-[1.05] tracking-tight text-foreground">
          {project.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {project.role}
          <span className="mx-1.5 text-border">·</span>
          Case study
        </p>

        <div className="mt-10 space-y-8">
          <section>
            <h2 className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Problem
            </h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground/90">
              {project.problem}
            </p>
          </section>

          <section>
            <h2 className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Approach
            </h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground/90">
              {project.approach}
            </p>
          </section>

          <section>
            <h2 className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              What was unique
            </h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground/90">
              {project.uniqueness}
            </p>
          </section>

          <section>
            <h2 className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Outcome
            </h2>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-foreground/90">
              {project.outcome}
            </p>
            <ul className="mt-4 space-y-2">
              {project.impact.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-sm leading-relaxed text-foreground"
                >
                  <span
                    className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                    aria-hidden="true"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {project.process?.length ? (
            <section>
              <h2 className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
                Process
              </h2>
              <ol className="mt-4 space-y-4">
                {project.process.map((step, i) => (
                  <li
                    key={step.title}
                    className="rounded-2xl border border-border bg-surface-elevated/60 p-4"
                  >
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-sm font-medium text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {step.body}
                    </p>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          <section>
            <h2 className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">
              Stack
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <li
                  key={tech}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 flex flex-wrap gap-3 border-t border-border pt-8">
          {product.bookingUrl ? (
            <MagneticButton href={product.bookingUrl} external>
              {product.bookingLabel}
            </MagneticButton>
          ) : null}
          <MagneticButton href="/#contact" variant="secondary">
            Contact
          </MagneticButton>
          {project.links.map((link) => (
            <MagneticButton
              key={link.label}
              href={link.href}
              external={link.external}
              variant="ghost"
              showArrow={Boolean(link.external)}
            >
              {link.label}
            </MagneticButton>
          ))}
        </div>
      </PageShell>
    </main>
  );
}
