/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  // No basePath or assetPrefix needed for a root-level deployment
}

module.exports = nextConfig
