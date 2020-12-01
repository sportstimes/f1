import React, {Component} from "react";
import withTranslation from "next-translate/withTranslation";
import i18nConfig from "../../i18n.json";
import Router from "next-translate/Router";
import Link from "next-translate/Link";

class TopBar extends React.Component {
	onChange = (event) => {
		if (event.target.value === "add") {
			document.location.href =
				"https://github.com/sportstimes/f1/tree/master/locales";
			return;
		}

		let adjustedURL = Router.pathname;

		if (
			this.props != null &&
			this.props.i18n != null &&
			this.props.i18n.lang != null
		) {
			adjustedURL = adjustedURL.replace("/" + this.props.i18n.lang, "");
		}

		if (adjustedURL == "") {
			adjustedURL = "/";
		}

		if (adjustedURL.includes("[timezone]")) {
			adjustedURL = "/timezones/";
		}

		Router.pushI18n({url: adjustedURL, options: {lang: event.target.value}});
	};

	render() {
		const {t, lang} = this.props.i18n;
		const title = t(process.env.NEXT_PUBLIC_LOCALE_PREFIX + `:title`);

		const {languageNames} = i18nConfig;

		// Picker Items
		const languageItems = [];

		for (const language in languageNames) {
			languageItems.push(
				<option value={language} key={language}>
					{languageNames[language]}
				</option>
			);
		}

		languageItems.push(
			<option value="add" key="Add">
				{t("common:contribute")} +
			</option>
		);

		return (
			<>
				<div className="w-full bg-dark-green hidden md:block">
					<div className="max-w-screen-lg mx-auto py-4 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-6">
						<div className="flex justify-center space-x-6 md:order-2">
							<div>
								<a
									href="https://twitter.com/f1cal"
									className="text-white hover:text-gray-500"
								>
									<span className="sr-only">Twitter</span>
									<svg
										className="h-6 w-6"
										fill="currentColor"
										viewBox="0 0 24 24"
										aria-hidden="true"
									>
										<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
									</svg>
								</a>
							</div>
							<div>
								<label htmlFor="languageSelector" className="sr-only">
									{t("common:languageSelector")}
								</label>
								<select
									id="languageSelector"
									name="language"
									value={lang}
									onChange={this.onChange}
									value={lang}
									className="mx-2 text-gray-900 pl-3 pr-10 py-0 text-base
									border-gray-300 focus:outline-none focus:ring-indigo-500
									focus:border-indigo-500 sm:text-sm rounded-md"
								>
									{languageItems}
								</select>
							</div>
						</div>
						<div className="mt-8 md:mt-0 md:order-1">Motor</div>
					</div>
				</div>
			</>
		);
	}
}

/*
<ul className="grid grid-flow-col gap-3">
<li>Motorsport Calendars</li>
<li>F1</li>
<li>F2</li>
<li>F3</li>
<li>FE</li>
<li>W Series</li>
</ul>
*/

export default withTranslation(TopBar);
