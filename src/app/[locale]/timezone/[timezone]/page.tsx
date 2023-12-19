import {useTranslations} from 'next-intl';
import {getTranslations} from 'next-intl/server';
import Layout from "components/Layout/Layout";
import Card from "components/Card/Card";
import Link from "next/link";
import OptionsBar from "components/OptionsBar/OptionsBar";
import Races from "components/Races/Races";
import RaceSchemas from 'components/RaceSchemas/RaceSchemas';

export interface Props {
  params: { timezone: string };
}

export async function generateMetadata({
  params: {timezone}
}: Omit<Props, 'children'>): Promise<Metadata> {
  const t = await getTranslations('All');
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  return {
    title: `${timezone} - ${t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {year: currentYear})}`,
    description: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, {year: currentYear}),
    keywords: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.keywords`, {year: currentYear}),
  }
}

export default function Year({params}: Props) {
  const t = useTranslations('All');
    
  var timezone = params.timezone ? params.timezone.replace("-", "/") : "";
  var displayTimezone = timezone;
  
  if(timezone == "Europe/Kyiv"){
    timezone = "Europe/Kiev";
  }
  
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
  const config = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
  const data = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/${currentYear}.json`);

  return (
    <Layout showCTABar={true} year={currentYear} timezone={timezone}>
      {data.races &&
        <Races year={currentYear} races={data.races} timezone={timezone}/>
      }
      
      {/* // TODO <RaceSchemas races={data.races} />*/}
    </Layout>
  )
}
