import NextApp from 'next/app'
import type { AppProps } from 'next/app'
import {UserContextProvider} from "../components/UserContextProvider";
import {DefaultSeo} from "next-seo";
import "../styles/tailwind.css";
import "../styles/tailwind-utils.css";
import "../styles/index.css";
import withTranslation from 'next-translate/withTranslation'
import PlausibleProvider from "next-plausible";
import type { I18n } from 'next-translate'

interface Props {
	i18n: I18n;
}

class CalendarApp extends NextApp<Props, AppProps> {
	render() {
		const { Component, pageProps } = this.props
		
		const {t} = this.props.i18n
		
		const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
		
		const title = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.title`);
		const description = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, { year: currentYear })
		const keywords = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.keywords`, { year: currentYear })
		
		const config = require(`../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)
		
		return (
			<UserContextProvider>
				<PlausibleProvider domain={process.env.NEXT_PUBLIC_PLAUSIBLE_KEY}>
					<DefaultSeo
						title={title}
						description={description}
						canonical={`https://www.${config.url}/`}
						twitter={{
							handle: "@f1cal",
							site: "@f1cal",
							cardType: "summary_large_image"
						}}
						openGraph={{
							url: `https://www.${config.url}/`,
							title: `${title}`,
							description: `${description}`,
							site_name: `${title}`,
							images: [
								{
									url: `https://www.${config.url}/share.png`,
									width: 1200,
									height: 628,
									alt: `${title}`
								}
							]
						}}
					/>
					<Component {...pageProps} />
				</PlausibleProvider>
			</UserContextProvider>
		);
	}
}

export default withTranslation(CalendarApp);
