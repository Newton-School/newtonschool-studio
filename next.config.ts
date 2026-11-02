import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages, served at the host root via pagefront.
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
