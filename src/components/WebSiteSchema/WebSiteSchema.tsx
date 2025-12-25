import i18nConfig from '../../../i18nConfig.js';

interface Props {
  locale: string;
  currentYear: string;
}

export default function WebSiteSchema({ locale, currentYear }: Props) {
  const config = require(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
  const { locales } = i18nConfig;

  const siteUrl = `https://${config.url}`;

  // Generate language URLs for potentialAction
  const languageUrls = locales.map((loc: string) => {
    const localePath = loc === 'en' ? '' : `/${loc}`;
    return `${siteUrl}${localePath}`;
  });

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": `F1 Calendar ${currentYear}`,
      "description": `Formula 1 race times and schedule for the ${currentYear} season`,
      "inLanguage": locales,
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${siteUrl}/timezone/{timezone}`
        },
        "query-input": "required name=timezone"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      "name": "F1 Calendar",
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`,
        "@id": `${siteUrl}/#logo`
      },
      "sameAs": [
        "https://twitter.com/f1cal"
      ]
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
