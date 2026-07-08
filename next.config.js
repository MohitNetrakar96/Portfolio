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
  // Type errors log as warnings but won't abort the build
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
