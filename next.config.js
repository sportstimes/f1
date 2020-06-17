const withFonts = require('next-fonts')
const withPWA = require("next-pwa")

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  webpack(config, {isServer}) {
    // Generate the ICS files at build time.
    if (isServer) {
      require('./utils/generate-calendars');
    } 
  	config.node = { net: 'empty' }
    return config;
  },
  pwa: {
    disable: !isProd,
    dest: "public"
  }
};

module.exports = withPWA(withFonts(nextConfig));