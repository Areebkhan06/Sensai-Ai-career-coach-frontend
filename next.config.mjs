/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false,   // ⬅️ THIS DISABLES TURBOPACK (important)
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "randomuser.me",
      },
    ],
  },
};

export default nextConfig;
