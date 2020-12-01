import FullWidthLayout from "components/Layout/FullWidthLayout";
import Races from "components/Races/Races";
import {NextSeo} from "next-seo";
import RaceSchema from "components/RaceSchema/RaceSchema";
import useTranslation from "next-translate/useTranslation";
import OptionsBar from "components/OptionsBar/OptionsBar";
import React from "react";

const Index = (props) => {
	const {t, lang} = useTranslation();
	const title = t("common:title");
	const subtitle = t("common:subtitle");

	const currentYear = props.year;
	const metaDescription = t("common:meta.description", {year: currentYear});
	const metaKeywords = t("common:meta.keywords", {year: currentYear});

	return (
		<>
			<NextSeo
				title={`${title} ${props.year} - ${subtitle}`}
				description={metaDescription}
				keywords={metaKeywords}
			/>
			<FullWidthLayout showCTABar="true" year={props.year}>
				<div className="max-w-screen-lg mx-auto font-sans">
					<div className="px-4 md:px-6">
						<OptionsBar />
					</div>

					<div className="px-0 md:px-6">
						<Races year={props.year} races={props.races} />
					</div>

					{props.races &&
						props.races.map((item, index) => {
							if (item.sessions) {
								return <RaceSchema item={item} key={item.name} />;
							}
						})}
				</div>
			</FullWidthLayout>
		</>
	);
};

Index.getInitialProps = async ({query: {timezone}, res}) => {
	const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

	const data = await import(
		`../db/` + process.env.NEXT_PUBLIC_SITE_KEY + `/` + currentYear + `.json`
	);

	return {
		year: currentYear,
		races: data.races
	};
};

export default Index;
