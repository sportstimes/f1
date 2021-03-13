const fs = require("fs");
const ics = require("ics");
const dayjs = require("dayjs");

const siteKey = process.env.NEXT_PUBLIC_SITE_KEY;
const year = process.env.NEXT_PUBLIC_CURRENT_YEAR;

// const siteKey = "f1";
// const year = "2021";

// Grab the site config...
let rawConfig = fs.readFileSync(`_db/${siteKey}/config.json`);
let config = JSON.parse(rawConfig);

// Grab the calendar...
let rawdata = fs.readFileSync(`_db/${siteKey}/${year}.json`);
let data = JSON.parse(rawdata);

// Grab the current i18n config
let i18nConfig = fs.readFileSync("i18n.json");
let i18n = JSON.parse(i18nConfig);

// Options from calendar generation...
let calendarOptions = [];

let sessionMap = config.sessionMap;
for (session of Object.keys(sessionMap)) {
	calendarOptions.push(sessionMap[session]);
}

// Add the alarm suffix.
calendarOptions.push("alarm");

function getPermutations(array, size) {
	function p(t, i) {
		if (t.length === size) {
			result.push(t);
			return;
		}
		if (i + 1 > array.length) {
			return;
		}
		p(t.concat(array[i]), i + 1);
		p(t, i + 1);
	}

	let result = [];
	p([], 0);
	return result;
}

// Figure out all the permutations of the calendar...
let optionPermutations = [];

for (let length = 1; length < calendarOptions.length+1; length++) {
	optionPermutations.push(...getPermutations(calendarOptions, length));
}

let fileNames = [];
let localizedFilenames = [];

const legacyAlarmOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120];
const alarmOptions = [0, 30, 60, 90, 120];

// Generate Filenames
for (permutation of optionPermutations) {
	const filename = permutation.join("_");

	// If the filename contains alarm then add each of the alarm permutations.
	if (filename != "alarm") {
		// Add the filenames pre-alarm options
		fileNames.push(filename);
		localizedFilenames.push(filename);
		
		if (filename.includes("alarm")) {
			
			// If it's F1 Calendar generate all the legacy options....
			if(siteKey == "f1"){
				for (alarmOption of legacyAlarmOptions) {
					fileNames.push(filename + "-" + alarmOption);
				}
			}
			
			for (alarmOption of alarmOptions) {
				// If the site isn't F1 Calendar then generate the usual alarm options.
				if(siteKey != "f1"){
					fileNames.push(filename + "-" + alarmOption);
				}
				localizedFilenames.push(filename + "-" + alarmOption);
			}
		}
	}
}


// Make the download folder...
let downloadDir = `public/download`;
if (!fs.existsSync(downloadDir)){
	fs.mkdirSync(downloadDir);
}

// For each filename, create a ics file.
for (language of i18n.locales) {
	// Create the folder in public...
	let dir = `public/download/${language}`;
	if (language != "en" && !fs.existsSync(dir)){
		fs.mkdirSync(dir);
	}
	
	let i18nStrings = fs.readFileSync(`locales/${language}/calendar.json`);
	let localizedStrings = JSON.parse(i18nStrings);

	var languageFilesnames = language == "en" ? fileNames : localizedFilenames;

	for (request of languageFilesnames) {
		let alarmEnabled = request.includes("alarm");

		let alarmOffset = 30;
		if (alarmEnabled) {
			let requestArray = request.split("-");
			alarmOffset = requestArray.slice(-1)[0];
		}

		let events = [];

		const races = data.races;

		let i = 0;
		for (i = 0; i < races.length; i++) {
			let race = races[i];

			// Check we have sessions as we'll keep them out of TBC races unless we have tentative dates.
			if (race.sessions != null) {
				// Sessions
				let s = 0;
				for (s = 0; s < Object.keys(race.sessions).length; s++) {
					let sessionKey = Object.keys(race.sessions)[s];
					let session = race.sessions[sessionKey];

					// Skip
					if(!request.includes(sessionMap[sessionKey])) continue;
					
					let title = race.name;
					if (localizedStrings.races[race.localeKey]) {
						title = localizedStrings.races[race.localeKey];
					}

					let category = "Grand Prix";
					
					// If the session isn't featured then add the session name in front...
					// Or if there are multiple featured sessions then add the session name in front (sprint, feature etc)...
					if(!config.featuredSessions[sessionKey] || (config.featuredSessions[sessionKey] && config.featuredSessions.length > 1)){
						let sessionTitle = localizedStrings.schedule[sessionKey];
						
						title = `${sessionTitle} (${title})`;
						category = sessionTitle;
					}
					
					// Session Length
					let sessionLength = 120;

					if(config.sessionLengths != null){
						if(config.sessionLengths[sessionKey] != null){
							sessionLength = config.sessionLengths[sessionKey];
						}
					}
					
					// TODO: Localize....
					let alarms = [];
					if (alarmEnabled) {
						let alarmDescription =
							title + " starts in " + alarmOffset + " minutes";
						alarms.push({
							action: "display",
							description: alarmDescription,
							trigger: {minutes: alarmOffset, before: true},
							repeat: 0
						});
					}

					let start = dayjs(session).format("YYYY-M-D-H-m").split("-");
					let end = dayjs(session)
						.add(sessionLength, "minutes")
						.format("YYYY-M-D-H-m")
						.split("-");

					let status = "CONFIRMED";
					if (race.tbc) {
						status = "TENTATIVE";

						let tbcString = localizedStrings.badges.tbc
							? localizedStrings.badges.tbc
							: "TBC";
						title = `(${tbcString}) ${title}`;
					}

					if (race.canceled) {
						status = "CANCELLED";

						let cancelledString = localizedStrings.badges.canceled
							? localizedStrings.badges.canceled
							: "CANCELED";
						title = `(${cancelledString}) ${title}`;
					}

					let event = {
						title: title,
						location: race.location,
						productId: config.url,
						uid: "http://" + year + "." + config.url + "/#GP" + i + "_" + year + "_" + sessionKey,
						categories: [category],
						start: start,
						end: end,
						geo: {lat: race.latitude, lon: race.longitude},
						sequence: year,
						alarms: alarms,
						status: status
					};
					events.push(event);
				}
			}
		}
		
		ics.createEvents(events, (error, value) => {
			if (error) {
				// TODO: Handle an error...
				console.log("Calendar Error: " + error);
			} else {
				let path = (language === "en") ? `public/download/${siteKey}-calendar_${request}.ics` : `public/download/${language}/${siteKey}-calendar_${request}.ics`;
				
				console.log("Writing Calendar to " + path);

				fs.writeFileSync(path, value);
			}
		});
	}
}
