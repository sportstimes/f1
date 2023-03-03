import Layout from "components/Layout/Layout";
import Card from "components/Card/Card";
import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

const Unsubscribe = (props) => {
	return (
		<Layout>
			<h3 className="text-xl mb-4">Sorry to see you go!</h3>
			<Card>
				<p>You have been unsubscribed.</p>
			</Card>
		</Layout>
	);
};

export async function getServerSideProps(context) {	
	const config = require(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)
	
	const res = await fetch(`https://${config.url}/api/email/unsubscribe/${context.query.subscriberID}`, {
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

export default Unsubscribe;
