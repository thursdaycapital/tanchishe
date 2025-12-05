/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Farcaster miniapp 需要允许 iframe 嵌入
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'ALLOWALL'
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors *"
          }
        ]
      }
    ]
  }
}

module.exports = nextConfig

