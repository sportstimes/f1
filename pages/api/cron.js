import dayjs from "dayjs";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Novu } from '@novu/node';
import { TriggerRecipientsTypeEnum } from '@novu/shared';

export default async (req, res) => {
	// if (req.query.key !== 'sharedKey') {
	// 	res.status(404).end();
	// 	return;
	// }
	
	// Check if either email or push is supported.
	const config = await import(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)	
	if(!config.supportsEmailReminders && !config.supportsWebPush){
		res.json({ success: true, message:"Site doesn't support email or web push." })
		return;
	}
	
	// Initialize Firebase
	firebase.initializeApp({
		apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
		authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
		projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
		storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
		messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_ID,
		appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
	})
	
	// Where we store the dates of the last send, used to protect against sending extra notifications etc.
	const db = firebase.firestore();
	const docRef = db.collection("sites").doc(process.env.NEXT_PUBLIC_SITE_KEY)
	const docData = await docRef.get()
	
	// Initialize Novu
	const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API);
	
	// Get the English localization file...
	const localization = await import(`../../locales/en/localization.json`)
	const localizationSite = localization[process.env.NEXT_PUBLIC_SITE_KEY];
	const localizationSchedule = localization.schedule;
	const localizationRaces = localization.races;

	// Get this years calendar
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


	// Figure out the first and last sessions.
	let firstEventSessionKey = Object.keys(nextRace.sessions)[0];
	let lastEventSessionKey = Object.keys(nextRace.sessions)[
		Object.keys(nextRace.sessions).length - 1
	];
	
	const firstSession = dayjs(nextRace.sessions[firstEventSessionKey]);
	const lastSession = dayjs(nextRace.sessions[lastEventSessionKey]);
	
	// Notification Gap
	var date = new Date();
	date.setMinutes(date.getMinutes() + 5); 
	
	// Are we within a weekend?
	if(firstSession.isBefore(date) && lastSession.isAfter(date)){
		// Within a weekend. So lets check if we need to send a session reminder...		
		var nextSession = null;
		
		Object.keys(nextRace.sessions).forEach(function (session, index) {
			if (dayjs(nextRace.sessions[session]).isAfter(Date()) && nextSession == null) {
				nextSession = session;
			}
		});
		
		const nextSessionDate = dayjs(nextRace.sessions[nextSession]);
		
		if(nextSessionDate.diff(date, 'minutes') <= 1){
			// Ensure we're not about to send a duplicate trigger to Novu...
			if ((docData.exists && dayjs(Date()).diff(dayjs(docData.data()[nextSession]), 'minutes') > 60)) {
				console.log("Trigger Topic: pushReminder, " + nextSession);
				
				const sessionTopic = `${process.env.NEXT_PUBLIC_SITE_KEY}-${nextSession}`;
				
				await novu.trigger('pushreminder', {
					to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: sessionTopic }],
					payload: {
						title:nextRace.name,
						content:`${nextSession}`
					},
				});
				
				docRef.set({[nextSession]:Date()}, { merge: true });
			} else {
				console.log("Already sent! " + nextSession);
			}
		} else {
			console.log("Not within 10 minutes of a session");
		}
	}
	
	if(firstSession.diff(Date(), 'minutes') < 60 && firstSession.diff(Date(), 'minutes') > 55){
		// Ensure we're not about to send a duplicate trigger to Novu...
		if ((docData.exists && dayjs(Date()).diff(dayjs(docData.data()['email-reminder']), 'minutes') > 60)) {
			const reminderTopic = `${process.env.NEXT_PUBLIC_SITE_KEY}-reminder`;

			console.log("Trigger Topic: email-weekend, " + JSON.stringify(nextRace));
			
			// Is the first session within the next hour
			// If so, send the race weekend email.
			await novu.trigger('emailreminder', {
				to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: reminderTopic }],
				payload: {race: nextRace},
			});
			
			docRef.set({'email-reminder':Date()}, { merge: true });
		} else {
			console.log("Already sent race-weekend!");
		}
	}

	// Just send a success...
	res.json({ success: true })
}