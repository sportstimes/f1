import FullWidthLayout from "components/Layout/FullWidthLayout";
import Races from "components/Races/Races";
import {NextSeo} from "next-seo";
import useTranslation from "next-translate/useTranslation";
import OptionsBar from "components/OptionsBar/OptionsBar";

const Year = (props) => {
	const {t} = useTranslation();
	
	const title = t(`${process.env.NEXT_PUBLIC_SITE_KEY}:seo.title`, {
		year: props.year
	});
	const description = t(`${process.env.NEXT_PUBLIC_SITE_KEY}:seo.description`, {
		year: props.year
	});
	const keywords = t(`${process.env.NEXT_PUBLIC_SITE_KEY}:seo.keywords`, {
		year: props.year
	});
	
	if (!props.races)
		return (
			<>
				<NextSeo
					title={title}
					description={description}
					keywords={keywords}
				/>
				<Layout year={props.year}>
					<section>
						<h3>Oops, unfortunately we dont go back that far yet.</h3>
						<p>
							Want to add more historical dates to F1 Calendar?
							Contribute previous seasons via our{" "}
							<a href="https://github.com/sportstimes/f1">
								GitHub repository
							</a>
							.
						</p>
					</section>
					<style jsx>{`
						section {
							margin: 30px 0;
							text-align: center;
						}
					`}</style>
				</Layout>
			</>
		);

	return (
		<>
			<NextSeo
				title={title}
				description={description}
				keywords={keywords}
			/>
			<FullWidthLayout showOptions="true" year={props.year}>
				<div className="max-w-screen-lg mx-auto font-sans">
					<div className="px-2">
						<OptionsBar />
					</div>

					<div className="px-0 md:px-2">
						<Races year={props.year} races={props.races} />
					</div>
				</div>
			</FullWidthLayout>
		</>
	);
};

export default Year;

export const getStaticPaths = async () => {
	// TODO: Make this dynamic later
	return {
		paths: [
			{params: {year: "2021"}},
			{params: {year: "2020"}},
			{params: {year: "2019"}},
			{params: {year: "2018"}}
		],
		fallback: false
	};
};

export const getStaticProps = async ({params}) => {
	const year = params.year;

	const data = await import(
		`_db/` + process.env.NEXT_PUBLIC_SITE_KEY + `/` + year + `.json`
	);

	return {
		props: {
			year: params.year,
			races: data.races
		}
	};
};
