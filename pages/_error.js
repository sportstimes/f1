import Layout from "../components/Layout/Layout";
import {NextSeo} from "next-seo";
import Card from "components/Card/Card";

function CustomError({statusCode}) {
	return (
		<>
			<Layout>
				<h3>Whoops - Error {statusCode}</h3>
				<Card id="download_option_ical" className="mb-6">
					<p>We bumped into a wall on the circuit...</p>
					<p>
						Help us into the pits, by letting us know on{" "}
						<a href="https://twitter.com/intent/tweet?text=%40f1cal%20I%20spotted%20an%20issue...">
							Twitter
						</a>
						.
					</p>
				</Card>
			</Layout>
		</>
	);
}

function getInitialProps({res, err}) {
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
	return {statusCode};
}

CustomError.getInitialProps = getInitialProps;

export default CustomError;
