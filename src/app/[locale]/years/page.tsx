import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Layout from 'components/Layout/Layout';
import Card from 'components/Card/Card';
import Link from 'next/link';

export async function generateMetadata() {
  const t = await getTranslations('All');
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  return {
    title: `Years - ${t(`${process.env.NEXT_PUBLIC_SITE_KEY}.title`)}`,
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

export default async function Years({ children, params }) {
  const locale = (await params).locale;

  setRequestLocale(locale);

  const t = await getTranslations('All');

  const config = require(
    `../../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`,
  );

  let availableYears = config.availableYears;

  const yearItems = [];
  for (let year in availableYears) {
    yearItems.push(
      <li key={availableYears[year]}>
        <Link href={`year/${config.availableYears[year]}`}>
          {availableYears[year]}
        </Link>
      </li>,
    );
  }

  return (
    <Layout>
      <h3 className="text-xl mb-4">{t('years.title')}</h3>
      <Card>
        <ul>{yearItems}</ul>
      </Card>
    </Layout>
  );
}
