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
		const title = t(`localization:` + process.env.NEXT_PUBLIC_SITE_KEY + `.title`);

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
					
					<meta name="msapplication-TileColor" content="#03120f" />
					<meta name="theme-color" content="#03120f" />
					
					<meta name="apple-mobile-web-app-capable" content="yes" />
					<meta name="apple-mobile-web-app-status-bar-style" content="default" />
					<meta name="apple-mobile-web-app-title" content={title} />
					<meta name="format-detection" content="telephone=no" />
					<meta name="mobile-web-app-capable" content="yes" />
				</Head>
	
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
