import * as React from 'react'
import RaceModel from '../../models/RaceModel'
import RaceSchema from '../RaceSchema/RaceSchema'

interface Props {
	races: [RaceModel]
}

export default function RaceSchemas({races}: Props) {
	return (
		<>
			{races.map((race) => (
			  <RaceSchema race={race} key={race.slug} />
			))}
		</>
	);
}
