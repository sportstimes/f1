import React, { FunctionComponent } from "react";
import useTranslation from 'next-translate/useTranslation'
import i18nConfig from "../../i18n.json";
import Router from "next/router";
import {usePlausible} from "next-plausible";

const LanguageSelector: FunctionComponent = ({}) => {
	const {t, lang} = useTranslation();
	const plausible = usePlausible();

	const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		if (event.target.value === "add") {
			document.location.href =
				"https://poeditor.com/join/project?hash=JrDs3Vfc92";
			return;
		}
		
		let adjustedURL = Router.pathname.replace("/" + lang, "");
		
		if (adjustedURL == "") {
			adjustedURL = "/";
		}

		if (adjustedURL.includes("[timezone]")) {
			adjustedURL = "/timezones/";
		}
		
		plausible("Changed Language", {
			props: {
				language: event.target.value
			}
		});
		
		Router.push(adjustedURL, adjustedURL, {locale: event.target.value});
	};

	const title = t(`localization:` + process.env.NEXT_PUBLIC_SITE_KEY + `.title`);

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
			{t("localization:contribute")} +
		</option>
	);

	return (
		<div>
			<label htmlFor="languageSelector" className="sr-only">
				{t("localization:languageSelector")}
			</label>
			<select
				name="language"
				onChange={onChange}
				value={lang}
				className="mx-2 text-gray-900 pl-3 pr-10 py-0 text-base
				border-gray-300 focus:outline-none focus:ring-indigo-500
				focus:border-indigo-500 sm:text-sm rounded-md"
			>
				{languageItems}
			</select>
		</div>
	);
}

export default LanguageSelector;
