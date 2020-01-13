const withFonts = require('next-fonts');
const withOffline = require('next-offline');

const nextConfig = {
  webpack(config, options) {
	config.node = { net: 'empty' }
    return config;
  },
  target: 'serverless',
  transformManifest: manifest => ['/'].concat(manifest),
  generateInDevMode: true,
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'https-calls',
          networkTimeoutSeconds: 15,
          expiration: {
            maxEntries: 150,
            maxAgeSeconds: 14 * 24 * 60 * 60, // 14 days
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      { // Cache the underlying font files with a cache-first strategy for 1 year.
        urlPattern: /.*\.(?:woff|woff2)$/,
        options: {
          cacheName: 'fonts',
          cacheableResponse: { statuses: [0, 200] },
          expiration: { maxAgeSeconds: 60 * 60 * 24 * 365, maxEntries: 30 }
        }
      },
    ],
  },
};

module.exports = withOffline(withFonts(nextConfig));