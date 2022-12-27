/** @type {import('next').NextConfig} */
const path = require("path");
const withTM = require("next-transpile-modules")(["ui"]);
const withVideos = require('next-videos')

const nextConfig = withTM({
    // reactStrictMode: true,
    ignoreDuringBuilds: true,
    swcMinify: true,
    optimizeFonts: true,
    env: {
        APP_URL: "http://ec2-18-134-205-127.eu-west-2.compute.amazonaws.com",
        MONGO_URL: "mongodb://",
    },
    sassOptions: {
        includePaths: [path.join(__dirname, "styles")],
        prependData: `@import "./pages/style.scss";`,
    },
    i18n: {
        locales: ["en-US", "fr", "nl-NL"],
        defaultLocale: "en-US",
        localeDetection: false,
        // domains: [
        //   {
        //     domain: 'example.com',
        //     defaultLocale: 'en-US',
        //   },
        //   {
        //     domain: 'example.nl',
        //     defaultLocale: 'nl-NL',
        //   },
        //   {
        //     domain: 'example.fr',
        //     defaultLocale: 'fr',
        //     http: true,
        //   },
        // ],

    },

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        return config;
    },
});

module.exports = withVideos(nextConfig);