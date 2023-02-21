import { Novu, PushProviderIdEnum } from '@novu/node';

export default async (req, res) => {
	if (!req.query.identifier) {
		return res.status(400).json({
			success: false,
			message: "No identifier defined."
		});
	}
	
	// For now fetch the topics which contains the subscriptions.
	// Novu has a card for retrieving just the topics for a particular subscriber.
	const response = await fetch('https://api.novu.co/v1/topics', {
	  method: 'GET',
	  headers: {
		'Content-Type': 'application/json',
		'Authorization': `ApiKey ${process.env.NEXT_PUBLIC_NOVU_API}`,
	  }
	});
	
	const data = await response.json();
	const topics = data.data;
	
	const config = await import(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)  
	let sessions = config.sessions;
	
	var subscriptions = {};
	sessions.forEach(function (session, index) {
		let topic = topics.find(o => o.key === session);
		let subscribers = topic.subscribers;
		
		subscriptions[session] = subscribers.includes(req.query.identifier);		
	});
	
	return res.json({success:true, subscriptions:subscriptions});
}