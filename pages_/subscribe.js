import Layout from "components/Layout/Layout";
import {NextSeo} from "next-seo";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import Card from "components/Card/Card";

function Subscribe() {
	const {t} = useTranslation();

	const yearItems = [];
	let supportedYears = ["2020", "2019", "2018"];
	for (let year in supportedYears) {
		yearItems.push(
			<li key={supportedYears[year]}>
				<Link href={`year/${supportedYears[year]}`}>
					<a>{supportedYears[year]}</a>
				</Link>
			</li>
		);
	}

	return (
		<>
			<NextSeo
				title={`F1 Calendar Subscribe - Formula One Race Times and Dates`}
				description={`Formula One Calendar Archive with all F1 grand prix races, practice &amp; qualifying sessions. Set reminders feature. All world timezones. Download or subscribe.`}
				keywords={`F1, formula one, race times, races, reminder, alerts, grands prix, grand prix, calendar, dates, start times, qualifying, practice, London, Europe`}
				canonical="https://www.f1calendar.com/"
				twitter={{
					handle: "@f1cal",
					site: "@f1cal",
					cardType: "summary_large_image"
				}}
			/>
			<Layout year={process.env.NEXT_PUBLIC_CURRENT_YEAR}>
				<h3 className="text-xl mb-4">{t("subscribe:title")}</h3>
				<Card>
					<p class="pl-px pb-5">{t("subscribe:description")}</p>
					<form
						action="https://f1calendar.us10.list-manage.com/subscribe/post?u=e11245c4d3fecdad90cb66908&amp;id=f7a8a5001f"
						method="post"
						id="mc-embedded-subscribe-form"
						name="mc-embedded-subscribe-form"
						className="validate"
						target="_blank"
						noValidate
					>
						<div className="row">
							<label htmlFor="mce-EMAIL" className="font-bold text-lg">
								{t("subscribe:label")}
							</label>
							<input
								type="email"
								name="EMAIL"
								className="required email w-full px-1 py-2 text-black bg-gray-100 shadow-inner rounded-md border border-gray-400 focus:outline-none mt-2 mb-4"
								id="mce-EMAIL"
							/>
						</div>

						<div className="hidden">
							<input
								type="text"
								name="b_e11245c4d3fecdad90cb66908_f7a8a5001f"
								tabIndex="-1"
								defaultValue=""
							/>
						</div>

						<input
							type="submit"
							value={t("subscribe:button")}
							name="subscribe"
							id="mc-embedded-subscribe"
							className="btn"
						/>
					</form>
				</Card>
			</Layout>
		</>
	);
}

export default Subscribe;
