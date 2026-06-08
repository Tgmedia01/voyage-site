/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Full Next.js image optimisation — serves WebP/AVIF automatically,
    // generates responsive srcsets, and lazy-loads off-screen images.
    unoptimized: false,

    // Allowed remote image hostnames.
    // TRANSITIONAL: Unsplash covers any placeholder URLs still in the
    // codebase. Remove it once all images are local (/public/images/)
    // or served from your CMS CDN (e.g. cdn.sanity.io).
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],

    // Serve modern formats where the browser supports them
    formats: ['image/avif', 'image/webp'],

    // Standard responsive breakpoints
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
}

export default nextConfig
