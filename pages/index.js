import React from "react";
import FullWidthLayout from "components/Layout/FullWidthLayout";
import Races from "components/Races/Races";
import Notice from "components/Notice/Notice";
import {NextSeo} from "next-seo";
import RaceSchema from "components/RaceSchema/RaceSchema";
import useTranslation from "next-translate/useTranslation";
import OptionsBar from "components/OptionsBar/OptionsBar";
const year = require(`../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/${process.env.NEXT_PUBLIC_CURRENT_YEAR}.json`);
import Link from "next/link";

const Index = (props) => {
	const {t, lang} = useTranslation();

	const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

	const title = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {
		year: currentYear
	});
	const description = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, {
		year: currentYear
	});
	const keywords = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.keywords`, {
		year: currentYear
	});
	
	const config = require(`../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

	return (
		<>
			<NextSeo title={title} description={description} keywords={keywords} />
			<FullWidthLayout showCTABar="true" year={currentYear}>
				<div className="max-w-screen-lg mx-auto font-sans">
					<div className="px-2">
						<OptionsBar />
					</div>

					{ config.notice != null &&
						<Notice />
					}
					
					{config.siteKey == "f1" &&
						<div className="px-2">
							<div className="bg-yellow-200 rounded-md shadow mb-4 text-black font-bold">
								<Link href="/year/2022"><a className="block py-4 px-4">Check out the provisional 2022 calendar here.</a></Link>
							</div>
						</div>
					}
					

					<div className="px-0 md:px-2">
						<Races year={currentYear} races={year.races} />
					</div>

					{year.races && config.siteKey == "f1" &&
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

export async function getStaticProps() {
	return {
		revalidate: 3600
	}
}

export default Index;
