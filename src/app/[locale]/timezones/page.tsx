import {useTranslations} from 'next-intl';
import Layout from "components/Layout/Layout";
import Card from "components/Card/Card";
import Link from "next/link";
import ct from "countries-and-timezones";

export default function Timezones() {
  const t = useTranslations('All');
  
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  // Picker Items
  const timezoneItems = [];
  
  let zoneslist = Object.keys(ct.getAllTimezones());
  
  for (let zone in zoneslist) {
    let timezoneName = zoneslist[zone];
    if(timezoneName == "Europe/Kiev"){
      timezoneName = "Europe/Kyiv";
    }
    
    
    let timezoneSlug = timezoneName.replace(/\//g, "-");
    timezoneItems.push(
      <li key={timezoneName}>
        <Link href={`timezone/${timezoneSlug}`}>
          {timezoneName}
        </Link>
      </li>
    );
  }

  return (
    <Layout year={currentYear}>
      <h3 className="text-xl mb-4">
        {t("timezones.title")}
      </h3>
      <Card>
        <ul>{timezoneItems}</ul>
      </Card>
    </Layout>
  )
}