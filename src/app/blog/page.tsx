import type { Metadata } from "next";
import Link from "next/link";

import { PageShell } from "@/components/layout/page-shell";
import { blogPosts } from "@/data";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Writing",
  description:
    "Notes on craft, positioning, and shipping—building authority beyond project lists.",
});

export default function BlogIndexPage() {
  const posts = [...blogPosts].sort((a, b) =>
    a.publishedAt < b.publishedAt ? 1 : -1,
  );

  return (
    <main id="main">
      <PageShell>
        <p className="text-[11px] font-medium tracking-[0.2em] text-muted-foreground uppercase">
          Writing
        </p>
        <h1 className="mt-3 font-display text-[clamp(2rem,6vw,2.75rem)] tracking-tight text-foreground">
          Notes that build authority
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          Essays on portfolios, positioning, and product craft—so this site is a
          resource people return to.
        </p>

        <ul className="mt-10 space-y-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-border bg-surface-elevated p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/15"
              >
                <p className="font-mono text-[11px] text-muted-foreground">
                  {post.publishedAt}
                  <span className="mx-1.5 text-border">·</span>
                  {post.readingMinutes} min
                </p>
                <h2 className="mt-2 font-display text-xl tracking-tight text-foreground transition-colors group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {post.description}
                </p>
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {post.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-border px-2 py-0.5 text-[11px] text-muted-foreground"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </Link>
            </li>
          ))}
        </ul>
      </PageShell>
    </main>
  );
}
