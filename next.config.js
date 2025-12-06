const withPWA = require('@ducanh2912/next-pwa').default({
  dest: 'public',
  skipWaiting: true,
  register: true,
  importScripts: ['firebase-messaging-sw.js'],
});
const withNextIntl = require('next-intl/plugin')('./src/i18n.ts');

const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require('next/constants');

module.exports = (phase) => {
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  // Move _public/:site_key to public
  require('./build/public-assets');

  return withNextIntl(
    withPWA({
      typescript: {
        ignoreBuildErrors: true,
      },
      webpack: (cfg) => {
        cfg.module.rules.push({
          test: /\.md$/,
          loader: 'ignore-loader',
        });
        return cfg;
      },
      redirects: async function redirects() {
        const rules = [];

        // Handle 2022 adjustment to separate sprint races out as a separate session.
        // This allows users who generated a url prior to 2022 to get sprint sessions
        // Without needing to regenerate the url for the new format.
        if (process.env.NEXT_PUBLIC_SITE_KEY === 'f1') {
          rules.push({
            source: '/download/:prefix*_q_:suffix',
            permanent: true,
            destination: `https://files-${process.env.NEXT_PUBLIC_SITE_KEY}.motorsportcalendars.com/:prefix*_qualifying_sprint_\:suffix`,
          });

          rules.push(
            {
              source: '/f1_p1_p2_p3_q_gp.ics',
              permanent: true,
              destination:
                'https://files-f1.motorsportcalendars.com/f1-calendar_p1_p2_p3_qualifying_sprint_gp.ics',
            },
            {
              source: '/download.php',
              permanent: true,
              destination:
                'https://files-f1.motorsportcalendars.com/f1-calendar_p1_p2_p3_qualifying_sprint_gp.ics',
            },
          );
        }

        rules.push({
          source: '/download/:file*',
          destination: `https://files-${process.env.NEXT_PUBLIC_SITE_KEY}.motorsportcalendars.com/:file*`,
          permanent: true,
        });

        return rules;
      },
    }),
  );
};
