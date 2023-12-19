import {useTranslations} from 'next-intl';
import Layout from "components/Layout/Layout";
import Card from "components/Card/Card";
import Link from "next/link";
import OptionsBar from "components/OptionsBar/OptionsBar";
import Races from "components/Races/Races";

export interface Props {
  params: { year: string };
}

export default function Year({params}: Props) {
  const t = useTranslations('All');
  
  const year = params.year;
  const config = require(`../../../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
  const data = require(`../../../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/${year}.json`);

  if(data.races){
    return (
      <Layout year={year}>
        <OptionsBar pickerShowing={false} />
        <Races year={year} races={data.races} />
      </Layout>
    )
  } else {
    return (
      <Layout>
        <h3 className="text-xl mb-4">
          Oops, unfortunately we dont go back that far yet.
        </h3>
        <Card>
          <p>
            Want to add more historical dates to F1 Calendar?
            Contribute previous seasons via our{" "}
            <a href="https://github.com/sportstimes/f1">
              GitHub repository
            </a>
            .
          </p>
        </Card>
      </Layout>
    ) 
  }
}
