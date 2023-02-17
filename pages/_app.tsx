import { useEffect } from "react";
import { AppProps } from 'next/app'
import {UserContextProvider} from "../components/UserContext";
import {DefaultSeo} from "next-seo";
import "../styles/tailwind.css";
import "../styles/tailwind-utils.css";
import "../styles/index.css";
import useTranslation from 'next-translate/useTranslation'
import PlausibleProvider from "next-plausible";
import * as PusherPushNotifications from "@pusher/push-notifications-web";

let beamsClient: PusherPushNotifications.Client | undefined = undefined;

export default function CalendarApp({ Component, pageProps }: AppProps) {
	const { t, lang } = useTranslation();
	
	const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
	
	const title = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, { year: currentYear });
	const description = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, { year: currentYear })
	const keywords = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.keywords`, { year: currentYear })
	
	const config = require(`../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)
	
	useEffect(() => {
		try {
		beamsClient = new PusherPushNotifications.Client({
		  instanceId: process.env.NEXT_PUBLIC_PUSHER_INSTANCE,
		});
		
		beamsClient
			.getRegistrationState()
			.then((state) => {
				let states = PusherPushNotifications.RegistrationState;
				if(state === states.PERMISSION_GRANTED_REGISTERED_WITH_BEAMS){
					beamsClient
						.start()
						.catch(console.error);
				}
			});
		} catch (error) {
			
		}
	  }, [beamsClient]);
	
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

