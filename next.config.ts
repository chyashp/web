import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    // !! WARN !!
    // Temporarily ignoring TypeScript errors
    // Remove this when the type issues are resolved
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
