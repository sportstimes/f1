import {useTranslations} from 'next-intl';
import Card from "components/Card/Card";
import Link from "next/link";
import ct from "countries-and-timezones";

export default function Timezones() {
  const t = useTranslations('All');
  
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
    <>
      <h3 className="text-xl mb-4">
        {t("timezones.title")}
      </h3>
      <Card>
        <ul>{timezoneItems}</ul>
      </Card>
    </>
  )
}