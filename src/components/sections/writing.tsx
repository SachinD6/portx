import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getLatestPosts } from "@/data";
import { cn } from "@/lib/utils";

export function Writing() {
  const posts = getLatestPosts(3);
  const [featured, ...rest] = posts;

  return (
    <Section id="writing" ariaLabelledBy="writing-heading">
      <Reveal>
        <SectionHeading
          id="writing-heading"
          index="03"
          eyebrow="Writing"
          title="Notes"
          description="Craft, positioning, and product thinking—authority beyond project lists."
        />
      </Reveal>

      <div className="grid gap-3">
        {featured ? (
          <Reveal>
            <Link
              href={`/blog/${featured.slug}`}
              className={cn(
                "group relative block overflow-hidden rounded-2xl border border-border/80 bg-muted/40 p-5 sm:p-6",
                "transition-all duration-300 ease-[var(--ease-out-soft)]",
                "hover:border-border hover:bg-muted/55",
              )}
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium tracking-[0.12em] text-primary uppercase">
                  Latest
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {featured.publishedAt}
                  <span className="mx-1.5 text-border">·</span>
                  {featured.readingMinutes} min
                </span>
              </div>
              <h3 className="mt-3 font-display text-xl tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                {featured.title}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {featured.description}
              </p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {featured.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-md bg-background/70 px-2 py-0.5 text-[11px] text-muted-foreground ring-1 ring-border/70"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <span className="mt-4 inline-flex text-sm font-medium text-foreground/80 transition-transform duration-300 group-hover:translate-x-0.5">
                Read article →
              </span>
            </Link>
          </Reveal>
        ) : null}

        {rest.length > 0 ? (
          <ul className="grid gap-2 sm:grid-cols-2">
            {rest.map((post, index) => (
              <Reveal key={post.slug} as="li" delay={0.04 * (index + 1)}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={cn(
                    "group flex h-full flex-col rounded-2xl border border-border/70 bg-muted/25 p-4",
                    "transition-all duration-300 hover:border-border hover:bg-muted/45",
                  )}
                >
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {post.publishedAt}
                    <span className="mx-1.5 text-border">·</span>
                    {post.readingMinutes} min
                  </p>
                  <h3 className="mt-2 font-display text-lg tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                  <span className="mt-3 text-xs font-medium text-muted-foreground transition-colors group-hover:text-foreground">
                    Read →
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        ) : null}
      </div>

      <Reveal className="mt-4">
        <Link
          href="/blog"
          className="text-sm font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
        >
          All writing
        </Link>
      </Reveal>
    </Section>
  );
}
