import Layout from "components/Layout/Layout";
import {useTranslations} from 'next-intl';
import Card from "components/Card/Card";
import Link from "next/link";

export default function Years() {
  const t = useTranslations('All');
  
  const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
  
  const config = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
  
  let availableYears = config.availableYears;
  
  const yearItems = [];
  for (let year in availableYears) {
    yearItems.push(
      <li key={availableYears[year]}>
        <Link href={`year/${config.availableYears[year]}`}>
          {availableYears[year]}
        </Link>
      </li>
    );
  }

  return (
    <Layout>
      <h3 className="text-xl mb-4">
        {t("years.title")}
      </h3>
      <Card>
        <ul>{yearItems}</ul>
      </Card>
    </Layout>
  )
}