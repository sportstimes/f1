import Layout from '../components/Layout';
import Races from '../components/Races';
import { NextSeo } from 'next-seo';
import RaceSchema from '../components/RaceSchema';
import useTranslation from 'next-translate/useTranslation'

const Index = (props) => {				
  const { t, lang } = useTranslation()
  const title = t('common:title')
  const subtitle = t('common:subtitle')
  
  const currentYear = '2020';
  const metaDescription = t('common:meta.description', { year: currentYear })
  const metaKeywords = t('common:meta.keywords', { year: currentYear })
  
	return (
		<>
			<NextSeo
				title={`${title} ${props.year} - ${subtitle}`}
				description={metaDescription}
				keywords={metaKeywords}
			/>
	    <Layout showOptions='true' showCalendarExport='true' year={ props.year }>
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
	
	// Handle cases where we're not able to automatically switch dates/times (noscript)
	if(timezone){
		res.writeHead(302, {
			Location: '/timezone/'+timezone.replace("/", "-")
		})
		res.end()
		return;
	}
	
	return {
	    year: currentYear,
	    races: data.races,
	    virtual: data.virtual
	}
}

export default Index;