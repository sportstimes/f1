import dayjs from "dayjs";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Novu } from '@novu/node';
import { TriggerRecipientsTypeEnum } from '@novu/shared';

export default async (req, res) => {
	// Initialize Firebase
	firebase.initializeApp({
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
		appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
	})
	
	// Grab any documents which have a scheduledAt date in the past, which means we should send them...
	const db = firebase.firestore();
	const docRef = db.collection(process.env.NEXT_PUBLIC_SITE_KEY).where('scheduledAt', '<', new Date())
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
			const novuResponse = await novu.trigger('pushreminder', {
				to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: scheduledItem.topic }],
				payload: {
					title:title,
					content:body
				},
			});
			
			// Remove the document so we don't send it again!	
			await item.ref.delete();
		} else if(scheduledItem.type == "email"){
			const emailResponse = await novu.trigger('emailreminder', {
				to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: scheduledItem.topic }],
				payload: {title: title},
			});
		
			// Remove the document so we don't send it again!	
			await item.ref.delete();
		} else if(scheduledItem.type == "buffer"){
			const response = await fetch(`https://api.bufferapp.com/1/updates/create.json?access_token=${encodeURI(process.env.NEXT_PUBLIC_BUFFER_TOKEN)}`, {
			  method: 'POST',
			  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			  body: `text=${encodeURIComponent(scheduledItem.title)}&profile_ids[]=63ff8ab4a439208bacf17292&profile_ids[]=63ff8acfa439208bacf26e2a`,
			});
			const data = await response.json();
			
			// Remove the document so we don't send it again!	
			await item.ref.delete();
		}
	}
	
	res.json({ success: true })
}

