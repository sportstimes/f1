"use client"

import React, {useContext, FunctionComponent} from "react";
import {useUserContext} from "components/UserContext";
import dayjs from "dayjs";
import Race, {RaceRow} from "components/Race/Race";
const config = require(`../../../_db/${process.env.NEXT_PUBLIC_SITE_KEY}/config.json`);
import RaceModel from "../../models/RaceModel"
import {useTranslations} from 'next-intl';

export interface Props {
	year: number;
	races: [RaceModel];
	locale?: string;
}

const Races = ({ year, races }: Props) => {
	const t = useTranslations('All');
	const title = t(`${process.env.NEXT_PUBLIC_SITE_KEY}.title`);

	let {timezone, timeFormat, collapsePastRaces, updateCollapsePastRaces} = useUserContext();

	//if (props.locale) locale = props.locale;

	let isNextRace = false;
	let hasSetNextRace = false;
	
	// Check if we have more than 1 race that has already occurred and collapse them.
	var shouldCollapsePastRaces = false;
	var racesOccured = 0;
	races.map((item, index) => {
		if (item.sessions != null) {
			let lastEventSessionKey = Object.keys(item.sessions)[
				Object.keys(item.sessions).length - 1
			];
			
			if (dayjs(item.sessions[lastEventSessionKey]).add(2, "hours").isBefore(Date())) {
				racesOccured = racesOccured + 1;
			}
		}
	});
	
	if(racesOccured > 1 || collapsePastRaces){
		shouldCollapsePastRaces = collapsePastRaces;
	}
	
	if(racesOccured == races.length){
		shouldCollapsePastRaces = false;
	}

	return (
		<div>
			<table id="events-table" className="w-full">
				{config.featuredSessions.length === 1 ? (
					<thead className="hidden">
						<tr>
							<th scope="col" className="w-8" id="toggle_header">Toggle</th>
							<th scope="col">
								{title}
							</th>
							<th scope="col" id="date_header">
								{t("date")}
							</th>
							<th scope="col" id="time_header">
								{t("time")}
							</th>
						</tr>
					</thead>
				) : (
					<thead>
						<tr className="hidden">
							<th scope="col" className="w-8"></th>
							<th scope="col">
								{title}
							</th>
							{config.featuredSessions.map((item:string, index:number) => {
								return <th scope="col" key={`${item}-col`}></th>;
							})}
						</tr>
					</thead>
				)}
				
				{races.map((item, index) => {
					const hasMultipleFeaturedEvents = config.featuredSessions.length !== 1;
					
					var sessionDate = dayjs();
					if(item.sessions != null){
						if(hasMultipleFeaturedEvents){
							let lastEventSessionKey = Object.keys(item.sessions)[Object.keys(item.sessions).length-1];
							sessionDate = dayjs(item.sessions[lastEventSessionKey]);
						} else {
							sessionDate = dayjs(item.sessions[config.featuredSessions[0]]);
						}
					}
					
					isNextRace = false;
					
					if (
						item.sessions &&
						sessionDate.isAfter(dayjs()) &&
						!hasSetNextRace &&
						!item.canceled &&
						!item.tbc
					) {
						isNextRace = true;
						hasSetNextRace = true;
					}
					
					const race: RaceRow = {
						isNextRace: isNextRace,
						hasOccured: sessionDate.isBefore(Date()),
						shouldCollapsePastRaces: shouldCollapsePastRaces,
						index,
						item: item,
						collapsed: !isNextRace
					};
					
					return (
						<Race {...race} key={`${item.slug}-race`} />
					);
				})}
			</table>
		</div>
	);
};

export default Races;
