
export default async (req, res) => {
	
	if (!req.query.subscriberUUID) {
		return res.status(400).json({
			success: false,
			message: "No email defined."
		});
	}
	
	const config = await import(`../../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)  
	
	let subscriberUUID = req.query.subscriberUUID;
		
	const token = `${process.env.NEXT_PUBLIC_LISTMONK_USERNAME}:${process.env.NEXT_PUBLIC_LISTMONK_PASSWORD}`;
	const encodedToken = Buffer.from(token).toString('base64');
	
	const body = `l=${process.env.NEXT_PUBLIC_LISTMONK_LIST_UUID}&confirm=true`;
	
	const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_LISTMONK_URL}/subscription/optin/${subscriberUUID}`, {
	  method: 'POST',
	  headers: {
	  	'Content-Type': 'application/x-www-form-urlencoded',
		Authorization: 'Basic ' + encodedToken
	  },
	  body: body
	});
	
	return res.status(200).json(JSON.stringify(updateResponse));
}
