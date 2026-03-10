import type { NextConfig } from "next";

const nextConfig: NextConfig = {
//   output: "standalone",
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gt-vpn.ru",
      },
      {
        protocol: "https",
        hostname: "s3.gt-vpn.ru",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "9000",
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
