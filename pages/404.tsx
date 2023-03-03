import Layout from "../components/Layout/Layout";
import Card from "../components/Card/Card";
import React from "react";
import Link from "next/link";

const Custom404 = () => {
	const currentYear = process.env.NEXT_PUBLIC_CURRENT_YEAR;
	const config = require(`../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

	return (
		<Layout showCTABar={false} year={Number(currentYear)} >
			<h3 className="text-xl mb-4">404</h3>
			<Card>
				<p>*waves red flags* We couldn&apos;t find that page!</p>
			</Card>
		</Layout>
	);
};

export default Custom404;
