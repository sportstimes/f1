
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
	const response = await fetch(`${process.env.NEXT_PUBLIC_LISTMONK_URL}/api/subscribers?query=subscribers.uuid%3D%27${subscriberUUID}%27`, {
	  method: 'GET',
	  headers: {
		'Content-Type': 'application/json',
		Authorization: 'Basic ' + encodedToken
	  }
	})
	
	const results = await response.json()
	
	if(results.data.results.length != 0){
		const subscriber = results.data.results[0];
		
		// Create an array of lists the subscriber should remain subscribed to.
		var listIDs = [];
		var lists = subscriber.lists;
		lists.forEach((list) => {
			if(list.id != process.env.NEXT_PUBLIC_LISTMONK_LIST_ID){
				listIDs.push(list.id);
			}
		});
		
		console.log('lists '+ listIDs);
		
		if(listIDs.length == 0){
			
			console.log("Removing entirely...");
			
			// Remove the subscriber entirely...
			const deleteResponse = await fetch(`${process.env.NEXT_PUBLIC_LISTMONK_URL}/api/subscribers/${subscriber.id}`, {
			  method: 'DELETE',
			  headers: {
				'Content-Type': 'application/json',
				Authorization: 'Basic ' + encodedToken
			  }
			})
			
			return res.status(200).json(deleteResponse);
		} else {
			// Update the subscriber...
			let body = {
				id:subscriber.id,
				email:subscriber.email,
				name:subscriber.name,
				status:subscriber.status,
				attribs:subscriber.attribs,
				lists:listIDs
			};
			
			console.log("Removing this site");
			
			const updateResponse = await fetch(`${process.env.NEXT_PUBLIC_LISTMONK_URL}/api/subscribers/${subscriber.id}`, {
			  method: 'PUT',
			  headers: {
				'Content-Type': 'application/json',
				Authorization: 'Basic ' + encodedToken
			  },
			  body: JSON.stringify(body)
			});
			
			return res.status(200).json(updateResponse);
		}
	} else {
		return res.status(400).json({success:false});
	}
}