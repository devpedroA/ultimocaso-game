/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['imgs.search.brave.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

module.exports = nextConfig; 