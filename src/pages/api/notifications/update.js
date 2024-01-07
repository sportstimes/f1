export default async (req, res) => {
	if (!req.body.identifier) {
		return res.status(400).json({
			success: false,
			message: "No identifier defined."
		});
	}
	
	// Get the Config
	const config = await import(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)  
	let sessions = config.sessions;
	
	var subscriptions = {};
	for await (const session of sessions) {
		
		const topicKey = `${process.env.NEXT_PUBLIC_SITE_KEY}-${session}`;
		
		if(req.body.topics.includes(session)){
			
			console.log("Add user? " +topicKey);
			
			// Subscribe...
			const response = await fetch(`https://api.novu.co/v1/topics/${topicKey}/subscribers`, {
			  method: 'POST',
			  headers: {
				'Content-Type': 'application/json',
				'Authorization': `ApiKey ${process.env.NEXT_PUBLIC_NOVU_API}`,
			  },
			  body: JSON.stringify({
				subscribers: [req.body.identifier]
			  }),
			});
			const data = await response.json();
			
			console.log(data);
			
		} else {
			
			console.log("Remove user? " +topicKey);
			// Unsubscribe...
			try {
				const response2 = await fetch(`https://api.novu.co/v1/topics/${topicKey}/subscribers/removal`, {
			  		method: 'POST',
			  		headers: {
						'Content-Type': 'application/json',
						'Authorization': `ApiKey ${process.env.NEXT_PUBLIC_NOVU_API}`,
			  		},
			  		body: JSON.stringify({
						subscribers: [req.body.identifier]
			  		}),
				});
			} catch(error) {
				console.log(error);
			}
		}
	}
	
	return res.json({success:true});
}