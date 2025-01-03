import type { MetadataRoute } from 'next';
import i18nConfig from '../i18nConfig.js';

export default function sitemap(): MetadataRoute.Sitemap {
  const config = require(
    `/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`,
  );

  const { locales } = i18nConfig;

  // Helper function to create alternates for a given path
  const createAlternates = (path: string = '') => {
    const languages: { [key: string]: string } = {};

    locales.forEach((locale: string) => {
      // For the default locale, don't add the locale prefix
      const localePath = locale === 'en' ? path : `/${locale}${path}`;
      languages[locale] = `https://${config.url}${localePath}`;
    });

    return { languages };
  };

  let items: MetadataRoute.Sitemap = [
    {
      url: `https://${config.url}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: createAlternates(),
    },
    {
      url: `https://${config.url}/generate`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.8,
      alternates: createAlternates('/generate'),
    },
    {
      url: `https://${config.url}/timezones`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
      alternates: createAlternates('/timezones'),
    },
    {
      url: `https://${config.url}/years`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
      alternates: createAlternates('/years'),
    },
  ];

  if (config.supportsWebPush) {
    items.push({
      url: `https://${config.url}/notifications`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
      alternates: createAlternates('/notifications'),
    });
  }

  if (config.supportsEmailReminders) {
    items.push({
      url: `https://${config.url}/subscribe`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
      alternates: createAlternates('/subscribe'),
    });
  }

  return items;
}
