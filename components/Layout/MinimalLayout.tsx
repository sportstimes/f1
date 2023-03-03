import Head from "next/head";
import React from "react";
import TopBar from "../../components/TopBar/TopBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import withTranslation from 'next-translate/withTranslation'
import type { I18n } from 'next-translate'
import Logo from "../Logo/Logo";
import Link from "next/link";

interface Props {
	i18n: I18n;
	children: any;
}

class MinimalLayout extends React.Component<Props> {
	render() {
		const { t, lang } = this.props.i18n

		return (
			<>
				<noscript>
					<div className="noscript">{t("localization:javascript")}</div>
				</noscript>
	
	
				<div className="max-w-screen-sm mx-auto font-sans px-2">
				
					<div className="mx-auto mt-5 mb-5" style={{width: "60px"}} >
						<Link href="/">
							<Logo />
						</Link>
					</div>
				
					{this.props.children}
				</div>
				
			</>
		);
	};
};

export default withTranslation(MinimalLayout);
