import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'reelsync-beta-public-bucket.s3.us-east-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'reelsync-public-bucket.s3.us-east-1.amazonaws.com',
      },
      // new URL('reelsync-beta-public-bucket.s3.us-east-1.amazonaws.com')

    ],
  },
};

export default nextConfig;
