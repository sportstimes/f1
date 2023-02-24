import Layout from "components/Layout/Layout";
import Card from "components/Card/Card";
import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

const Confirmation = (props) => {
	return (
		<Layout>
			<h3 className="text-xl mb-4">Awesome!</h3>
			<Card>
				<p>Your email has been confirmed.</p>
			</Card>
		</Layout>
	);
};

export async function getServerSideProps(context) {
	const config = require(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)
	
	const res = await fetch(`https://${config.url}/api/email/confirmation/${context.query.subscriberID}`, {
		headers: {
			'Content-Type': 'application/json'
		}
	});
	
	const result = await res.json()
	
	return {
		props: {
			result,
		},
	};
};

export default Confirmation;
