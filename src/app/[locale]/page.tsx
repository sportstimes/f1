import { useTranslations } from 'next-intl';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import Layout from 'components/Layout/Layout';
import Notice from 'components/Notice/Notice';
import OptionsBar from 'components/OptionsBar/OptionsBar';
import Races from 'components/Races/Races';
import RaceSchemas from 'components/RaceSchemas/RaceSchemas';

export async function generateMetadata() {
  const t = await getTranslations('All');
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
  const config = require(
    `/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`,
  );

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

export default function Page({ children, params: { locale } }) {
  unstable_setRequestLocale(locale);

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
