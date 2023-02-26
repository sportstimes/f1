import { useEffect } from "react";
import { AppProps } from 'next/app'
import {UserContextProvider} from "../components/UserContext";
import {DefaultSeo} from "next-seo";
import "../styles/tailwind.css";
import "../styles/tailwind-utils.css";
import "../styles/index.css";
import useTranslation from 'next-translate/useTranslation'
import PlausibleProvider from "next-plausible";
import Script from 'next/script'
import { firebaseCloudMessaging } from "../config/firebase";
import firebase from 'firebase/app';
import { getMessaging, onMessage } from "firebase/messaging";

export default function CalendarApp({ Component, pageProps }: AppProps) {
	const { t, lang } = useTranslation();
	
	const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
	
	const title = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, { year: currentYear });
	const description = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, { year: currentYear })
	const keywords = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.keywords`, { year: currentYear })

	const config = require(`../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)
	
	useEffect(() => {
		if ('Notification' in window) {
			const status = Notification.permission;
			if(status === 'granted') {
				setToken();
			}
			
			async function setToken() {
				try {
					const token = await firebaseCloudMessaging.init();
					if (token) {
						//getMessage();
					}
				} catch (error) {
					console.log(error);
				}
			}
			function getMessage() {
				const messaging = getMessaging();
				onMessage(messaging, (message) => {
					const { title, body, tag } = message.notification;
					var options = {
						body,
						tag,
					};
				
					navigator.serviceWorker.ready.then((registration) => {
						//registration.showNotification(title, options);
					});
				});
			}
		}
	});
	
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
				
				<Script strategy="beforeInteractive" data-name="BMC-Widget" data-cfasync="false" src="https://cdnjs.buymeacoffee.com/1.0.0/widget.prod.min.js" data-id="f1cal" data-description="Support F1 Calendar on Buy me a coffee!" data-message="" data-color="#d10f1e" data-position="Right" data-x_margin="18" data-y_margin="18"></Script>
			</PlausibleProvider>
		</UserContextProvider>
	);
}

