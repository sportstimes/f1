import {useTranslations} from 'next-intl';
import Layout from "components/Layout/Layout";
import Card from "components/Card/Card";
import Link from "next/link";
import OptionsBar from "components/OptionsBar/OptionsBar";
import Races from "components/Races/Races";
import RaceSchemas from 'components/RaceSchemas/RaceSchemas';

export interface Props {
  params: { timezone: string };
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
    <Layout year={currentYear}>
      {data.races &&
        <Races year={currentYear} races={data.races} timezone={timezone}/>
      }
      
      {/* // TODO <RaceSchemas races={data.races} />*/}
    </Layout>
  )
}
