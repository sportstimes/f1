import Head from "next/head";
import React from "react";
import TopBar from "../../components/TopBar/TopBar";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import withTranslation from 'next-translate/withTranslation'
import type { I18n } from 'next-translate'

interface Props {
	i18n: I18n;
	showCTABar: boolean;
	children: any;
	year: number;
}

class Layout extends React.Component<Props> {
	render() {
		const { t, lang } = this.props.i18n
	
		return (
			<>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1, maximum-scale=5"
					/>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicon-16x16.png"
					/>
					<link rel="manifest" href="/site.webmanifest" />
					<link
						rel="mask-icon"
						href="/safari-pinned-tab.svg"
						color="#eb000f"
					/>
					
					<meta name="msapplication-TileColor" content="#000000" />
					<meta name="theme-color" content="#03120f" />
	
					{process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION && (
						<meta
							name="google-site-verification"
							content={process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION}
						/>
					)}
				</Head>
	
				<noscript>
					<div className="noscript">{t("localization:javascript")}</div>
				</noscript>
	
				<TopBar />
	
				<Header showCTABar={this.props.showCTABar} year={this.props.year} />
	
				<div className="max-w-screen-lg mx-auto font-sans px-2">
					{this.props.children}
				</div>
	
				<Footer />
			</>
		);
	};
};

export default withTranslation(Layout);
