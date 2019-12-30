const withFonts = require('next-fonts');
module.exports = withFonts({
  webpack(config, options) {
	config.node = { net: 'empty' }
    return config;
  }
});