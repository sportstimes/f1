"use client"

import React, {Component} from "react";
import {useTranslations} from 'next-intl';
import { useRouter, useParams} from 'next/navigation'
import {usePlausible} from "next-plausible";

interface SiteConfig {
	name: string;
	siteKey: string;
	url: string;
	calenderCDN: string;
	supportsEmailReminders: boolean;
	supportsWebPush: boolean;
}

const SiteSelector: FunctionComponent = ({}) => {
	const plausible = usePlausible();
	const router = useRouter()
	const t = useTranslations('All');

	const sitesConfig = require(`/_db/sites.json`);
	const sites = sitesConfig.sites;
	
	const config = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
	
	// Picker Items
	const siteItems: React.ReactElement[] = [];
	let currentValue = "";
	
	sitesConfig.sites.forEach(function (site: SiteConfig, index: number) {
		if(site.siteKey == config.siteKey){
			currentValue = site.url;
		}
		
		siteItems.push(
			<option value={site.url} key={site.siteKey}>
				{site.name}
			</option>
		);
	});

	const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		plausible("Changed Site", {
			props: {
				site: event.target.value
			}
		});
		
		router.push(event.target.value, event.target.value);
	};

		

	return (
		<div>
			<label htmlFor="site" className="sr-only">
				Select Site
			</label>
			<select
				aria-label="Motorsport"
				name="site"
				onChange={onChange}
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

export default SiteSelector;
