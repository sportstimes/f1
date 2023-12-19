import * as React from 'react'
import RaceModel from '../../models/RaceModel'
import RaceSchema from '../RaceSchema/RaceSchema'

interface Props {
	races: [RaceModel]
}

class RaceSchemas extends React.Component<Props> {
	render() {
		return (
			<>
				{this.props.races.map((race) => (
				  <RaceSchema race={race} key={race.slug} />
				))}
			</>
		);	
	}
}

export default RaceSchemas