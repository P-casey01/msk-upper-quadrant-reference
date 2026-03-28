/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // Static HTML export
  trailingSlash: true,       // Needed for static hosting
  images: {
    unoptimized: true,       // Required for static export
  },
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
}

export default nextConfig
