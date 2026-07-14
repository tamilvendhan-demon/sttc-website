import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: "/sttc-website",
  assetPrefix: "/sttc-website/",
};

export default nextConfig;
