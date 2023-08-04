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
		
		const response = await fetch(`https://api.novu.co/v1/topics/${topicKey}/subscribers/${req.query.identifier}`, {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
			'Authorization': `ApiKey ${process.env.NEXT_PUBLIC_NOVU_API}`,
		  }
		});
		
		const json = await response.json();
		
		if(json.data != null && json.data.externalSubscriberId != null){
			subscriptions[session] = true;
		} else {
			subscriptions[session] = false;
		}
	}
	
	return res.json({success:true, subscriptions:subscriptions});
}