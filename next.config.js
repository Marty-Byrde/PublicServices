const withPWA = require('next-pwa')({
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development'
})
const path = require("path")

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                port: '',
                hostname: 'avatars.githubusercontent.com',
                protocol: 'https',
                pathname: '/u/**',
            }
        ]
    },
    webpack(config){
        const packagePath = require.resolve("next-pwa");
        const packageDirectory = path.dirname(packagePath);
        const registerJs = path.join(packageDirectory, "register.js");
        const entry = config.entry;

        config.entry = () =>
            entry().then((entries) => {
                // Automatically registers the SW and enables certain `next-pwa` features in
                // App Router (https://github.com/shadowwalker/next-pwa/pull/427)
                if (entries["main-app"] && !entries["main-app"].includes(registerJs)) {
                    if (Array.isArray(entries["main-app"])) {
                        entries["main-app"].unshift(registerJs);
                    } else if (typeof entries["main-app"] === "string") {
                        entries["main-app"] = [registerJs, entries["main-app"]];
                    }
                }
                return entries;
            });

        return config;
    }
}

module.exports = withPWA(nextConfig)
