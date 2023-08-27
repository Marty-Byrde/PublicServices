/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
    },
    async redirects() {
        return [
            {
                source: "/orders/settings",
                destination: "/orders",
                permanent: true,
            },
        ];
    },
}

module.exports = nextConfig
