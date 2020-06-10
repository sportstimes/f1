import {useState} from 'react'
import Layout from "../components/Layout";
import { NextSeo } from 'next-seo';
import Link from 'next/link';
const moment = require('moment-timezone')
import useTranslation from 'next-translate/useTranslation'

function Timezones() {
  const { t, lang } = useTranslation()
  const title = t('common:title')
  const subtitle = t('common:subtitle')
  
	const currentYear = '2020';
  const metaDescription = t('common:meta.description', { year: currentYear })
  const metaKeywords = t('common:meta.keywords', { year: currentYear })
  	
	// Picker Items
    const timezoneItems = []
	let zoneslist = moment.tz.names()
	for (let zone in zoneslist) {
		timezoneItems.push(<li key={zoneslist[zone]}><Link href={`timezone/${zoneslist[zone]}`}><a>{zoneslist[zone]}</a></Link></li>)
	}
	
	return (
		<>
			<NextSeo
				title={`${title} ${currentYear} - ${subtitle}`}
				description={metaDescription}
				keywords={metaKeywords}
			/>
			<Layout>
				<section>
					<h4>{ t('timezones:title') }</h4>
					
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