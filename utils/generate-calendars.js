const fs = require('fs')
const ics = require('ics')
const moment = require('moment')

// Grab the calendar...
let rawdata = fs.readFileSync('db/2020.json');
let data = JSON.parse(rawdata);

// Define which options we have for calendar generation...
// Old unused options which are left just to avoid 404 errors: virtual
const calendarOptions = ['p1', 'p2', 'p3', 'q', 'gp', 'virtual', 'alarm']

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

    var result = [];
    p([], 0);
    return result;
}

// Figure out all the permutations...
// This could do with being a little cleaner but it works...
var optionPermutations = [];

optionPermutations.push(...getPermutations(calendarOptions, 1));
optionPermutations.push(...getPermutations(calendarOptions, 2));
optionPermutations.push(...getPermutations(calendarOptions, 3));
optionPermutations.push(...getPermutations(calendarOptions, 4));
optionPermutations.push(...getPermutations(calendarOptions, 5));
optionPermutations.push(...getPermutations(calendarOptions, 6));
optionPermutations.push(...getPermutations(calendarOptions, 7));

var fileNames = [];

// TODO: Reduce the number of options here someday.
const alarmOptions = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120];

// Generate Filenames
for(permutation of optionPermutations){
  const filename = permutation.join("_");
  
  // If the filename contains alarm then add each of the alarm permutations.
  if(filename != "alarm"){
    fileNames.push(filename);
  
    if(filename.includes("alarm")){
      for(alarmOption of alarmOptions){
        fileNames.push(filename + "-"+alarmOption);
      }
    }
  }
}

// For each filename, create a ics file.
for (request of fileNames) {
  
  let includeFP1, includeFP2, includeFP3, includeQuali, includeRace = false
  let alarmEnabled = false
  
  if(request.includes("p1")){
  	includeFP1 = true
  }
  if(request.includes("p2")){
  	includeFP2 = true
  }
  if(request.includes("p3")){
  	includeFP3 = true
  }
  if(request.includes("q")){
  	includeQuali = true
  }
  if(request.includes("gp")){
  	includeRace = true
  }
  
  if(request.includes("alarm")){
  	alarmEnabled = true
  }
  
  let alarmOffset = 20;
  if(alarmEnabled){
  	let requestArray = request.split("-");
  	alarmOffset = requestArray.slice(-1)[0];
  }
  
  let events = []
  
  const races = data.races;
  
  var i = 0;
  for (i = 0; i < races.length; i++) { 
  	let race = races[i]
    
    // Check we have sessions as we'll keep them out of TBC races unless we have tentative dates.			
  	if(race.sessions != null){
  		// Sessions
  		var s = 0;
  		for (s = 0; s < Object.keys(race.sessions).length; s++) {
  			let sessionKey = Object.keys(race.sessions)[s];
  			let session = race.sessions[sessionKey]
  			
  			
  			// Skip
  			if(sessionKey == "fp1" && !includeFP1) continue;
  			if(sessionKey == "fp2" && !includeFP2) continue;
  			if(sessionKey == "fp3" && !includeFP3) continue;
  			if(sessionKey == "qualifying" && !includeQuali) continue;
  			if(sessionKey == "race" && !includeRace) continue;
  		
  			var title = race.name + " Grand Prix";
  			var category = "Grand Prix";
  			var sessionLength = 120;
  			if(sessionKey == "fp1"){
  				title = "First Practice Session ("+title+")";
  				category = "First Practice Session";
  				sessionLength = 90;
  			} else if(sessionKey == "fp2"){
  				title = "Second Practice Session ("+title+")";
  				category = "Second Practice Session";
  				sessionLength = 90;
  			} else if(sessionKey == "fp3"){
  				title = "Third Practice Session ("+title+")";
  				category = "Third Practice Session";
  				sessionLength = 60;
  			} else if(sessionKey == "qualifying"){
  				title = "Qualifying Session ("+title+")";
  				category = "Qualifying Session";
  				sessionLength = 60;
  			}
  						
  			let alarms = []
  			
  			if(alarmEnabled){
  				var alarmDescription = title + " starts in "+alarmOffset+" minutes"
  				alarms.push({
  					action: 'display',
  					description: alarmDescription,
  					trigger: {minutes:alarmOffset, before:true},
  					repeat: 0,
  				})
  			}
  			
  			let start = moment(session).format('YYYY-M-D-H-m').split("-")
  			let end = moment(session).add(sessionLength, 'minutes').format('YYYY-M-D-H-m').split("-")
  			
  			var status = "CONFIRMED";
  			if(race.tbc){
  				status = "TENTATIVE";
  				title = "(TBC) " + title;
  			}
  			
  			if(race.canceled){
  				status = "CANCELLED";
  				title = "(CANCELED) " + title;
  			}
  
  			
  			let event = {
  				title: title,
  				location: race.location,
  				productId:"f1calendar.com",
  				uid: "http://2020.f1calendar.com/#GP"+i+"_2020_"+sessionKey,
  				categories: [category],
  				start: start,
  				end: end,
  				geo: { lat: race.latitude, lon: race.longitude },
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
		const path = 'public/download/f1-calendar_' + request + '.ics'
		fs.writeFileSync(path, value);
	}
  });
}