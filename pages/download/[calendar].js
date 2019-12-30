import React from 'react';
import * as ics from 'ics';
import moment from 'moment'

export default class Calendar extends React.Component {
	static async getInitialProps({ res, query }) {
		if (!res) {
			return;
		}
		
		let request = query.calendar.replace(".ics", "");
		
		var includeFP1, includeFP2, includeFP3, includeQuali, includeRace = false
		var alarmEnabled = false

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
    
		const data = await import(`../../db/2020.json`)
		
		let events = []
		
		const races = data.races;
		
		var i = 0;
		// Races
		for (i = 0; i < races.length; i++) { 
			let race = races[i]
			
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
					alarms: alarms
				}
				events.push(event)
			}
		}
		
		ics.createEvents(events, (error, value) => {
			if (error) {
				console.log(error);
				return
			}
			
			res.setHeader("Content-Type", "text/calendar");
			res.write(value);
			res.end();
		});
	}
}