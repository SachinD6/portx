import Link from "next/link";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { getLatestPosts } from "@/data";

export function Writing() {
  const posts = getLatestPosts(3);

  return (
    <Section id="writing" ariaLabelledBy="writing-heading">
      <Reveal>
        <SectionHeading
          id="writing-heading"
          index="02"
          eyebrow="Writing"
          title="Notes that build authority"
          description="Essays on craft, positioning, and shipping—so this site is a resource, not a brochure."
        />
      </Reveal>

      <ul className="space-y-3">
        {posts.map((post, index) => (
          <Reveal key={post.slug} as="li" delay={index * 0.05}>
            <Link
              href={`/blog/${post.slug}`}
              className="group double-bezel block transition-transform duration-300 hover:-translate-y-0.5"
            >
              <div className="double-bezel-inner flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
                <div className="min-w-0">
                  <p className="font-mono text-[11px] text-muted-foreground">
                    {post.publishedAt}
                    <span className="mx-1.5 text-border">·</span>
                    {post.readingMinutes} min
                  </p>
                  <h3 className="mt-1.5 text-base font-medium tracking-tight text-foreground transition-colors group-hover:text-primary sm:text-lg">
                    {post.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {post.description}
                  </p>
                </div>
                <span className="shrink-0 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                  Read →
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </ul>

      <Reveal className="mt-5 text-center">
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
