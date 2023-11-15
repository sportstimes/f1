import React, {Component} from "react";
import Logo from "../Logo/Logo";
import withTranslation from "next-translate/withTranslation";
import i18nConfig from "../../i18n.js";
import Router from "next/router";
import CTABar from "../CTABar/CTABar";
import Link from "next/link";
import {usePlausible} from "next-plausible";
import type { I18n } from 'next-translate'
import Image from 'next/image'

interface Props {
	i18n: I18n;
	year: number;
	showCTABar: boolean;
}

class Header extends React.Component<Props> {
	
	render() {
		const {t, lang} = this.props.i18n;
		const title = t(`localization:` + process.env.NEXT_PUBLIC_SITE_KEY + `.title`);
		const subtitle = t(`localization:` + process.env.NEXT_PUBLIC_SITE_KEY + `.subtitle`);
	
		const {languageNames} = i18nConfig;
		
		const languageName = languageNames[lang]
	
		return (
			<div className="w-full bg-dark-green mb-4">
				<header className="max-w-screen-lg mx-auto font-sans px-2 py-4">
					
					<div className="flex md:justify-between">
						<div className="flex flex-col md:flex-row justify-center items-center md:justify-between w-screen md:w-auto mb-4">
							<Link href="/" className="" style={{width: "60px"}} title={title}>
								<Logo style={{width: "60px"}}  />
							</Link>	
							
							<div className="text-center md:text-left uppercase mt-4 md:mt-0 md:ml-4">
								<h1 className="mb-1 text-lg tracking-wider">
									<Link href="/" title={title} className="text-white hover:text-white font-bold text-xl"
										>
										{title}&nbsp;
										{this.props.year && (
											<span>{this.props.year}</span>
										)}
										{lang != "en" && (
											<span> | {languageName}</span>
										)}
									</Link>
								</h1>
								<h2 className="text-sm font-normal tracking-wider">
									<Link href="/" title={title} className="text-light-green hover:text-light-green">
										{subtitle}
									</Link>
								</h2>
							</div>
						</div>
						
						<div className="hidden md:inline-block">
							<a
								href="https://www.buymeacoffee.com/f1cal"
								className="support-btn mt-3"
								onClick={() => {
									const plausible = usePlausible();
									
									plausible("Support", {
										props: {
											buttonId: "header"
										}
									})
								}}
							>
								<Image
									src="https://cdn.buymeacoffee.com/buttons/bmc-new-btn-logo.svg"
									width="15"
									height="15"
									className="mr-2"
									alt="buymeacoffee"
								/>
								{t("localization:footer.coffee")}
							</a>
						</div>	
						
					</div>
					
					{this.props.showCTABar && <CTABar />}
				</header>
			</div>
		);
	}
}

export default withTranslation(Header);
