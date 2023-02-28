import dayjs from "dayjs";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import { Novu } from '@novu/node';
import { TriggerRecipientsTypeEnum } from '@novu/shared';

export default async (req, res) => {
	// Check if either email or push is supported.
	const config = await import(`../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`)	
	if(!config.supportsEmailReminders && !config.supportsWebPush){
		res.json({ success: true, message:"Site doesn't support email or web push." })
		return;
	}
	
	var isBetween = require('dayjs/plugin/isBetween')
	dayjs.extend(isBetween)
	
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
	
	
	// We send emails out an hour ahead.
	const hourBeforeFirstSession = firstSession.subtract(1, 'hour');
	const dateNow = dayjs();
	
	// Are we within a race weekend - 1 hour?
	if(!dateNow.isBetween(hourBeforeFirstSession, lastSession, 'minute')){
		res.json({ success: true, message:'Not within a race weekend' });
		return;
	}
	
	
	// Now we know we need to continue, init Firebase and Novu etc
	// Get the English localization file...
	const localization = await import(`../../locales/en/localization.json`)
	const localizationSite = localization[process.env.NEXT_PUBLIC_SITE_KEY];
	const localizationSchedule = localization.schedule;
	const localizationRaces = localization.races;
	
	
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
	
	const debugRef = db.collection("debug").doc(process.env.NEXT_PUBLIC_SITE_KEY)
	const emailDebugRef = db.collection("emailDebug").doc(process.env.NEXT_PUBLIC_SITE_KEY)
	
	// Initialize Novu
	const novu = new Novu(process.env.NEXT_PUBLIC_NOVU_API);
	
	// Within a weekend. So lets check if we need to send a session reminder...		
	var nextSession = null;
	
	Object.keys(nextRace.sessions).forEach(function (session, index) {
		if (dayjs(nextRace.sessions[session]).isAfter(Date()) && nextSession == null) {
			nextSession = session;
		}
	});
	
	const nextSessionDate = dayjs(nextRace.sessions[nextSession]);
	const nextSessionDateMinus5 = nextSessionDate.subtract(5, 'minutes');

	if(dateNow.isBetween(nextSessionDateMinus5, nextSessionDate, 'minute')){
		// Ensure we're not about to send a duplicate trigger to Novu...
		if (docData.exists && dayjs(Date()).diff(dayjs(docData.data()[nextSession]), 'minutes') > 60) {
			console.log("Trigger Topic: pushReminder, " + nextSession);
			
			const sessionTopic = `${process.env.NEXT_PUBLIC_SITE_KEY}-${nextSession}`;
			
			var title = nextRace.name;
			if(localizationRaces[nextRace['localeKey']]){
				title = localizationRaces[nextRace['localeKey']];
			}
			
			const body = `${localizationSchedule[nextSession]} starts soon.`;
			
			await novu.trigger('pushreminder', {
				to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: sessionTopic }],
				payload: {
					title:title,
					content:body
				},
			});
			
			await docRef.set({[nextSession]:Date()}, { merge: true });
			
			await debugRef.set({[Date()]:nextSession}, { merge: true });
		} else {
			console.log("Already sent! " + nextSession);
		}
		
	}
	
	let emailCuttoff = hourBeforeFirstSession.subtract(2, 'minutes');
	if(dateNow.isBetween(emailCuttoff, hourBeforeFirstSession, 'minute')){
		// Ensure we're not about to send a duplicate trigger to Novu...
		// Did we send an email within the last hour?
		
		if (docData.exists && dayjs(Date()).diff(dayjs(docData.data()['email-reminder']), 'minutes') > 90) {
			const reminderTopic = `${process.env.NEXT_PUBLIC_SITE_KEY}-reminder`;

			console.log("Trigger Topic: email-weekend, " + JSON.stringify(nextRace));
			
			var title = nextRace.name;
			if(localizationRaces[nextRace['localeKey']]){
				title = localizationRaces[nextRace['localeKey']];
			}
			
			// Is the first session within the next hour
			// If so, send the race weekend email.
			await novu.trigger('emailreminder', {
				to: [{ type: TriggerRecipientsTypeEnum.TOPIC, topicKey: reminderTopic }],
				payload: {title: title},
			});
			
			await docRef.set({'email-reminder':Date()}, { merge: true });
			
			await emailDebugRef.set({[Date()]:nextSession}, { merge: true });
		}
	}

	// Just send a success...
	res.json({ success: true })
}