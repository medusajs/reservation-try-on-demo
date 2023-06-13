/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "@medusajs/inventory",
      "@medusajs/stock-location",
    ],
  },
  images: {
    domains: [
      "medusa-public-images.s3.eu-west-1.amazonaws.com",
      "loremflickr.com",
      "medusa-server-testing.s3.amazonaws.com",
      "images.ctfassets.net",
      "medusa-test.fra1.digitaloceanspaces.com",
    ],
  },
}

module.exports = nextConfig
