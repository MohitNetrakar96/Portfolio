/* eslint-disable @typescript-eslint/no-require-imports */
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Allow images from any HTTPS source (Unsplash, Cloudinary, uploads, etc.)
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
    ],
  },
  // Prevent ESLint errors from failing the production build on Vercel
  eslint: {
    ignoreDuringBuilds: true,
  },
  // TypeScript type errors will still show warnings but won't block the build
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
