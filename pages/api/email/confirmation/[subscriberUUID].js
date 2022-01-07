
export default async (req, res) => {
	
	console.log(req.query.subscriberUUID);
	
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
	
	// Get the subscriber based on the UUID
	const response = await fetch('https://mailer.f1calendar.com/api/subscribers?query=subscribers.uuid%3D%27'+subscriberUUID+'%27', {
	  method: 'GET',
	  headers: {
		'Content-Type': 'application/json',
		Authorization: 'Basic ' + encodedToken
	  }
	})
	
	const results = await response.json()
	
	if(results.data.results.length != 0){
		const subscriber = results.data.results[0];
		
		var listIDs = [];
		var lists = subscriber.lists;
		lists.forEach((list) => {
			listIDs.push(list.id);	
		});
		
		// Update the subscriber with preconfirm_subscriptions set to true
		let body = {
			id:subscriber.id,
			email:subscriber.email,
			name:subscriber.name,
			status:subscriber.status,
			attribs:subscriber.attribs,
			lists:listIDs,
			preconfirm_subscriptions: true
		};
		
		console.log("Confirming Subscription");
		
		const updateResponse = await fetch('https://mailer.f1calendar.com/api/subscribers/'+subscriber.id, {
		  method: 'PUT',
		  headers: {
			'Content-Type': 'application/json',
			Authorization: 'Basic ' + encodedToken
		  },
		  body: JSON.stringify(body)
		});
		
		return res.status(200).json(updateResponse);
	} else {
		return res.status(400).json({success:false});
	}
}