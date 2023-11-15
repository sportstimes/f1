import React, {Component} from "react";
import withTranslation from "next-translate/withTranslation"
import type { I18n } from 'next-translate'
import i18nConfig from "../../i18n.js";
import Router from "next/router";
import Link from "next/link";
import LanguageSelector from "../../components/LanguageSelector/LanguageSelector";
import SiteSelector from "../../components/SiteSelector/SiteSelector";

interface Props {
	i18n: I18n;
}

class TopBar extends React.Component<Props> {
	render() {
		const {t, lang} = this.props.i18n;
		const title = t(`localization:` + process.env.NEXT_PUBLIC_SITE_KEY + `.title`);

		return (
			<>
				<div className="w-full bg-dark-green hidden md:block">
					<div className="max-w-screen-lg mx-auto py-4 px-2 md:flex md:items-center md:justify-between">
						<div className="flex justify-center md:order-2">
							<SiteSelector />
							<LanguageSelector />
						</div>
						<div className="mt-8 md:mt-0 md:order-1"></div>
					</div>
				</div>
			</>
		);
	}
}

export default withTranslation(TopBar);
