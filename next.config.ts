/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media.istockphoto.com',
      'developers.google.com',
      'lh3.googleusercontent.com',
      'via.placeholder.com',
    ],
  },
  eslint: {
    // Ignore ESLint errors during builds (optional, use with caution)
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
