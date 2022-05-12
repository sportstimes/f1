import * as React from 'react'
import { Race } from '../models'
import RaceSchema from '../RaceSchema/RaceSchema'

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