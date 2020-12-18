import Layout from "components/Layout/Layout";
import {NextSeo} from "next-seo";
import Link from "next/link";
import ct from "countries-and-timezones";
import Card from "components/Card/Card";

import useTranslation from "next-translate/useTranslation";

function Timezones() {
  const {t, lang} = useTranslation();
  
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

  const title = t(`${process.env.NEXT_PUBLIC_SITE_KEY}:seo.title`, {
    year: currentYear
  });
  const description = t(`${process.env.NEXT_PUBLIC_SITE_KEY}:seo.description`, {
    year: currentYear
  });
  const keywords = t(`${process.env.NEXT_PUBLIC_SITE_KEY}:seo.keywords`, {
    year: currentYear
  });

  // Picker Items
  const timezoneItems = [];

  let zoneslist = Object.keys(ct.getAllTimezones());

  for (let zone in zoneslist) {
    let timezoneSlug = zoneslist[zone].replace(/\//g, "-");
    timezoneItems.push(
      <li key={zoneslist[zone]}>
        <Link href={`timezone/${timezoneSlug}`}>
          <a>{zoneslist[zone]}</a>
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
      <Layout>
        <h3 className="text-xl mb-4">{t("timezones:title")}</h3>
        <Card>
          <p>
            <ul>{timezoneItems}</ul>
          </p>
        </Card>
      </Layout>
    </>
  );
}

export default Timezones;