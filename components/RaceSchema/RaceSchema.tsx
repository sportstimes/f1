
import React, {useState} from 'react';
import dayjs from 'dayjs'
import withTranslation from "next-translate/withTranslation";
import type { I18n } from 'next-translate'
import RaceModel from '../../models/RaceModel'

interface Props {
	i18n: I18n;
	race: RaceModel
}

class RaceSchema extends React.Component<Props> {
	render() {
		const {t} = this.props.i18n
		const localeKey = 'localization:races.' + this.props.race.localeKey;
		
		let name = this.props.race.name;
		if (t(`localization:races.${this.props.race.localeKey}`) != localeKey) {
			name = t(`localization:races.${this.props.race.localeKey}`);
		}
		
		let location = this.props.race.location;
		let latitude = this.props.race.latitude;
		let longitude = this.props.race.longitude;
		
		var rows = [];
		
		var keys = Object.keys(this.props.race.sessions);
		var sessions = this.props.race.sessions;
		
		keys.forEach(function (session, index) {
			let key = `localization:schedule.${session}`;
		
			let eventName = `${name} - ${t(key)}`;
			let eventDescription = `${name} - ${t(key)}`;
						
			rows.push({
				"@context": "http://schema.org/",
				"@type": "Event",
				"name": eventName,
				"description": eventDescription,
				"startdate": dayjs(sessions[session]).toJSON(),
				"enddate": dayjs(sessions[session]).add(1.5, 'hours').toJSON(),
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

export default withTranslation(RaceSchema);

