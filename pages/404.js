import Layout from "components/Layout/Layout";
import Card from "components/Card/Card";
import React from "react";
import Link from "next/link";

const Custom404 = () => (
	<>
		<Layout>
			<h3 className="text-xl mb-4">404</h3>
			<Card>
				<p>*waves red flags* We couldn't find that page!</p>
			</Card>
		</Layout>
	</>
);

export default Custom404;
