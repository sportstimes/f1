import React, {Component} from "react";
import useTranslation from 'next-translate/useTranslation'
import type { I18n } from 'next-translate'
import Router, { useRouter } from "next/router";
import {usePlausible} from "next-plausible";

interface Props {
	i18n: I18n;
}

interface SiteConfig {
	availableYears: [number];
	calendarOutputYear: number;
}

const YearSelector: FunctionComponent = ({}) => {
	const {t, lang} = useTranslation();
	const plausible = usePlausible();
	const router = useRouter()

	const config = require(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
	
	// If we only have 1 year then don't show the year selector
	if(config.availableYears.length < 2){
		return (<></>);
	}
	
	// Picker Items
	const yearItems: React.ReactElement[] = [];
	let currentValue = router.query.year ?? process.env.NEXT_PUBLIC_CURRENT_YEAR;
		
	config.availableYears.forEach(function (year: number, index: number) {
		yearItems.push(
			<option value={year} key={year}>
				{year}
			</option>
		);
	});

	const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		
		plausible("Changed Year", {
			props: {
				year: event.target.value
			}
		});
		
		if(event.target.value == process.env.NEXT_PUBLIC_CURRENT_YEAR){
			Router.push('/');
		} else {
			Router.push(`/year/${event.target.value}`);
		}
	};

	return (
		<div>
			<label htmlFor="year" className="sr-only">
				{t("localization:yearSelector")}
			</label>
			<select
				name="year"
				onChange={onChange}
				value={currentValue}
				className="text-gray-900 pl-2 pr-8 py-0 text-base
				border-gray-300 focus:outline-none focus:ring-indigo-500
				focus:border-indigo-500 sm:text-sm rounded-md"
			>
				{yearItems}
			</select>
		</div>
	);
}

export default YearSelector;
