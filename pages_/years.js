import Layout from "../components/Layout";
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation'

function Years() {
  const { t } = useTranslation()

  const yearItems = []
	let supportedYears = ["2021", "2020", "2019", "2018"]
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
				
				<section>
					<h4>{ t('years:title') }</h4>
				
					<p>
					<ul>
						{yearItems}
					</ul>
					</p>
				
				</section>
				
				
				<style jsx>{`
					form {
						border: 1px solid #151515;
						margin-bottom: 25px;
						-webkit-border-radius: 4px;
						-moz-border-radius: 4px;
						border-radius: 4px;
						vertical-align:middle;
					}
					fieldset {
						border:0;	
					}
					
					p {
						margin-bottom: 15px;	
					}
					
					button {
						background: #1a8b73;
						margin-bottom: 25px;
						-webkit-border-radius: 4px;
						-moz-border-radius: 4px;
						padding: 12px;
						font-size:15px;
						border:0;
						color:#fff;
						cursor: pointer;
					}
					
					.button {
						background: #1a8b73;
						margin-bottom: 25px;
						-webkit-border-radius: 4px;
						-moz-border-radius: 4px;
						padding: 12px;
						font-size:15px;
						border:0;
						color:#fff;
						cursor: pointer;
					}
					
					section {
						
					}
					
					hr {
						border: 1px solid #151515;
						width: 25%;
						margin: 15px auto;		
					}
					
			    `}</style>
			</Layout>
		</>
	);
}


export default Years;