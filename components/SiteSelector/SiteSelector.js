import React, {Component} from "react";
import withTranslation from "next-translate/withTranslation";
import Router from "next/router";
import {usePlausible} from "next-plausible";

class SiteSelector extends React.Component {
	onChange = (event) => {
		const plausible = usePlausible();

		plausible("Changed Site", {
			props: {
				site: event.target.value
			}
		});
		
		Router.push(event.target.value, event.target.value);
	};

	render() {
		const {t, lang} = this.props.i18n;
		
		const sitesConfig = require(`../../_db/sites.json`);
		const sites = sitesConfig.sites;
		
		const config = require(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);


		// Picker Items
		const siteItems = [];
		
		sitesConfig.sites.forEach(function (site, index) {
			siteItems.push(
				<option value={site['url']} key={site['siteKey']}>
					{site['name']}
				</option>
			);
		});

		return (
			<div>
				<label htmlFor="languageSelector" className="sr-only">
					{t("common:languageSelector")}
				</label>
				<select
					id="siteSelector"
					name="site"
					onChange={this.onChange}
					value={config.siteKey}
					className="mx-1 text-gray-900 pl-3 pr-10 py-0 text-base
					border-gray-300 focus:outline-none focus:ring-indigo-500
					focus:border-indigo-500 sm:text-sm rounded-md"
				>
					{siteItems}
				</select>
			</div>
		);
	}
}

export default withTranslation(SiteSelector);
