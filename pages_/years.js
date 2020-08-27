import Layout from "components/Layout/Layout";
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation'
import {Card} from "components/Card/Card";

function Years() {
  const { t } = useTranslation()

  const yearItems = []
	let supportedYears = ["2020", "2019", "2018"]
	for (let year in supportedYears) {
		yearItems.push(<li key={supportedYears[year]}><Link href={`year/${supportedYears[year]}`}><a>{supportedYears[year]}</a></Link></li>)
	}
	
	return (
		<>
			<NextSeo
				title={`F1 Calendar Archive  - Formula One Race Times and Dates`}
				description={`Formula One Calendar Archive with all F1 grand prix races, practice &amp; qualifying sessions. Set reminders feature. All world timezones. Download or subscribe.`}
				keywords={`F1, formula one, race times, races, reminder, alerts, grands prix, grand prix, calendar, dates, start times, qualifying, practice, London, Europe`}
				canonical="https://www.f1calendar.com/"
				twitter={{
					handle: '@f1cal',
					site: '@f1cal',
					cardType: 'summary_large_image',
				}}
			/>
			<Layout>
				<h3>{ t('years:title') }</h3>
				<Card>
					<p>
					<ul>
						{yearItems}
					</ul>
					</p>
				</Card>
			</Layout>
		</>
	);
}

export default Years;