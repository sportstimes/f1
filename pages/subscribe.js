import Layout from "components/Layout/Layout";
import {NextSeo} from "next-seo";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import Card from "components/Card/Card";
import NextError from 'next/error'
import {usePlausible} from "next-plausible";

function Subscribe() {
	const {t} = useTranslation();
	const plausible = usePlausible();

	const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

	const title = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {
		year: currentYear
	});
	const description = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, {
		year: currentYear
	});
	const keywords = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.keywords`, {
		year: currentYear
	});

	const config = require(`../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

	if(!config.supportsEmailReminders){
		return <NextError statusCode={404} />
	}

	return (
		<>
			<NextSeo title={title} description={description} keywords={keywords} />
			<Layout year={process.env.NEXT_PUBLIC_CURRENT_YEAR}>
				<h3 className="text-xl mb-4">{t("localization:subscribe.title")}</h3>
				<Card>
					<p className="pl-px pb-5">{t("localization:subscribe.description")}</p>
					<form
						action="https://f1calendar.us10.list-manage.com/subscribe/post?u=e11245c4d3fecdad90cb66908&amp;id=f7a8a5001f"
						method="post"
						id="mc-embedded-subscribe-form"
						name="mc-embedded-subscribe-form"
						className="validate"
						target="_blank"
						noValidate
						onSubmit={async e => {
							plausible("Subscribed to Email Alerts");
						}}
					>
						<div className="row">
							<label htmlFor="mce-EMAIL" className="font-bold text-lg">
								{t("localization:subscribe.label")}
							</label>
							<input
								type="email"
								name="EMAIL"
								className="required px-2 email w-full py-2 text-black bg-gray-100 shadow-inner rounded-md border border-gray-400 focus:outline-none mt-2 mb-4"
								id="mce-EMAIL"
								placeholder="your@email.com"
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
							value={t("localization:subscribe.button")}
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
