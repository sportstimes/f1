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

  return withPWA(nextTranslate(withFonts({
    pwa: {
      disable: !isProd,
      dest: "public"
    }
  })))
}
 
// webpack(config, {isServer}) {
//   // Generate the ICS files at build time.
//   if (isServer && (isProd || isStaging)) {
//     require('./utils/generate-calendars');
//   }
//   config.node = { net: 'empty' }
//   return config;
// },