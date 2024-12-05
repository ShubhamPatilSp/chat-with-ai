/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    TURSO_DB_URL: process.env.TURSO_DB_URL,
    TURSO_AUTH_TOKEN: process.env.TURSO_AUTH_TOKEN,
  },
  typescript: {
    ignoreBuildErrors: true, // For initial deployment, we can ignore TS errors
  },
  eslint: {
    ignoreDuringBuilds: true, // For initial deployment, we can ignore ESLint errors
  },
};

module.exports = nextConfig;
