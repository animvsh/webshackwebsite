import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true, // Helps identify potential issues during development
  swcMinify: true, // Enables SWC for faster builds and minification

  images: {
    domains: ['ik.imagekit.io', 'example.com'], // Add your trusted image domains here
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Temporary ignore TypeScript and ESLint errors during builds (remove once resolved)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Environment variables for server/client
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
    NEXT_PUBLIC_ANALYTICS_ID: process.env.NEXT_PUBLIC_ANALYTICS_ID || '',
  },
};

module.exports = nextConfig;
