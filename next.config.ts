import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // SSR enabled - removed 'output: export' for server-side rendering
  trailingSlash: true,
  // Configure output directory for deployment platform
  distDir: 'build',
  images: {
    // Re-enable image optimization for SSR
    domains: ['panel.zarnext.com'], // Add your API domain for image optimization
    formats: ['image/webp', 'image/avif'],
  },
  // Enable experimental features for better SSR performance
  experimental: {
    optimizeCss: true,
  },
  // API routes configuration
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
    ];
  },
};

export default nextConfig;
