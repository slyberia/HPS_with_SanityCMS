import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Self-contained server bundle for container deploys (Cloud Run, App
  // Runner, ECS). Harmless on Vercel, which uses its own output handling.
  output: "standalone",
  images: {
    remotePatterns: [
      // Sanity-hosted images (CMS uploads)
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
};

export default nextConfig;
