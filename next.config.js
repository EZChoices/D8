/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co"
      }
    ]
  },
  async redirects() {
    return [
      { source: '/lab-tested', destination: '/quality', permanent: true },
      { source: '/lab-results', destination: '/quality#lab-results', permanent: true }
    ]
  },
  async headers() {
    const headers = [
      {
        source: "/(.*)",
        headers: [
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" }
        ]
      },
      {
        source: "/product-images/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" }
        ]
      }
    ];
    if (process.env.VERCEL_ENV === 'preview') {
      headers.push({
        source: "/(.*)",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }]
      });
    }
    return headers;
  }
};

module.exports = nextConfig;
