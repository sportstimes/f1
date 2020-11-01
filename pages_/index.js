import Layout from '../components/Layout';
import Races from '../components/Races';
import { NextSeo } from 'next-seo';
import RaceSchema from '../components/RaceSchema';
import useTranslation from 'next-translate/useTranslation'
import OptionsBar from "../components/OptionsBar";
import React from "react";

const Index = (props) => {
	const { t, lang } = useTranslation()
	const title = t('common:title')
	const subtitle = t('common:subtitle')

	const metaDescription = t('common:meta.description', { year: props.year })
	const metaKeywords = t('common:meta.keywords', { year: props.year })

	return (
		<>
			<NextSeo
				title={`${title} ${props.year} - ${subtitle}`}
				description={metaDescription}
				keywords={metaKeywords}
			/>
			<Layout showCTABar='true' year={ props.year }>
				<OptionsBar />
				<Races year={ props.year } races={ props.races } />
				{props.races && props.races.map((item, index) => {
					if(item.sessions){
						return (<RaceSchema item={item} key={item.name} />)
					}
				})}
			</Layout>
		</>
	);
}

Index.getInitialProps = async ({query: {timezone}, res}) => {
	const currentYear = '2020';

	const data = await import(`../db/`+currentYear+`.json`)

	return {
		year: currentYear,
		races: data.races,
		virtual: data.virtual
	}
}

export default Index;