const fs = require('fs')
const ics = require('ics')
const dayjs = require('dayjs')

// Grab the calendar...
let rawdata = fs.readFileSync('db/2020.json');
let data = JSON.parse(rawdata);

// Grab the current i18n config
let i18nConfig = fs.readFileSync('i18n.json');
let i18n = JSON.parse(i18nConfig);


// Define which options we have for calendar generation...
// Old unused options which are left just to avoid 404 errors: virtual
const calendarOptions = ['p1', 'p2', 'p3', 'q', 'gp', 'alarm']

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

// Figure out all the permutations...
// This could do with being a little cleaner but it works...
let optionPermutations = [];
optionPermutations.push(...getPermutations(calendarOptions, 1));
optionPermutations.push(...getPermutations(calendarOptions, 2));
optionPermutations.push(...getPermutations(calendarOptions, 3));
optionPermutations.push(...getPermutations(calendarOptions, 4));
optionPermutations.push(...getPermutations(calendarOptions, 5));
optionPermutations.push(...getPermutations(calendarOptions, 6));

let fileNames = [];
let localizedFilenames = [];

// TODO: Reduce the number of options here someday.
const legacyAlarmOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120];
const alarmOptions = [0, 30, 60, 90, 120];

// Generate Filenames
for (permutation of optionPermutations) {
    const filename = permutation.join("_");

    // If the filename contains alarm then add each of the alarm permutations.
    if (filename != "alarm") {
        fileNames.push(filename);
        localizedFilenames.push(filename);

        if (filename.includes("alarm")) {
            for (alarmOption of legacyAlarmOptions) {
                fileNames.push(filename + "-" + alarmOption);
            }

            for (alarmOption of alarmOptions) {
                localizedFilenames.push(filename + "-" + alarmOption);
            }
        }
    }
}

// For each filename, create a ics file.
for (language of i18n.allLanguages) {

	let i18nStrings = fs.readFileSync(`locales/${language}/calendar.json`);
	let localizedStrings = JSON.parse(i18nStrings);

	let sessionFP1 = "First Practice Session";
	let sessionFP2 = "Second Practice Session";
	let sessionFP3 = "Third Practice Session";
	let sessionQuali = "Qualifying Session";

	if(localizedStrings.schedule.fp1){
		sessionFP1 = localizedStrings.schedule.fp1;
	}
	if(localizedStrings.schedule.fp2){
		sessionFP2 = localizedStrings.schedule.fp2;
	}
	if(localizedStrings.schedule.fp3){
		sessionFP3 = localizedStrings.schedule.fp3;
	}
	if(localizedStrings.schedule.qualifying){
		sessionQuali = localizedStrings.schedule.qualifying;
	}

	var languageFilesnames = language == "en" ? fileNames : localizedFilenames;

    for (request of languageFilesnames) {
        let includeFP1, includeFP2, includeFP3, includeQuali, includeRace = false
        let alarmEnabled = false

        includeFP1 = request.includes("p1")
        includeFP2 = request.includes("p2")
        includeFP3 = request.includes("p3")
		includeQuali = request.includes("q")
		includeRace = request.includes("gp")
		alarmEnabled = request.includes("alarm")

        let alarmOffset = 30;
        if (alarmEnabled) {
            let requestArray = request.split("-");
            alarmOffset = requestArray.slice(-1)[0];
        }

        let events = []

        const races = data.races;

        let i = 0;
        for (i = 0; i < races.length; i++) {
            let race = races[i]

            // Check we have sessions as we'll keep them out of TBC races unless we have tentative dates.
            if (race.sessions != null) {
                // Sessions
                let s = 0;
                for (s = 0; s < Object.keys(race.sessions).length; s++) {
                    let sessionKey = Object.keys(race.sessions)[s];
                    let session = race.sessions[sessionKey]

                    // Skip
                    if (sessionKey === "fp1" && !includeFP1) continue;
                    if (sessionKey === "fp2" && !includeFP2) continue;
                    if (sessionKey === "fp3" && !includeFP3) continue;
                    if (sessionKey === "qualifying" && !includeQuali) continue;
                    if (sessionKey === "race" && !includeRace) continue;

                    let title = race.name;
                    if(localizedStrings.races[race.localeKey]){
                    	title = localizedStrings.races[race.localeKey];
					}

					let category = "Grand Prix";
                    let sessionLength = 120;
                    if (sessionKey === "fp1") {
                        title = `${sessionFP1} (${title})`;
                        category = sessionFP1;
                        sessionLength = 90;
                    } else if (sessionKey === "fp2") {
						title = `${sessionFP2} (${title})`;
						category = sessionFP2;
                        sessionLength = 90;
                    } else if (sessionKey === "fp3") {
						title = `${sessionFP3} (${title})`;
						category = sessionFP3;
                        sessionLength = 60;
                    } else if (sessionKey === "qualifying") {
						title = `${sessionQuali} (${title})`;
						category = sessionQuali;
                        sessionLength = 60;
                    }

                    let alarms = []
                    if (alarmEnabled) {
                        let alarmDescription = title + " starts in " + alarmOffset + " minutes"
                        alarms.push({
                            action: 'display',
                            description: alarmDescription,
                            trigger: {minutes: alarmOffset, before: true},
                            repeat: 0,
                        })
                    }

                    let start = dayjs(session).format('YYYY-M-D-H-m').split("-")
                    let end = dayjs(session).add(sessionLength, 'minutes').format('YYYY-M-D-H-m').split("-")

                    let status = "CONFIRMED";
                    if (race.tbc) {
                        status = "TENTATIVE";

                        let tbcString = localizedStrings.badges.tbc ? localizedStrings.badges.tbc : "TBC";
                        title = `(${tbcString}) ${title}`;
                    }

                    if (race.canceled) {
                        status = "CANCELLED";

                        let cancelledString = localizedStrings.badges.canceled ? localizedStrings.badges.canceled : "CANCELED";
                        title = `(${cancelledString}) ${title}`;
                    }


                    let event = {
                        title: title,
                        location: race.location,
                        productId: "f1calendar.com",
                        uid: "http://2020.f1calendar.com/#GP" + i + "_2020_" + sessionKey,
                        categories: [category],
                        start: start,
                        end: end,
                        geo: {lat: race.latitude, lon: race.longitude},
                        sequence: "2020",
                        alarms: alarms,
                        status: status
                    }
                    events.push(event)
                }
            }
        }

        ics.createEvents(events, (error, value) => {
            if (error) {
                // TODO: Handle an error...
            } else {
                let path = `public/download/${language}/f1-calendar_${request}.ics`
				if(language === "en"){
					path = `public/download/f1-calendar_${request}.ics`
				}

				console.log("Writing Calendar to " + path);

                fs.writeFileSync(path, value);
            }
        });
    }
}