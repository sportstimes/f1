
import React, {useState} from 'react';
import dayjs from 'dayjs'
import {useTranslations} from 'next-intl';
import RaceModel from '../../models/RaceModel'

interface Props {
	i18n: I18n;
	race: RaceModel
}

class RaceSchema extends React.Component<Props> {
	render() {
		const {t} = this.props.i18n
		const localeKey = 'races.' + this.props.race.localeKey;
		
		const config = require(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
		
		let name = this.props.race.name;
		if (t(`races.${this.props.race.localeKey}`) != localeKey) {
			name = t(`races.${this.props.race.localeKey}`);
		}
		
		let location = this.props.race.location;
		let latitude = this.props.race.latitude;
		let longitude = this.props.race.longitude;
		
		var rows = [];
		
		var keys = Object.keys(this.props.race.sessions);
		var sessions = this.props.race.sessions;
		
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
}

export default RaceSchema;

