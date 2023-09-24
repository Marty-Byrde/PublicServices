/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true,
        serverActions: true
    },
    images: {
        remotePatterns: [
            {
                port: '',
                hostname: 'avatars.githubusercontent.com',
                protocol: 'https',
                pathname: '/u/**',
            }
        ]
    }
}

module.exports = nextConfig
