"use client"

import React, { FunctionComponent } from "react";
import i18nConfig from "../../i18nConfig.js";
import {useLocale, useTranslations} from 'next-intl';
import { useRouter, useParams} from 'next/navigation'
import {usePlausible} from "next-plausible";

const LanguageSelector: FunctionComponent = ({}) => {
	
	const t = useTranslations('All');
	const locale = useLocale();
	const router = useRouter()
	
	const plausible = usePlausible();

	const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
	
		if (event.target.value === "add") {
			document.location.href =
				"https://poeditor.com/join/project?hash=JrDs3Vfc92";
			return;
		}
		
		router.push(`/${event.target.value}`);
		
		plausible("Changed Language", {
			props: {
				language: event.target.value
			}
		});
	};

	const title = t(`${process.env.NEXT_PUBLIC_SITE_KEY}.title`);

	const {languageNames} = i18nConfig;
	

	// Picker Items
	const languageItems : React.ReactElement[] = [];
	Object.keys(languageNames).forEach(language => {
		languageItems.push(
			<option value={language} key={language}>
				{languageNames[language as keyof String]}
			</option>
		);
	});

	languageItems.push(
		<option value="add" key="Add">
			{t("contribute")} +
		</option>
	);

	return (
		<div>
			<label htmlFor="language" className="sr-only">
				{t("languageSelector")}
			</label>
			<select
				name="language"
				onChange={onChange}
				value={locale}
				className="text-gray-900 pl-3 pr-10 py-0 text-base
				border-gray-300 focus:outline-none focus:ring-indigo-500
				focus:border-indigo-500 sm:text-sm rounded-md"
			>
				{languageItems}
			</select>
		</div>
	);
}

export default LanguageSelector;
