import {useTranslations} from 'next-intl';
import {getTranslations} from 'next-intl/server';
import Layout from "components/Layout/Layout";
import Notice from "components/Notice/Notice";
import OptionsBar from "components/OptionsBar/OptionsBar";
import Races from "components/Races/Races";
import RaceSchemas from 'components/RaceSchemas/RaceSchemas';

export async function generateMetadata() {
  const t = await getTranslations('All');
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  return {
    title: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {year: currentYear}),
    description: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, {year: currentYear}),
    keywords: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.keywords`, {year: currentYear}),
  }
}

export default function Page() {
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
  const year = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/${currentYear}.json`);

  return (
    <Layout showCTABar={true} year={currentYear}>
      <OptionsBar pickerShowing={false} />
      <Notice />
      <Races year={currentYear} races={year.races} />
    </Layout>
  )
}