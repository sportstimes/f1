import Router from 'next/router'
import Layout from '../components/Layout';
import VirtualRaces from '../components/VirtualRaces';
import Races from '../components/Races';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import RaceSchema from '../components/RaceSchema';

const Index = (props) => {				
	return (
		<>
			<NextSeo
				title={`F1 Calendar ${props.year} - Formula One Race Times and Dates`}
				description={`Formula One Calendar for ${props.year} season with all F1 grand prix races, practice &amp; qualifying sessions. Set reminders feature. All world timezones. Download or subscribe.`}
				keywords={`F1, formula one, race times, races, reminder, alerts, grands prix, grand prix, calendar, dates, start times, qualifying, practice, ${props.year}, London, Europe`}
				canonical="https://www.f1calendar.com/"
				twitter={{
					handle: '@f1cal',
					site: '@f1cal',
					cardType: 'summary_large_image',
				}}
				openGraph={{
					url: "https://www.f1calendar.com/",
					title: "F1 Calendar 2020 - Formula One Race Times and Dates",
					description: "Formula One Calendar for 2020 season with all F1 grand prix races, practice &amp; qualifying sessions. Set reminders feature. All world timezones. Download or subscribe.",
					site_name: "F1 Calendar 2020",
					images: [
	          {
	            url: 'https://www.f1calendar.com/share.png',
	            width: 1200,
	            height: 628,
	            alt: 'F1 Calendar 2020',
	          },
	        ]
				}}
			/>
	    <Layout showOptions='true' showCalendarExport='true' year={ props.year }>
        <VirtualRaces year={ props.year } races={ props.virtual } />
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

/*
  <section className="previous-years">
					<p>
						<Link href="years"><a>Looking for previous years?</a></Link>
					</p>
				</section>
				
				<style jsx>{`
					.previous-years {
						margin: 60px 0;	
						text-align:center;
					}
					.previous-years a {
						background: #1a8b73;
						margin-bottom: 25px;
						-webkit-border-radius: 4px;
						-moz-border-radius: 4px;
						padding: 12px;
						font-size:15px;
						border:0;
						color:#fff;
						cursor: pointer;
						margin: 0 auto;
					}
			    `}</style>
			    */

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