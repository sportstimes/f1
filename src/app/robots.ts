import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const config = require(
    `/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`,
  );

  return {
    rules: {
      userAgent: '*',
    },
    sitemap: `https://${config.url}/sitemap.xml`,
  };
}
