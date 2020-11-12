import Layout from '../../components/Layout';
import Races from '../../components/Races';
import { NextSeo } from 'next-seo';

const Year = (props) => {
	
	if (!props.races) return (
		<>
			<NextSeo
				title={`F1 Calendar  - Formula One Race Times and Dates`}
				description={`Formula One Calendar for ${props.year} season with all F1 grand prix races, practice &amp; qualifying sessions. Set reminders feature. All world timezones. Download or subscribe.`}
				keywords={`F1, formula one, race times, races, reminder, alerts, grands prix, grand prix, calendar, dates, start times, qualifying, practice, ${props.year}, London, Europe`}
				canonical="https://www.f1calendar.com/"
				twitter={{
					handle: '@f1cal',
					site: '@f1cal',
					cardType: 'summary_large_image',
				}}
			/>
		    <Layout year={ props.year }>
			    <section>
				    <h3>Oops, unfortunately we dont go back that far yet.</h3>
				    <p>Want to add more historical dates to F1 Calendar? Contribute previous seasons via our <a href="https://github.com/sportstimes/f1">GitHub repository</a>.</p>
			    </section>
			    <style jsx>{`
				section {
					margin: 30px 0;
					text-align:center;
				}
				`}</style>
		    </Layout>
	    </>
	)
	
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

export default Year;

export const getStaticPaths = async () => {
	// TODO: Make this dynamic later
	return ({
		paths: [
			{ params: { year: '2021' } },
			{ params: { year: '2020' } },
			{ params: { year: '2019' } },
			{ params: { year: '2018' } }
		],
		fallback: false,
	})
}

export const getStaticProps = async ({ params }) => {
	const data = await import(`../../db/${params.year}.json`)

	return {
		props: {
			year: params.year,
			races: data.races
		}
	}
};