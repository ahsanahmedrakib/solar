import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
