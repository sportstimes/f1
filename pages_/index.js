import Layout from 'components/Layout/Layout';
import Races from 'components/Races/Races';
import { NextSeo } from 'next-seo';
import RaceSchema from 'components/RaceSchema/RaceSchema';
import useTranslation from 'next-translate/useTranslation'
import OptionsBar from "components/OptionsBar/OptionsBar";
import React from "react";

const Index = (props) => {
	const { t, lang } = useTranslation()
	const title = t('common:title')
	const subtitle = t('common:subtitle')

	const currentYear = props.year;
	const metaDescription = t('common:meta.description', { year: currentYear })
	const metaKeywords = t('common:meta.keywords', { year: currentYear })

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
	const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

	const data = await import(`../db/`+process.env.NEXT_PUBLIC_DB_FOLDER+`/`+currentYear+`.json`)

	return {
		year: currentYear,
		races: data.races
	}
}

export default Index;