import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import * as fs from 'fs';
import dayjs from "dayjs";

async function generateQueue(siteKey){
	
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
	const collectionRef = db.collection(siteKey)
	
	// Remove all items from the collection...
	await collectionRef.get().then((snapshot) => {
		snapshot.docs.forEach((doc) => {
			doc.ref.delete();
		});
	});
	
	// Create new items...
	
	let rawConfig = fs.readFileSync(`_db/${siteKey}/config.json`);
	let config = JSON.parse(rawConfig);
	
	// Determine year to generate based off config...
	let year = config.availableYears.slice(-1);
	let rawdata = fs.readFileSync(`_db/${siteKey}/${year}.json`);
	let data = JSON.parse(rawdata);
	
	// Localization Strings
	let i18nStrings = fs.readFileSync(`locales/en/localization.json`);
	let localizedStrings = JSON.parse(i18nStrings);
	
	// Loop the races
	const races = data.races;
	
	for (const race of races) {
		// Figure out the first and last sessions.
		let firstEventSessionKey = Object.keys(race.sessions)[0];
		let lastEventSessionKey = Object.keys(race.sessions)[
			Object.keys(race.sessions).length - 1
		];
		
		const firstSession = dayjs(race.sessions[firstEventSessionKey]);
		const lastSession = dayjs(race.sessions[lastEventSessionKey]);
		
		const hourBeforeFirstSession = firstSession.subtract(1, 'hour');
		
		// Content
		var title = race.name;
		if(localizedStrings['races'][race.localeKey]){
			title = localizedStrings['races'][race.localeKey];
		}
		
		// Schedule the email...
		if(dayjs(hourBeforeFirstSession).isAfter(Date())){
			const ref = `${hourBeforeFirstSession.unix()}-${race.slug}-email`;
			
			await collectionRef.doc(ref).set({
				scheduledAt: hourBeforeFirstSession.toDate(),
				title: title,
				type: 'email',
				topic: `${siteKey}-reminder`
			})
		}
		
		// Schedule session notifications...
			
		for (const session of Object.keys(race.sessions)) {
			if (dayjs(race.sessions[session]).isAfter(Date())) {
				
				var body = session;
				if(localizedStrings['schedule'][session]){
					body = localizedStrings['schedule'][session];
				}
				
				body = `${body} will start soon!`;
				
				const scheduledAt = dayjs(race.sessions[session]).subtract(5, 'minutes');

				const ref = `${scheduledAt.unix()}-${race.slug}-${session}`;
								
				await collectionRef.doc(ref).set({
					scheduledAt: scheduledAt.toDate(),
					title: title,
					body: body,
					type: 'push',
					topic: `${siteKey}-${session}`
				})
			}
		}
	}
}

async function generateAllQueues() {
	console.log('Generating Queues for all sites');
	
	// Generate and deploy all calendars.
	let rawConfig = fs.readFileSync(`_db/sites.json`);
	let config = JSON.parse(rawConfig);
	let sites = config.sites;
	
	for (const site of sites) {
		console.log("Generating Queue for " + site.siteKey);
		await generateQueue(site.siteKey);
	}
}

if(process.argv.length > 2){
	var args = process.argv.slice(2);
	
	// Generate and deploy specific calendar
	let site = args[0];
	
	if(site === "all"){
		await generateAllQueues();
		process.exit(22);
	} else if(site === "build"){
		console.log("Generating Queue for " + process.env.NEXT_PUBLIC_SITE_KEY);
		await generateQueue(process.env.NEXT_PUBLIC_SITE_KEY);
		process.exit(22);
	} else {
		console.log("Generating Queue for " + site);
		await generateQueue(site);
		process.exit(22);
	}
} else {
	await generateAllQueues();
	process.exit(22);
}