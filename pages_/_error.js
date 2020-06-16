import Layout from "../components/Layout";
import { NextSeo } from 'next-seo';

function CustomError({ statusCode }) {
  return (
    <>
			<NextSeo
				title={`F1 Calendar  - Formula One Race Times and Dates`}
				description={`Formula One Calendar Archive with all F1 grand prix races, practice &amp; qualifying sessions. Set reminders feature. All world timezones. Download or subscribe.`}
				keywords={`F1, formula one, race times, races, reminder, alerts, grands prix, grand prix, calendar, dates, start times, qualifying, practice, London, Europe`}
				canonical="https://www.f1calendar.com/"
				twitter={{
					handle: '@f1cal',
					site: '@f1cal',
					cardType: 'summary_large_image',
				}}
			/>
			<Layout>
				
				<h3>Whoops - Error {statusCode}</h3>
				<section className="card">
					<p>We bumped into a wall on the circuit...</p>
					<p>Help us into the pits, by letting us know on <a href="https://twitter.com/intent/tweet?text=%40f1cal%20I%20spotted%20an%20issue...">Twitter</a>.</p>	
				</section>
				
				
				<style jsx>{`
					.card {
						background:#141414;
						-webkit-border-radius: 15px;
						-moz-border-radius: 15px;
						padding:25px 25px 10px 25px;
						margin-bottom:16px;
					}
					.card h4 {
						margin-top:0;
						font-size:18px;
						margin-bottom:8px;
					}
					.card p {
						margin-bottom:15px;
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

function getInitialProps({ res, err }) {
  let statusCode;
  // If the res variable is defined it means nextjs
  // is in server side
  if (res) {
    statusCode = res.statusCode;
  } else if (err) {
    // if there is any error in the app it should
    // return the status code from here
    statusCode = err.statusCode;
  } else {
    // Something really bad/weird happen and status code
    // cannot be determined.
    statusCode = null;
  }
  return { statusCode };
}

CustomError.getInitialProps = getInitialProps;

export default CustomError;