import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Layout from 'components/Layout/Layout';
import Card from 'components/Card/Card';
import Link from 'next/link';
import ct from 'countries-and-timezones';
import i18nConfig from '../../../i18nConfig.js';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations('All');
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  const { locales } = i18nConfig;

  const { locale } = await params;
  const currentLocale = locale || 'en';

  // Helper function to create language alternates
  const createLanguageAlternates = (path: string = '') => {
    const languages: { [key: string]: string } = {};

    locales.forEach((locale: string) => {
      // For the default locale (assuming it's 'en'), don't add the locale prefix
      const localePath = locale === 'en' ? path : `/${locale}${path}`;
      languages[locale] = `https://${config.url}${localePath}/timezones`;
    });

    languages['x-default'] = `https://${config.url}/timezones`;

    return languages;
  };

  const config = require(
    `/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`,
  );
  const canonicalPath = currentLocale === 'en' ? '' : `/${currentLocale}`;
  const canonical = `https://${config.url}${canonicalPath}/timezones`;

  return {
    title: `Timezones - ${t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, { year: currentYear })}`,
    description: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, {
      year: currentYear,
    }),
    keywords: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.keywords`, {
      year: currentYear,
    }),
    alternates: {
      canonical,
      languages: createLanguageAlternates(),
    },
  };
}

export async function generateStaticParams() {
  return [];
}

export default async function Timezones({ children, params }) {
  const locale = (await params).locale;

  setRequestLocale(locale);

  const t = await getTranslations('All');

  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  // Picker Items
  const timezoneItems = [];

  let zoneslist = Object.keys(ct.getAllTimezones());

  for (let zone in zoneslist) {
    let timezoneName = zoneslist[zone];
    if (timezoneName == 'Europe/Kiev') {
      timezoneName = 'Europe/Kyiv';
    }

    let timezoneSlug = timezoneName.replace(/\//g, '-');
    timezoneItems.push(
      <li key={timezoneName}>
        <Link href={`timezone/${timezoneSlug}`}>{timezoneName}</Link>
      </li>,
    );
  }

  return (
    <Layout year={currentYear}>
      <h3 className="text-xl mb-4">{t('timezones.title')}</h3>
      <Card>
        <ul>{timezoneItems}</ul>
      </Card>
    </Layout>
  );
}
