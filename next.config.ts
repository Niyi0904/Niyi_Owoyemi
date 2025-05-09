// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    domains: ['ibb.co', 'i.ibb.co'], // Allow images from ImgBB
  },
  // Other Next.js config options...
}

export default nextConfig