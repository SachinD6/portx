import type { Metadata } from "next";

import { person, site } from "@/data";

export function buildMetadata(overrides?: Partial<Metadata>): Metadata {
  const title = {
    default: site.title,
    template: `%s | ${site.name}`,
  };

  return {
    title,
    description: site.description,
    keywords: site.keywords,
    authors: [{ name: person.name }],
    creator: person.name,
    metadataBase: new URL(site.url),
    openGraph: {
      type: "website",
      locale: site.locale,
      url: site.url,
      title: site.title,
      description: site.description,
      siteName: site.name,
      ...(site.ogImage ? { images: [{ url: site.ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: site.title,
      description: site.description,
    },
    robots: {
      index: true,
      follow: true,
    },
    ...overrides,
  };
}
