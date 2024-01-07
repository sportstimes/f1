export default function Notice() {
	const config = require(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

	return (
		<>
			{ config.notice != null &&
				<div className="bg-yellow-200 rounded-md shadow py-4 mb-4 px-4 text-black font-bold">
					{ config.notice }
				</div>
			}
		</>
	);
}
