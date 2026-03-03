/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/images/**',
      },
      // Optional: also allow the files endpoint if you ever use videoFile / raw assets
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        port: '',
        pathname: '/files/**',
      },
    ],

    dangerouslyAllowLocalIP: process.env.NODE_ENV === 'development',

    qualities: [50, 75, 85, 90],

  },
};

export default nextConfig;