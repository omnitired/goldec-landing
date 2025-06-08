import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // SSR disabled - static export mode
  output: 'export',
  trailingSlash: true,
  // Configure output directory for deployment platform
  distDir: 'build',
  images: {
    // Disable image optimization for static export
    unoptimized: true,
  },
  // Remove experimental features as they're not needed for static export
  // Remove API routes configuration as they're not supported in static export
};

export default nextConfig;
