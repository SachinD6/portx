import type { BlogPost } from "./types";

export const blogPosts: BlogPost[] = [
  {
    slug: "portfolios-need-stories-not-screenshots",
    title: "Portfolios need stories, not screenshots",
    description:
      "Why dumping GitHub links fails—and how to package work as a case study recruiters can actually scan.",
    publishedAt: "2026-06-12",
    readingMinutes: 6,
    tags: ["career", "craft"],
    body: [
      "If your portfolio is a grid of project cards with a live link and a repo link, you are making hiring managers do detective work. They will not. They will open the next tab.",
      "A useful case study answers four questions fast: What was broken? What did you own? What was unusual about your approach? What changed—ideally with a number?",
      "You do not need a 2,000-word Medium post. You need structure. Problem in one short paragraph. Approach in one. Impact as bullets with metrics when you have them. Process steps if the work is complex.",
      "This site is built that way on purpose. Projects are stories first, repos second. If you take one thing from this post: stop showing inventory—start showing judgment.",
    ],
  },
  {
    slug: "niche-your-engineering-label",
    title: "Niche your engineering label",
    description:
      "“Full-stack developer” is a keyword, not a position. How to claim a lane without lying about breadth.",
    publishedAt: "2026-05-28",
    readingMinutes: 5,
    tags: ["career", "positioning"],
    body: [
      "Generic labels attract generic attention. “Full-stack” can mean anything from CMS tweaks to distributed systems. Hiring managers scanning for a product-facing React engineer will bounce if they cannot map you to the role.",
      "Niching is not fake specialization. It is choosing the work you want more of and making the homepage about that. You can still mention systems depth—but lead with the products and outcomes if that is the job you want.",
      "My positioning here: product engineer who ships real products (FresherGo, TopTools) end-to-end—interfaces, data, SEO, and growth—with systems depth when the product needs it. The case studies reinforce that lane.",
      "If your site still says “passionate full-stack developer who loves clean code,” rewrite the hero until a stranger could place you in a hiring stack without guessing.",
    ],
  },
  {
    slug: "treat-your-portfolio-like-a-product",
    title: "Treat your portfolio like a product",
    description:
      "Analytics, clear CTAs, and a complete user journey—not a static PDF in browser clothing.",
    publishedAt: "2026-05-10",
    readingMinutes: 5,
    tags: ["product", "craft"],
    body: [
      "A product has a job-to-be-done, a happy path, and a conversion event. For a portfolio, the job is “decide if this person is worth a conversation.” The conversion is a reply, a booked call, or a download of a resume that leads to outreach.",
      "That means clear primary CTAs (book a call, copy email), secondary paths (case studies, writing), and instrumentation so you know what people actually open. Guessing is for hobby sites.",
      "It also means reliability: fast loads, working mobile nav, reduced-motion support, and no broken resume links. Those details are the product quality bar.",
      "Ship the portfolio the way you would ship a thin SaaS: iterate from data, not from redesign boredom.",
    ],
  },
];

export function getPostBySlug(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function getLatestPosts(count = 3) {
  return [...blogPosts]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, count);
}
