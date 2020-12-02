import React, {Component} from "react";
import Logo from "../Logo/Logo";
import withTranslation from "next-translate/withTranslation";
import i18nConfig from "../../i18n.json";
import Router from "next/router";
import CTABar from "../CTABar/CTABar";
import Link from "next/link";

class Header extends React.Component {
	render() {
		const {t, lang} = this.props.i18n;
		const title = t(process.env.NEXT_PUBLIC_SITE_KEY + `:title`);

		const {languageNames} = i18nConfig;

		return (
			<div className="w-full bg-dark-green mb-4">
				<header className="max-w-screen-lg mx-auto font-sans px-4 md:px-6 py-4">
					<div className="md:flex md:justify-start mb-4">
						<div className="w-10 m-auto md:m-0 md:w-auto mb-4 md:mb-0">
							<Link href="/">
								<a name={title}>
									<Logo />
								</a>
							</Link>
						</div>
						<div className="mt-1 md:ml-4 text-center md:text-left font-title uppercase">
							<h1 className="mb-1 text-lg tracking-wider">
								<Link href="/">
									<a
										name={title}
										className="hover:text-white font-bold text-lg"
									>
										{title}&nbsp;
										{this.props.year && (
											<span>{this.props.year}</span>
										)}
										{lang != "en" && (
											<span> | {languageNames[lang]}</span>
										)}
									</a>
								</Link>
							</h1>
							<h2 className="text-xs font-normal tracking-wider">
								<Link href="/">
									<a
										name={title}
										className="text-light-green hover:text-light-green"
									>
										{t("common:subtitle")}
									</a>
								</Link>
							</h2>
						</div>
					</div>
					<div className="clear-both"></div>

					{this.props.showCTABar && <CTABar />}
				</header>
			</div>
		);
	}
}

export default withTranslation(Header);
