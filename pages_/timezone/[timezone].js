import {useState, useContext, useEffect} from 'react';
import UserContext from '../../components/UserContext';
import Layout from '../../components/Layout';
import Races from '../../components/Races';
import {NextSeo} from 'next-seo';
import useTranslation from "next-translate/useTranslation";
import RaceSchema from "../../components/RaceSchema";
import Link from "next/link";
import { useRouter } from 'next/router'

const moment = require('moment-timezone')

const Timezone = (props) => {
	const router = useRouter()

	const {t, lang} = useTranslation()
	const title = t('common:title')
	const subtitle = t('common:subtitle')

	const currentYear = '2020';
	const metaDescription = t('common:meta.description', {year: currentYear})
	const metaKeywords = t('common:meta.keywords', {year: currentYear})

	const timezone = props.timezone ? props.timezone.replace("-", "/") : "";

	return (
		<>
			<NextSeo
				title={`${title} ${props.year} - ${subtitle}`}
				description={metaDescription}
				keywords={metaKeywords}
			/>
			<Layout showCalendarExport='true' year={props.year} timezone={timezone}>
				<h3>{timezone}</h3>
				<p><Link href="/timezones"><a>{t('common:options.timezonePicker.pick')}</a></Link><br /><br /></p>

				{router.isFallback ?
					<>
						<div>Loading...</div>
						<noscript>
							<meta http-equiv="refresh" content="10" />
						</noscript>
					</>
					:
					<>

					<Races year={props.year} races={props.races} timezone={timezone}/>

					{props.races && props.races.map((item, index) => {
						if (item.sessions) {
						return (<RaceSchema item={item} key={item.name}/>)
						}
					})}
					</>
				}
			</Layout>
		</>
	);
}

export default Timezone;

export const getStaticPaths = async () => {
	return ({
		paths: [],
		fallback: true
	})
}

export const getStaticProps = async ({params}) => {
	const currentYear = '2020';

	try {
		const res = await fetch('/api/' + currentYear + '');
		const data = await res.json();

		return {
			props: {
				year: currentYear,
				races: data.races,
				timezone: params.timezone
			}
		}
	} catch (error) {
		console.error(error);
		return { props: {} };
	}
}