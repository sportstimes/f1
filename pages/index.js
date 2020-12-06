import React from "react";
import FullWidthLayout from "components/Layout/FullWidthLayout";
import Races from "components/Races/Races";
import {NextSeo} from "next-seo";
import RaceSchema from "components/RaceSchema/RaceSchema";
import useTranslation from "next-translate/useTranslation";
import OptionsBar from "components/OptionsBar/OptionsBar";
const year = require(`../db/${process.env.NEXT_PUBLIC_SITE_KEY}/${process.env.NEXT_PUBLIC_CURRENT_YEAR}.json`);

const Index = (props) => {
	const {t, lang} = useTranslation();
	const title = t(`${process.env.NEXT_PUBLIC_SITE_KEY}:title`);
	const subtitle = t("common:subtitle");

	const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
	const metaDescription = t("common:meta.description", {year: currentYear});
	const metaKeywords = t("common:meta.keywords", {year: currentYear});

	return (
		<>
			<NextSeo
				title={`${title} ${currentYear} - ${subtitle}`}
				description={metaDescription}
				keywords={metaKeywords}
			/>
			<FullWidthLayout showCTABar="true" year={currentYear}>
				<div className="max-w-screen-lg mx-auto font-sans">
					<div className="px-2">
						<OptionsBar />
					</div>

					<div className="px-0 md:px-2">
						<Races year={currentYear} races={year.races} />
					</div>

					{year.races &&
						year.races.map((item, index) => {
							if (item.sessions) {
								return <RaceSchema item={item} key={item.name} />;
							}
						})}
				</div>
			</FullWidthLayout>
		</>
	);
};

export default Index;
