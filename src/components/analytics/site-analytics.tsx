import Script from "next/script";

import { product } from "@/data";

/**
 * Optional product analytics. Configure in src/data/product.ts.
 * No scripts load when provider is "none".
 */
export function SiteAnalytics() {
  const analytics = product.analytics;
  if (!analytics || analytics.provider === "none" || !analytics.domain) {
    return null;
  }

  if (analytics.provider === "plausible") {
    return (
      <Script
        defer
        data-domain={analytics.domain}
        src={analytics.scriptUrl ?? "https://plausible.io/js/script.js"}
        strategy="afterInteractive"
      />
    );
  }

  if (analytics.provider === "umami" && analytics.websiteId) {
    return (
      <Script
        defer
        src={analytics.scriptUrl ?? "https://cloud.umami.is/script.js"}
        data-website-id={analytics.websiteId}
        strategy="afterInteractive"
      />
    );
  }

  return null;
}
