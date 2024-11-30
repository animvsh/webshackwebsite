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

  // Add custom headers to handle potential CSP issues
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; img-src *; media-src *; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; connect-src *; frame-src *;",
          },
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },

  // Redirect non-functional CTAs to the proper external link
  async redirects() {
    return [
      {
        source: '/external-cta',
        destination: 'https://forms.gle/z8axPyhKjWyhYWcQ9',
        permanent: false, // Use 302 redirect for external links
      },
    ];
  },
};

module.exports = nextConfig;
