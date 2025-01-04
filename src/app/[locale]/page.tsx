import { useTranslations } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import Layout from 'components/Layout/Layout';
import Notice from 'components/Notice/Notice';
import OptionsBar from 'components/OptionsBar/OptionsBar';
import Races from 'components/Races/Races';
import RaceSchemas from 'components/RaceSchemas/RaceSchemas';
import i18nConfig from '../../i18nConfig.js';

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
