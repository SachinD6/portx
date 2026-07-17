import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PageShell } from "@/components/layout/page-shell";
import { blogPosts, getPostBySlug } from "@/data";
import { buildMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.description,
  });
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <main id="main">
      <PageShell>
        <p className="font-mono text-[11px] tracking-wide text-muted-foreground">
          <Link href="/blog" className="hover:text-foreground">
            Writing
          </Link>
          <span className="mx-2 text-border">/</span>
          {post.publishedAt}
          <span className="mx-2 text-border">·</span>
          {post.readingMinutes} min read
        </p>

        <h1 className="mt-4 font-display text-[clamp(1.85rem,5vw,2.75rem)] leading-[1.1] tracking-tight text-foreground">
          {post.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {post.description}
        </p>

        <article className="mt-10 space-y-5">
          {post.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 32)}
              className="text-[0.95rem] leading-[1.75] text-foreground/90"
            >
              {paragraph}
            </p>
          ))}
        </article>

        <div className="mt-12 border-t border-border pt-6">
          <Link
            href="/blog"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← All writing
          </Link>
        </div>
      </PageShell>
    </main>
  );
}
