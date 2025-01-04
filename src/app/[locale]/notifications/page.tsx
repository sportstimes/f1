import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Layout from 'components/Layout/Layout';
import Card from 'components/Card/Card';
import { usePlausible } from 'next-plausible';
import { notFound } from 'next/navigation';
import Form from './form';

export async function generateMetadata() {
  const t = await getTranslations('All');
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  return {
    title: `${t('notifications.title')} - ${t(`${process.env.NEXT_PUBLIC_SITE_KEY}.title`)}`,
    description: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, {
      year: currentYear,
    }),
    keywords: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.keywords`, {
      year: currentYear,
    }),
  };
}

export async function generateStaticParams() {
  return [];
}

export default async function Notifications({ children, params }) {
  const locale = (await params).locale;

  setRequestLocale(locale);

  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
  const t = await getTranslations('All');

  const config = require(
    `/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`,
  );

  if (!config.supportsWebPush) {
    notFound();
  }

  return (
    <Layout showCTABar={true} year={currentYear}>
      <h3 className="text-xl mb-4">{t('notifications.title')} (Beta)</h3>
      <Card>
        <Form />
      </Card>
    </Layout>
  );
}
