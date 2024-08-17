import remarkGfm from 'remark-gfm';
import createMDX from '@next/mdx';

// Prevent images from being optimized in preview or development
const isProduction = process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'mdx', 'md', 'ts', 'tsx'],
  images: {
    unoptimized: !isProduction, // disable image optimization unless it's production
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.weather.gov',
      },
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
