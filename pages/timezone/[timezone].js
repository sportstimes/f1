import { useState, useContext, useEffect } from 'react';
import UserContext from '../../components/UserContext';
import Layout from '../../components/Layout';
import Races from '../../components/Races';
import { NextSeo } from 'next-seo';

const Timezone = (props) => {
	
	const { setTimezone } = useContext(UserContext)

	useEffect(() => {
		if(props.timezone){
			const queryTimezone = props.timezone.replace("-", "/");	
			setTimezone(queryTimezone);
		}
	}, [true]);
	

	const currentYear = '2019';
				
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
		    <Layout showOptions='true' year={ currentYear }>
				<Races year={ currentYear } />
		    </Layout>
	    </>
	);
};

Timezone.getInitialProps = ({ query }) => {
	console.log(query);
	
	return {
	    timezone: query.timezone
	}
}

export default Timezone;