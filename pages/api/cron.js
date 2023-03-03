import dayjs from "dayjs";
import admin from 'firebase-admin';
import { Novu } from '@novu/node';
import { TriggerRecipientsTypeEnum } from '@novu/shared';

export default async (req, res) => {
	const config = require(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);

	if(!config.supportsWebPush && !config.supportsEmailReminders){
		res.json({ success: true, message: "Doesn't support web push or email." })
	}
	
	if (!admin.apps.length) {
	  admin.initializeApp({
		credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_CREDENTIALS))
	  })
	}
	const db = admin.firestore()
	
	const cutoffDate = dayjs(Date()).subtract(3, 'minutes');
	
	// Grab any documents which have a scheduledAt date in the past, which means we should send them...
	// But only if they're not older than 3 minutes, if they are something has gone wrong and there not sending
	
	const docRef = db.collection(process.env.NEXT_PUBLIC_SITE_KEY).where('scheduledAt', '<', new Date()).where('scheduledAt', '>', cutoffDate.toDate())
	const docSnapshot = await docRef.get()
	
	if (docSnapshot.empty) {
		console.log("Nothing to send");
		res.json({ success: true, message: "Nothing to send!" })
		return;
	}
	
	console.log("We have something to send...");
	
	const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API);

	for await(let item of docSnapshot.docs) {
		const scheduledItem = item.data();
		const title = scheduledItem.title;
		const body = scheduledItem.body;
		
		if(scheduledItem.type == "push"){
			try {
				const novuResponse = await novu.trigger('pushreminder', {
					to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: scheduledItem.topic }],
					payload: {
						title:title,
						content:body
					},
				});
				
				console.log("push")
				console.log(novuResponse)
				
				// Remove the document so we don't send it again!	
				await item.ref.delete();
			} catch(error){
				console.log("pusherror "+ error)
			}
		} else if(scheduledItem.type == "email"){
			try {
				const emailResponse = await novu.trigger('emailreminder', {
					to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: scheduledItem.topic }],
					payload: {title: title},
				});
				console.log("emailResponse:")
				console.log(emailResponse)
				
				// Remove the document so we don't send it again!	
				await item.ref.delete();
			} catch(error){
				console.log("email error:"+ error)
			}
		} else if(scheduledItem.type == "buffer"){
			const response = await fetch(`https://api.bufferapp.com/1/updates/create.json?access_token=${encodeURI(process.env.NEXT_PUBLIC_BUFFER_TOKEN)}`, {
			  method: 'POST',
			  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			  body: `text=${encodeURIComponent(scheduledItem.title)}&profile_ids[]=63ff8ab4a439208bacf17292&profile_ids[]=63ff8acfa439208bacf26e2a`,
			});
			const data = await response.json();
			
			console.log("Buffer"+ JSON.stringify(data))
			
			// Remove the document so we don't send it again!	
			await item.ref.delete();
		}
	}
	
	res.json({ success: true })
}

