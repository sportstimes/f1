import Router from 'next/router'
import Layout from '../components/Layout';
import Races from '../components/Races';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import RaceSchema from '../components/RaceSchema';
import useTranslation from 'next-translate/useTranslation'

const Index = (props) => {				
  const { t, lang } = useTranslation()
  const title = t('common:title')
  const subtitle = t('common:subtitle')
  
	return (
		<>
			<NextSeo
				title={`${title} ${props.year} - ${subtitle}`}
				description={`Formula One Calendar for ${props.year} season with all F1 grand prix races, practice &amp; qualifying sessions. Set reminders feature. All world timezones. Download or subscribe.`}
				keywords={`F1, formula one, race times, races, reminder, alerts, grands prix, grand prix, calendar, dates, start times, qualifying, practice, ${props.year}, London, Europe`}
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
	const data = await import(`../db/2020.json`)
	
	// Handle cases where we're not able to automatically switch dates/times (noscript)
	if(timezone){
		res.writeHead(302, {
			Location: '/timezone/'+timezone.replace("/", "-")
		})
		res.end()
		return;
	}
	
	return {
	    year: "2020",
	    races: data.races,
	    virtual: data.virtual
	}
}

export default Index;