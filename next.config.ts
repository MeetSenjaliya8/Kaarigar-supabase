import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    // Suppress "Critical dependency" warnings caused by dynamic requires
    config.module.exprContextCritical = false;
    return config;
  },
};

export default nextConfig;
