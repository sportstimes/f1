import { Novu, PushProviderIdEnum } from '@novu/node';

export default async (req, res) => {
	
	if (!req.query.identifier) {
		return res.status(400).json({
			success: false,
			message: "No identifier defined."
		});
	}
	
	const config = await import(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)  
	let sessions = config.sessions;
	
	var subscriptions = {};
	for await (const session of sessions) {
		let topicKey = `${process.env.NEXT_PUBLIC_SITE_KEY}-${session}`;
				
		// For now fetch the topics which contains the subscriptions.
		// Novu has a card for retrieving just the topics for a particular subscriber.
		const response = await fetch(`https://api.novu.co/v1/topics/${topicKey}`, {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
			'Authorization': `ApiKey ${process.env.NEXT_PUBLIC_NOVU_API}`,
		  }
		});
		
		const json = await response.json();
		
		if(json.data != null && json.data.subscribers != null){
			let subscribers = json.data.subscribers;
			subscriptions[session] = subscribers.includes(req.query.identifier);
		}
	}
	
	return res.json({success:true, subscriptions:subscriptions});
}