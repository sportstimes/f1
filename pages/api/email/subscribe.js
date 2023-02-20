import { Novu } from '@novu/node';

export default async (req, res) => {
	if (!req.body.identifier) {
		return res.status(400).json({
			success: false,
			message: "No identifier defined."
		});
	}
	
	if (!req.body.email) {
		return res.status(400).json({
			success: false,
			message: "No email defined."
		});
	}
	
	const config = await import(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)  
	
	let email = req.body.email;
	
	const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API);

	const subscriptionResponse = await novu.subscribers.identify(req.body.identifier, {
		email: email,
	})
	
	const response = await novu.topics.addSubscribers('reminder', {
		subscribers: [req.body.identifier],
	});
	
	return res.json({success:true});
}