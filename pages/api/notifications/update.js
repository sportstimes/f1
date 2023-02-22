import { Novu } from '@novu/node';

export default async (req, res) => {
	if (!req.body.identifier) {
		return res.status(400).json({
			success: false,
			message: "No identifier defined."
		});
	}
	
	const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API);

	const config = await import(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)  
	let sessions = config.sessions;
	
	var subscriptions = {};
	for await (const session of sessions) {
		if(req.body.topics.includes(session)){
			// Subscribe...
			console.log("add")
			await novu.topics.addSubscribers(session, {
				subscribers: [req.body.identifier],
			});
		} else {
			// Unsubscribe...
			
			console.log("remove")
			await novu.topics.removeSubscribers(session, {
				subscribers: [req.body.identifier],
			});
		}
	}
	
	return res.json({success:true});
}