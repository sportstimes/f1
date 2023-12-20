"use client"

import React, {useState} from 'react';
import dayjs from 'dayjs'
import {useTranslations} from 'next-intl';
import RaceModel from '../../models/RaceModel'

interface Props {
	race: RaceModel
}

export default function RaceSchema({race}: Props) {
	const t = useTranslations('All');
	const localeKey = 'races.' + race.localeKey;
	
	const config = require(`/_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
	
	let name = race.name;
	if (t(`races.${race.localeKey}`) != localeKey) {
		name = t(`races.${race.localeKey}`);
	}
	
	let location = race.location;
	let latitude = race.latitude;
	let longitude = race.longitude;
	
	var rows = [];
	
	var keys = Object.keys(race.sessions);
	var sessions = race.sessions;
	
	keys.forEach(function (session, index) {
		let key = `schedule.${session}`;
	
		let eventName = `${name} - ${t(key)}`;
		let eventDescription = `${name} - ${t(key)}`;
					
		rows.push({
			"@context": "http://schema.org/",
			"@type": "Event",
			"name": eventName,
			"description": eventDescription,
			"startdate": dayjs(sessions[session]).toJSON(),
			"enddate": dayjs(sessions[session]).add(config.sessionLengths[session], 'minutes').toJSON(),
			"location": {
				"@type": "Place",
				"name": location,
				"latitude": latitude,
				"longitude": latitude,
				"address": location
			}
		});
	});

	return (
		<>
		  <script
			type="application/ld+json"
			dangerouslySetInnerHTML={{ __html: JSON.stringify(rows) }}
		  />
		</>
	);
}
