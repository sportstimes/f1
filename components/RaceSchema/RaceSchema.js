import React, {useState} from 'react';
import dayjs from 'dayjs'
import withTranslation from 'next-translate/withTranslation'

class RaceSchema extends React.Component {

    constructor(props) {
        super(props)
    }

    addJSONLD() {
        const {t} = this.props.i18n
        const localeKey = 'calendar:races.' + this.props.item.localeKey;

        let name = this.props.item.name;
        if (t(`calendar:races.${this.props.item.localeKey}`) != localeKey) {
            name = t(`calendar:races.${this.props.item.localeKey}`);
        }

        return {
            __html: `[{
				"@context": "http://schema.org/",
				"@type": "Event",
				"name": "${name} - ${t('calendar:schedule.fp1')}",
				"description": "${name} - ${t('calendar:schedule.fp1')}",
				"startdate": "${dayjs(this.props.item.sessions.fp1).toJSON()}",
				"enddate": "${dayjs(this.props.item.sessions.fp1).add(1.5, 'hours').toJSON()}",
				"location": {
					"@type": "Place",
					"name": "${this.props.item.location}",
					"latitude": "${this.props.item.latitude}",
					"longitude": "${this.props.item.longitude}",
					"address": "${this.props.item.location}"
				}
		},
		{
				"@context": "http://schema.org/",
				"@type": "Event",
				"name": "${name} - ${t('calendar:schedule.fp2')}",
				"description": "${name} - ${t('calendar:schedule.fp2')}",
				"startdate": "${dayjs(this.props.item.sessions.fp2).toJSON()}",
				"enddate": "${dayjs(this.props.item.sessions.fp2).add(1.5, 'hours').toJSON()}",
				"location": {
					"@type": "Place",
					"name": "${this.props.item.location}",
					"latitude": "${this.props.item.latitude}",
					"longitude": "${this.props.item.longitude}",
					"address": "${this.props.item.location}"
				}
		},
		{
				"@context": "http://schema.org/",
				"@type": "Event",
				"name": "${name} - ${t('calendar:schedule.fp3')}",
				"description": "${name} - ${t('calendar:schedule.fp3')}",
				"startdate": "${dayjs(this.props.item.sessions.fp3).add(1, 'hours').toJSON()}",
				"enddate": "${dayjs(this.props.item.sessions.fp3).add(1, 'hours').toJSON()}",
				"location": {
					"@type": "Place",
					"name": "${this.props.item.location}",
					"latitude": "${this.props.item.latitude}",
					"longitude": "${this.props.item.longitude}",
					"address": "${this.props.item.location}"
				}
		},
		{
				"@context": "http://schema.org/",
				"@type": "Event",
				"name": "${name} - ${t('calendar:schedule.qualifying')}",
				"description": "{name} - ${t('calendar:schedule.qualifying')}",
				"startdate": "${dayjs(this.props.item.sessions.qualifying).add(1, 'hours').toJSON()}",
				"enddate": "${dayjs(this.props.item.sessions.qualifying).add(1, 'hours').toJSON()}",
				"location": {
					"@type": "Place",
					"name": "${this.props.item.location}",
					"latitude": "${this.props.item.latitude}",
					"longitude": "${this.props.item.longitude}",
					"address": "${this.props.item.location}"
				}
		},
		{
				"@context": "http://schema.org/",
				"@type": "Event",
				"name": "${name} - ${t('calendar:schedule.race')}",
				"description": "${name} - ${t('calendar:schedule.race')}",
				"startdate": "${dayjs(this.props.item.sessions.race).toJSON()}",
				"enddate": "${dayjs(this.props.item.sessions.race).add(2, 'hours').toJSON()}",
				"location": {
					"@type": "Place",
					"name": "${this.props.item.location}",
					"latitude": "${this.props.item.latitude}",
					"longitude": "${this.props.item.longitude}",
					"address": "${this.props.item.location}"
				}
		}]`
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