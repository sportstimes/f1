import {useState} from 'react'
import Layout from "../components/Layout";
import { NextSeo } from 'next-seo';
import Link from 'next/link';
const moment = require('moment-timezone')

function Timezones() {
	const currentYear = '2020';
	
	// Picker Items
    const timezoneItems = []
	let zoneslist = moment.tz.names()
	for (let zone in zoneslist) {
		timezoneItems.push(<li key={zoneslist[zone]}><Link href={`timezone/${zoneslist[zone]}`}><a>{zoneslist[zone]}</a></Link></li>)
	}
	
	return (
		<>
			<NextSeo
				title={`F1 Calendar ${currentYear}  - Formula One Race Times and Dates`}
				description={`Formula One Calendar for ${currentYear} season with all F1 grand prix races, practice &amp; qualifying sessions. Set reminders feature. All world timezones. Download or subscribe.`}
				keywords={`F1, formula one, race times, races, reminder, alerts, grands prix, grand prix, calendar, dates, start times, qualifying, practice, ${currentYear}, London, Europe`}
				canonical="https://www.f1calendar.com/"
				twitter={{
					handle: '@f1cal',
					site: '@f1cal',
					cardType: 'summary_large_image',
				}}
			/>
			<Layout>
				
				<section>
					<h4>Pick a timezone...</h4>
					
					<p>
						<ul>
							{timezoneItems}
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


export default Timezones;