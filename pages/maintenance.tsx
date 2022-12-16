import MinimalLayout from "components/Layout/MinimalLayout";
import Card from "../components/Card/Card";
import React from "react";
import Link from "next/link";

const Maintenance = () => (
	<>
		<MinimalLayout>
			<h3 className="text-xl mb-4">Under Maintenance</h3>
			<Card>
				<p>We'll be back soon, the site is currently undergoing maintenance.</p>
			</Card>
		</MinimalLayout>
	</>
);

export default Maintenance;
