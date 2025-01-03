import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Layout from 'components/Layout/Layout';
import Notice from 'components/Notice/Notice';
import OptionsBar from 'components/OptionsBar/OptionsBar';
import Races from 'components/Races/Races';
import RaceSchemas from 'components/RaceSchemas/RaceSchemas';
import i18nConfig from '../../i18nConfig.js';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const t = await getTranslations('All');
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
  const config = require(
    `/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`,
  );

  const { locales } = i18nConfig;
  const currentLocale = params.locale || 'en';

  // Helper function to create language alternates
  const createLanguageAlternates = (path: string = '') => {
    const languages: { [key: string]: string } = {};

    locales.forEach((locale: string) => {
      // For the default locale (assuming it's 'en'), don't add the locale prefix
      const localePath = locale === 'en' ? path : `/${locale}${path}`;
      languages[locale] = `https://${config.url}${localePath}`;
    });

    return languages;
  };

  // Generate canonical URL based on current locale
  const canonicalPath = currentLocale === 'en' ? '' : `/${currentLocale}`;
  const canonical = `https://${config.url}${canonicalPath}`;

  return {
    title: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {
      year: currentYear,
    }),
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
    manifest: '/manifest.json',
    twitter: {
      card: 'summary_large_image',
      creator: '@f1cal',
      creatorId: '1467726470533754880',
      images: [`https://${config.url}/share.png`],
    },
    openGraph: {
      title: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {
        year: currentYear,
      }),
      description: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, {
        year: currentYear,
      }),
      url: `https://${config.url}/`,
      siteName: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {
        year: currentYear,
      }),
      images: [`https://${config.url}/share.png`],
      type: 'website',
    },
    appleWebApp: {
      title: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {
        year: currentYear,
      }),
      statusBarStyle: 'black-translucent',
      capable: true,
    },
  };
}

export async function generateStaticParams() {
  return [];
}

export default async function Page({ children, params }) {
  const locale = (await params).locale;

  setRequestLocale(locale);

  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
  const year = require(
    `/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/${currentYear}.json`,
  );

  return (
    <Layout showCTABar={true} year={currentYear}>
      <OptionsBar pickerShowing={false} />
      <Notice />
      <Races year={currentYear} races={year.races} />
    </Layout>
  );
}
