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
		let currentValue = "";
		
		sitesConfig.sites.forEach(function (site, index) {
			if(site['siteKey'] == config.siteKey){
				currentValue = site['url'];
			}
			
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
					value={currentValue}
					className="text-gray-900 pl-2 pr-8 py-0 text-base
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
