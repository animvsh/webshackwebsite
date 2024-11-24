import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['ik.imagekit.io'],
  },
};

module.exports = nextConfig