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
  if ((isProd || isStaging) && (process.env.NEXT_PUBLIC_SITE_KEY == "f1")) {
    require('./build/generate-calendars');
  }

  return withPWA(nextTranslate({
    webpack: (cfg) => {
      cfg.module.rules.push(
          {
              test: /\.md$/,
              loader: 'frontmatter-markdown-loader',
              options: { mode: ['react-component'] }
          }
      )
      return cfg;
    },
    pwa: {
      disable: !isProd,
      dest: "public",
      publicExcludes: ['!download/*', '!download/**/*'],
      buildExcludes: ['!download/*', '!download/**/*'],
    },
    redirects: async function redirects() {
      const rules = [];
      
      if(process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true"){
        rules.push(
            {
              source: "/*",
              destination: "/maintenance",
              permanent: false,
            }
        );
      }
      
      // Handle 2022 adjustment to separate sprint races out as a separate session.
      // This allows users who generated a url prior to 2022 to get sprint sessions
      // Without needing to regenerate the url for the new format.
      if(process.env.NEXT_PUBLIC_SITE_KEY === "f1"){
        rules.push(
            {
              source: '/download/:prefix*_q_:suffix*',
              permanent: true,
              destination: 'https://files.motorsportcalendars.com/:prefix*_sprint_qualifying_:suffix*',
            }
        );
      }
      
      rules.push(
          {
            source: "/download/:file*",
            destination: `https://files-${process.env.NEXT_PUBLIC_SITE_KEY}.motorsportcalendars.com/:file*`,
            permanent: true,
          }
      );
      
      return rules; 
    }
  }))
}