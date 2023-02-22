import dayjs from "dayjs";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Novu } from '@novu/node';
import { TriggerRecipientsTypeEnum } from '@novu/shared';

export default async (req, res) => {
	firebase.initializeApp({
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_FIREBAE_AUTH_DOMAIN,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
		appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
	})
	
	const db = firebase.firestore();
	const docRef = db.collection("sites").doc(process.env.NEXT_PUBLIC_SITE_KEY)
	const docData = await docRef.get()
	
	const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API);
	
	const data = await import(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/${process.env.NEXT_PUBLIC_CURRENT_YEAR}.json`)
	const races = data.races;
	var nextRace = null;

	// Determine which race is next...
	races.map((item, index) => {
		if (item.sessions != null && nextRace == null) {
			let lastEventSessionKey = Object.keys(item.sessions)[
				Object.keys(item.sessions).length - 1
			];

			if (dayjs(item.sessions[lastEventSessionKey]).isAfter(Date())) {
				nextRace = item;
			}
		}
	});
	
	// Are we anywhere near the next race time wise?
	let firstEventSessionKey = Object.keys(nextRace.sessions)[0];
	let lastEventSessionKey = Object.keys(nextRace.sessions)[
		Object.keys(nextRace.sessions).length - 1
	];
	
	const firstSession = dayjs(nextRace.sessions[firstEventSessionKey]);
	const lastSession = dayjs(nextRace.sessions[lastEventSessionKey]);
	
	// Are we within a weekend?
	if(firstSession.isBefore(Date()) && lastSession.isAfter(Date()) || firstSession.diff(Date(), 'minutes') < 10){
		// Within a weekend. So lets check if we need to send a session reminder...
		// Within 10 minutes of the first session, so lets send out a push reminder...
		
		var nextSession = null;
		
		Object.keys(nextRace.sessions).forEach(function (session, index) {
			if (dayjs(nextRace.sessions[session]).isAfter(Date()) && nextSession == null) {
				nextSession = session;
			}
		});
		
		const nextSessionDate = dayjs(nextRace.sessions[nextSession]);
		
		if(nextSessionDate.diff(Date(), 'minutes') < 10){
			console.log(nextSession);
			console.log(dayjs(Date()).diff(dayjs(docData.data()[nextSession]), 'minutes'));
			
			// Ensure we're not about to send a duplicate trigger to Novu...
			if (!docData.exists || (docData.exists && docData.data()[nextSession] == null) || (docData.exists && dayjs(Date()).diff(dayjs(docData.data()[nextSession]), 'minutes') > 60)) {
				console.log("Trigger Topic: pushReminder, " + nextSession);
				
				// await novu.trigger('pushReminder', {
				// 	to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: nextSession }],
				// 	payload: {
				// 		race: nextRace,
				// 		session: nextSession
				// 	},
				// });
				
				docRef.set({[nextSession]:Date()}, { merge: true });
			} else {
				console.log("Already sent! " + nextSession);
			}
		} else {
			console.log("Not within 10 minutes of a session");
		}
		
	} else if(firstSession.diff(Date(), 'minutes') < 60){
		
		// Ensure we're not about to send a duplicate trigger to Novu...
		if (!docData.exists || (docData.exists && docData.data()['race-weekend'] == null) || (docData.exists && dayjs(Date()).diff(dayjs(docData.data()['race-weekend']), 'minutes') > 120)) {
			console.log("Trigger Topic: race-weekend, " + JSON.stringify(nextRace));
			
			// Is the first session within the next hour
			// If so, send the race weekend email.
			// await novu.trigger('race-weekend', {
			// 	to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: 'reminder' }],
			// 	payload: nextRace,
			// });
			
			docRef.set({'race-weekend':Date()}, { merge: true });
		} else {
			console.log("Already sent race-weekend!");
		}
	} else {
		console.log("Nothing to send");
	}

	res.json({ success: true })
}