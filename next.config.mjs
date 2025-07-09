/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Allows all hostnames
      },
    ],
    // Or alternatively use the deprecated domains array (still works):
    // domains: ['*'], // Not officially supported but may work
  },
};

export default nextConfig;
