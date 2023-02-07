/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['i.ytimg.com'],
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
