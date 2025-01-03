import { notFound } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Layout from 'components/Layout/Layout';
import Card from 'components/Card/Card';
import Link from 'next/link';
import OptionsBar from 'components/OptionsBar/OptionsBar';
import Races from 'components/Races/Races';

export interface Props {
  params: { year: string; locale: string };
}

export async function generateMetadata({
  params,
}: Omit<Props, 'children'>): Promise<Metadata> {
  const year = (await params).year;

  const t = await getTranslations('All');

  return {
    title: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, { year: year }),
    description: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, {
      year: year,
    }),
    keywords: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.keywords`, {
      year: year,
    }),
  };
}

export async function generateStaticParams() {
  const config = require(
    `/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`,
  );

  let availableYears = config.availableYears;

  const yearItems = [];
  // for (let year in availableYears) {
  //   yearItems.push(config.availableYears[year]);
  // }

  return yearItems;
}

export default async function Year({ children, params }) {
  const { locale, year } = await params;

  setRequestLocale(locale);

  const t = await getTranslations('All');

  const config = require(
    `/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`,
  );

  let availableYears = config.availableYears;
  if (!availableYears.includes(parseInt(year))) {
    notFound();
  }

  const data = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/${year}.json`);

  if (data.races) {
    return (
      <Layout year={year}>
        <OptionsBar pickerShowing={false} />
        <Races year={year} races={data.races} />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <h3 className="text-xl mb-4">
          Oops, unfortunately we dont go back that far yet.
        </h3>
        <Card>
          <p>
            Want to add more historical dates to F1 Calendar? Contribute
            previous seasons via our{' '}
            <a href="https://github.com/sportstimes/f1">GitHub repository</a>.
          </p>
        </Card>
      </Layout>
    );
  }
}
