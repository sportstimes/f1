const withFonts = require('next-fonts')
const withPWA = require("next-pwa")
const nextTranslate = require('next-translate')

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants')

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER
  const isProd = phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1'
  const isStaging =
      phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1'

  // Move _public/:site_key to public
  require('./build/public-assets');

  // Generate the ICS files at build time.
  if (isProd || isStaging) {
    require('./build/generate-calendars');
  }

  return withPWA(nextTranslate(withFonts({
    pwa: {
      disable: !isProd,
      dest: "public"
    }
  })))
}