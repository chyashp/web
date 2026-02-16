/** @type {import('next').NextConfig} */
const nextConfig = {
  // Existing config options...
  
  // Add this to suppress the punycode warning
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        punycode: false,
      }
    }
    return config
  },
}

module.exports = nextConfig 