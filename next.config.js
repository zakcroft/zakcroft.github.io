/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",  // <=== enables static exports
  reactStrictMode: true,
    distDir: 'build',
    images: {
      unoptimized: true
    }
};

module.exports = nextConfig;