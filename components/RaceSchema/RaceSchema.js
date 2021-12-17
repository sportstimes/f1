import React, {useState} from 'react';
import dayjs from 'dayjs'
import withTranslation from 'next-translate/withTranslation'

class RaceSchema extends React.Component {

    constructor(props) {
        super(props)
    }

    addJSONLD() {
        const {t} = this.props.i18n
        const localeKey = 'localization:races.' + this.props.item.localeKey;

        let name = this.props.item.name;
        if (t(`localization:races.${this.props.item.localeKey}`) != localeKey) {
            name = t(`localization:races.${this.props.item.localeKey}`);
        }
		
		let location = this.props.item.location;
		let latitude = this.props.item.latitude;
		let longitude = this.props.item.longitude;
		
		var rows = [];
		
		var keys = Object.keys(this.props.item.sessions);
		var sessions = this.props.item.sessions;
		
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
		

        return {
            __html: `${JSON.stringify(rows)}`
        };
    }

    render() {
        return (<script
            type="application/ld+json"
            dangerouslySetInnerHTML={this.addJSONLD()}
        />);
    }
}

export default withTranslation(RaceSchema)