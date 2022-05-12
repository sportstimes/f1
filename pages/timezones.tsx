import Layout from "../components/Layout/Layout";
import {NextSeo} from "next-seo";
import Link from "next/link";
import ct from "countries-and-timezones";
import Card from "../components/Card/Card";

import useTranslation from "next-translate/useTranslation";

function Timezones() {
  const {t, lang} = useTranslation();
  
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  const title = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {
    year: currentYear
  });
  const description = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, {
    year: currentYear
  });
  const keywords = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.keywords`, {
    year: currentYear
  });

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
          <a>{timezoneName}</a>
        </Link>
      </li>
    );
  }

  return (
    <>
      <NextSeo
        title={title}
        description={description}
        keywords={keywords}
      />
      <Layout year={currentYear}>
        <h3 className="text-xl mb-4">{t("localization:timezones.title")}</h3>
        <Card>
          <p>
            <ul>{timezoneItems}</ul>
          </p>
        </Card>
      </Layout>
    </>
  );
}

export async function getStaticProps() {
  return {
    revalidate: 3600
  }
}

export default Timezones;