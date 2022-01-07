import Layout from "components/Layout/Layout";
import Card from "components/Card/Card";
import React from "react";
import Link from "next/link";
import { useRouter } from 'next/router'

const Confirmation = (props) => {
	
	const router = useRouter()
	const { subscriberID } = router.query
	
	// Use the Subscriber ID and set their subscriber to be "confirmed" in listmonk.
	
	
	return (<>
		<Layout>
			<h3 className="text-xl mb-4">Awesome!</h3>
			<Card>
				<p>Your email has been confirmed.</p>
			</Card>
		</Layout>
	</>);
};

export default Confirmation;
