import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // line up with the Tailwind breakpoints
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [32, 48, 64, 96, 128, 192, 256],
    // only the qualities we actually use
    qualities: [75, 85],
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      { protocol: 'https', hostname: 'picsum.photos' },
      // picsum redirects to its CDN
      { protocol: 'https', hostname: 'fastly.picsum.photos' },
      {
        protocol: 'https',
        hostname: 'i8qy5y6gxkdgdcv9.public.blob.vercel-storage.com',
      },
    ],
  },
  cacheComponents: true,
  agentRules: false,
  partialPrefetching: true,
  cacheLife: {
    // product pages: ok to be a few minutes behind
    products: {
      stale: 300, // 5 min in the client router cache
      revalidate: 900, // 15 min before background revalidation
      expire: 3600, // 1 hour max
    },
  },
};

export default nextConfig;
