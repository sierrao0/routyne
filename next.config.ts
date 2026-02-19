import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
  // runtimeCaching: Custom runtime caching to avoid precaching all videos
  runtimeCaching: [
    {
      urlPattern: /^\/media\/.*\.webm$/,
      handler: 'NetworkFirst', // NetworkFirst ensures we get fresh content if available
      options: {
        cacheName: 'routyne-media-videos',
        expiration: {
          maxEntries: 20,
          maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // Default next-pwa runtimeCaching will follow these custom rules
  ],
});

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
};

export default withPWA(nextConfig);
