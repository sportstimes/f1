// import App from 'next/app'
import {UserContextProvider} from "../components/UserContext";
import {DefaultSeo} from "next-seo";
import "../styles/tailwind.css";
import "../styles/tailwind-utils.css";
import "../styles/index.css";

function MyApp({Component, pageProps}) {
	return (
		<UserContextProvider>
			<DefaultSeo
				canonical="https://www.f1calendar.com/"
				twitter={{
					handle: "@f1cal",
					site: "@f1cal",
					cardType: "summary_large_image"
				}}
				openGraph={{
					url: "https://www.f1calendar.com/",
					title: "F1 Calendar 2020 - Formula One Race Times and Dates",
					description:
						"Formula One Calendar for 2020 season with all F1 grand prix races, practice &amp; qualifying sessions. Set reminders feature. All world timezones. Download or subscribe.",
					site_name: "F1 Calendar 2020",
					images: [
						{
							url: "https://www.f1calendar.com/share.png",
							width: 1200,
							height: 628,
							alt: "F1 Calendar 2020"
						}
					]
				}}
			/>
			<Component {...pageProps} />
		</UserContextProvider>
	);
}

export default MyApp;
