import i18nConfig from '../../i18nConfig.js';

interface Props {
  locale: string;
  currentYear: string;
  siteName: string;
  siteDescription: string;
}

export default function WebSiteSchema({ locale, currentYear, siteName, siteDescription }: Props) {
  const config = require(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
  const { locales } = i18nConfig;

  const siteUrl = `https://${config.url}`;

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      "url": siteUrl,
      "name": `${siteName} ${currentYear}`,
      "description": siteDescription,
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
      "name": siteName,
      "url": siteUrl,
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.png`,
        "@id": `${siteUrl}/#logo`
      }
    }
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
