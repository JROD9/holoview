/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    domains: ['lh3.googleusercontent.com'], // Allow Google OAuth profile images
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: true,
  transpilePackages: ['recharts'],

}

module.exports = nextConfig
