import FullWidthLayout from "../../components/layout/FullWidthLayout";
import Races from "../../components/Races/Races";
import { NextSeo } from "next-seo";
import OptionsBar from "../../components/OptionsBar/OptionsBar"; // Ensure this component is correctly imported

const gtworldYear = ({ year, races }) => {
	return (
		<FullWidthLayout>
			<NextSeo title={`IMSA ${year} Schedule`} />
			<div className="max-w-screen-lg mx-auto font-sans"> {/* Container with max-width and center alignment */}
				<div className="px-2"> {/* Padding */}
					<OptionsBar /> {/* OptionsBar component for consistency */}
				</div>

				<div className="px-0 md:px-2"> {/* Responsive padding */}
					<h1>gtworld {year} Schedule</h1>
					<Races races={races} />
				</div>
			</div>
		</FullWidthLayout>
	);
};

export async function getStaticPaths() {
	const years = [2022, 2023, 2024]; // WEC available years
	const paths = years.map((year) => ({ params: { year: year.toString() } }));
	return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
	const year = params.year;
	const data = await import(`../../_db/gtworld/${year}.json`);
	return {
		props: {
			year,
			races: data.races,
		},
	};
};

export default gtworldYear;
