/** @type {import('next').NextConfig} */
const path = require('path');
const withTM = require("next-transpile-modules")(["ui"]);

const nextConfig = withTM({
  reactStrictMode: true,
  swcMinify: true,
  optimizeFonts: true,
  env: {
    APP_URL: 'https://jsonplaceholder.typicode.com',
    MONGO_URL: 'mongodb://',
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "./pages/style.scss";`,
  },
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL'],
    defaultLocale: 'en-US',
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
      use: ['@svgr/webpack'],
    })

    return config
  },
})
module.exports = nextConfig;