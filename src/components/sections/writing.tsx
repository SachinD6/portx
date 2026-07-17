import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getLatestPosts } from "@/data";
import { cn } from "@/lib/utils";

export function Writing() {
  const posts = getLatestPosts(3);

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

      <div className="double-bezel">
        <div className="double-bezel-inner overflow-hidden">
          <ul>
            {posts.map((post, index) => (
              <Reveal key={post.slug} as="li" delay={index * 0.04}>
                <Link
                  href={`/blog/${post.slug}`}
                  className={cn(
                    "group flex flex-col gap-1 px-5 py-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between sm:gap-6",
                    index < posts.length - 1 && "border-b border-border/80",
                  )}
                >
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] text-muted-foreground">
                      {post.publishedAt}
                      <span className="mx-1.5 text-border">·</span>
                      {post.readingMinutes} min
                    </p>
                    <h3 className="mt-1 text-[0.95rem] font-medium tracking-tight text-foreground transition-colors group-hover:text-primary">
                      {post.title}
                    </h3>
                    <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">
                      {post.description}
                    </p>
                  </div>
                  <span className="shrink-0 text-sm text-muted-foreground transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
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
