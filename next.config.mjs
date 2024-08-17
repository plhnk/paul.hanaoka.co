import remarkGfm from 'remark-gfm';
import createMDX from '@next/mdx';

// Prevent images from being optimized in preview or development
const isProduction = process.env.NEXT_PUBLIC_IS_PRODUCTION === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions`` to include MDX files
  pageExtensions: ['js', 'jsx', 'mdx', 'md', 'ts', 'tsx'],
  // Optionally, add any other Next.js config below
  images: {
    unoptimized: !isProduction, // Disables image optimization unless it's production
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'api.weather.gov',
      },
    ],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
});

// Wrap MDX and Next.js config with each other
export default withMDX(nextConfig);
