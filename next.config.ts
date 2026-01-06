import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true,
    domains: ['gt-vpn.ru'],
  },
  eslint: {
    ignoreDuringBuilds: true, // Временно, если есть предупреждения ESLint
  },
  typescript: {
    ignoreBuildErrors: false, // Поставьте true, если есть ошибки TS и нужно срочно собрать
  },
}

module.exports = nextConfig

export default nextConfig;
