import Layout from "../components/Layout/Layout";
import {NextSeo} from "next-seo";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import Card from "../components/Card/Card";

function Years() {
	const {t} = useTranslation();

	const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;

	const config = require(`../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
	
	const title = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.title`, {
		year: currentYear
	});
	const description = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.description`, {
		year: currentYear
	});
	const keywords = t(`localization:${process.env.NEXT_PUBLIC_SITE_KEY}.seo.keywords`, {
		year: currentYear
	});

	let availableYears = config.availableYears;

	const yearItems = [];
	for (let year in availableYears) {
		yearItems.push(
			<li key={availableYears[year]}>
				<Link href={`year/${config.availableYears[year]}`}>
					<a>{availableYears[year]}</a>
				</Link>
			</li>
		);
	}

	return (
		<>
			<NextSeo
				title={title}
				description={description}
				keywords={keywords}
			/>
			<Layout>
				<h3 className="text-xl mb-4">{t("localization:years.title")}</h3>
				<Card>
					<p>
						<ul>{yearItems}</ul>
					</p>
				</Card>
			</Layout>
		</>
	);
}

export async function getStaticProps() {
	return {
		revalidate: 3600
	}
}

export default Years;
