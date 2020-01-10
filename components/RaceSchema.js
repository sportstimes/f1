import { useState } from 'react';
import moment from 'moment'

class RaceSchema extends React.Component {
		
	constructor(props) {
	   super(props)
	}
	
	addJSONLD() {
    return {
      __html: `[{
				"@context": "http://schema.org/",
				"@type": "Event",
				"name": "${this.props.item.name} Grand Prix - Free Practice 1",
				"startdate": "${ moment(this.props.item.sessions.fp1).toJSON() }",
				"enddate": "${ moment(this.props.item.sessions.fp1).add(1.5, 'hours').toJSON() }",
				"location": {
					"@type": "Place",
					"name": "${this.props.item.location}",
					"latitude": "${ this.props.item.latitude }",
					"longitude": "${ this.props.item.longitude }",
					"address": {
						"@type": "PostalAddress",
						"latitude": "${ this.props.item.latitude }",
						"longitude": "${ this.props.item.longitude }"
					}
				}
		},
		{
				"@context": "http://schema.org/",
				"@type": "Event",
				"name": "${this.props.item.name} Grand Prix - Free Practice 2",
				"startdate": "${ moment(this.props.item.sessions.fp2).toJSON() }",
				"enddate": "${ moment(this.props.item.sessions.fp2).add(1.5, 'hours').toJSON() }",
				"location": {
					"@type": "Place",
					"name": "${this.props.item.location}",
					"latitude": "${ this.props.item.latitude }",
					"longitude": "${ this.props.item.longitude }",
					"address": {
						"@type": "PostalAddress",
						"latitude": "${ this.props.item.latitude }",
						"longitude": "${ this.props.item.longitude }"
					}
				}
		},
		{
				"@context": "http://schema.org/",
				"@type": "Event",
				"name": "${this.props.item.name} Grand Prix - Free Practice 3",
				"startdate": "${ moment(this.props.item.sessions.fp3).add(1, 'hours').toJSON() }",
				"enddate": "${ moment(this.props.item.sessions.fp3).add(1, 'hours').toJSON() }",
				"location": {
					"@type": "Place",
					"name": "${this.props.item.location}",
					"latitude": "${ this.props.item.latitude }",
					"longitude": "${ this.props.item.longitude }",
					"address": {
						"@type": "PostalAddress",
						"latitude": "${ this.props.item.latitude }",
						"longitude": "${ this.props.item.longitude }"
					}
				}
		},
		{
				"@context": "http://schema.org/",
				"@type": "Event",
				"name": "${this.props.item.name} Grand Prix - Qualifying",
				"startdate": "${ moment(this.props.item.sessions.qualifying).add(1, 'hours').toJSON() }",
				"enddate": "${ moment(this.props.item.sessions.qualifying).add(1, 'hours').toJSON() }",
				"location": {
					"@type": "Place",
					"name": "${this.props.item.location}",
					"latitude": "${ this.props.item.latitude }",
					"longitude": "${ this.props.item.longitude }",
					"address": {
						"@type": "PostalAddress",
						"latitude": "${ this.props.item.latitude }",
						"longitude": "${ this.props.item.longitude }"
					}
				}
		},
		{
				"@context": "http://schema.org/",
				"@type": "Event",
				"name": "${this.props.item.name} Grand Prix - Race",
				"startdate": "${ moment(this.props.item.sessions.race).toJSON() }",
				"enddate": "${ moment(this.props.item.sessions.race).add(2, 'hours').toJSON() }",
				"location": {
					"@type": "Place",
					"name": "${this.props.item.location}",
					"latitude": "${ this.props.item.latitude }",
					"longitude": "${ this.props.item.longitude }",
					"address": {
						"@type": "PostalAddress",
						"latitude": "${ this.props.item.latitude }",
						"longitude": "${ this.props.item.longitude }"
					}
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

export default RaceSchema