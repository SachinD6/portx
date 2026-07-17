import type { ProductConfig } from "./types";

/**
 * Product settings for the portfolio-as-SaaS layer.
 * Swap bookingUrl for your real Cal.com (or Calendly) link.
 */
export const product: ProductConfig = {
  bookingUrl: "https://cal.com/sachinduhan/15min",
  bookingLabel: "Book a 15‑min call",
  analytics: {
    // Set provider + domain when ready (Plausible / Umami). "none" = no script.
    provider: "none",
    domain: "sachinduhan.dev",
  },
};
