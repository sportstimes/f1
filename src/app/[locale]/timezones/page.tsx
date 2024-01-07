import {useTranslations} from 'next-intl';
import {getTranslations, unstable_setRequestLocale} from 'next-intl/server';
import Layout from "components/Layout/Layout";
import Card from "components/Card/Card";
import Link from "next/link";
import ct from "countries-and-timezones";

export async function generateMetadata() {
  const t = await getTranslations('All');
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  return {
    title: `Timezones - ${t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {year: currentYear})}`,
    description: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, {year: currentYear}),
    keywords: t(`${process.env.NEXT_PUBLIC_SITE_KEY}.seo.keywords`, {year: currentYear}),
  }
}

export async function generateStaticParams() {
  return [];
}

export default function Timezones({params: {locale}}) {
  unstable_setRequestLocale(locale);
  
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