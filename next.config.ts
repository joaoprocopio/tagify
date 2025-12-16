import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: "/",
                destination: "/products",
                permanent: true,
            },
        ]
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "cdn.shopify.com",
                pathname: "/s/files/**",
            },
        ],
    },
}

export default nextConfig
