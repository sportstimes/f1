import Layout from '../components/Layout';
import Races from '../components/Races';
import { NextSeo } from 'next-seo';

const Index = (props) => {				
	return (
		<>
			<NextSeo
				title={`F1 Calendar ${props.year}  - Formula One Race Times and Dates`}
				description={`Formula One Calendar for ${props.year} season with all F1 grand prix races, practice &amp; qualifying sessions. Set reminders feature. All world timezones. Download or subscribe.`}
				keywords={`F1, formula one, race times, races, reminder, alerts, grands prix, grand prix, calendar, dates, start times, qualifying, practice, ${props.year}, London, Europe`}
				canonical="https://www.f1calendar.com/"
				twitter={{
					handle: '@f1cal',
					site: '@f1cal',
					cardType: 'summary_large_image',
				}}
			/>
		    <Layout showOptions='true' year={ props.year }>
				<Races year={ props.year } races={ props.races } />
		    </Layout>
	    </>
	);
};

Index.getInitialProps = async ({ query }) => {
	const data = await import(`../db/2019.json`)
	
	return {
	    year: "2020",
	    races: data.races
	}
}

export default Index;