import type { NextConfig } from "next";

/**
 * Static export for Cloudflare Pages.
 * Portfolio is fully static-compatible (no server APIs / dynamic SSR).
 * Enables edge CDN, branch previews, and instant rollbacks.
 */
const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Cleaner static routes on Cloudflare Pages
  trailingSlash: true,
};

export default nextConfig;
