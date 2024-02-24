import React, {Component} from "react";
import {useTranslations} from 'next-intl';
import i18nConfig from "../../i18n.js";
import Router from "next/router";
import Link from "next/link";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import SiteSelector from "../../components/SiteSelector/SiteSelector";

function TopBar() {
	return (
		<>
			<div className="w-full bg-dark-green hidden md:block">
				<div className="max-w-screen-lg mx-auto py-4 px-2 md:flex md:items-center md:justify-between">
					<div className="flex justify-center md:order-2 gap-2">
						<SiteSelector />
						<LanguageSelector />
					</div>
					<div className="mt-8 md:mt-0 md:order-1"></div>
				</div>
			</div>
		</>
	);
}

export default TopBar;
