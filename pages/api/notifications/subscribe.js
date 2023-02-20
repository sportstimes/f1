import { Novu, PushProviderIdEnum } from '@novu/node';

export default async (req, res) => {
	if (!req.body.identifier) {
		return res.status(400).json({
			success: false,
			message: "No identifier defined."
		});
	}
	
	if (!req.body.token) {
		return res.status(400).json({
			success: false,
			message: "No token defined."
		});
	}
	
	const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API);
	
	const subscriptionResponse = await novu.subscribers.identify(req.body.identifier)
	
	const credentialResponse = await novu.subscribers.setCredentials(req.body.identifier, PushProviderIdEnum.FCM, {
	  deviceTokens: [req.body.token],
	});
	
	return res.json({success:true});
}