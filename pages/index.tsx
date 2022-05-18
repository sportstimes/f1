import React from "react";
import FullWidthLayout from "../components/Layout/FullWidthLayout";
import Races from "../components/Races/Races";
import Notice from "../components/Notice/Notice";
import {NextSeo} from "next-seo";
import useTranslation from "next-translate/useTranslation";
import OptionsBar from "../components/OptionsBar/OptionsBar";
import Link from "next/link";
import RaceSchemas from '../components/RaceSchemas/RaceSchemas';

const year = require(`../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/${process.env.NEXT_PUBLIC_CURRENT_YEAR}.json`);

const Index = (props) => {
	const {t, lang} = useTranslation();
	const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
	const config = require(`../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

	return (
		<FullWidthLayout showCTABar={true} year={Number(currentYear)}>
			<div className="max-w-screen-lg mx-auto font-sans">
				<OptionsBar i18n={t} pickerShowing={false} />
				<Notice />
				<Races year={currentYear} races={year.races} />
				<RaceSchemas races={year.races} />
			</div>
		</FullWidthLayout>
	);
};

export async function getStaticProps() {
	return {
		revalidate: 3600
	}
}

export default Index;
